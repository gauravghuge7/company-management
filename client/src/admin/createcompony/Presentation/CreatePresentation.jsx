import  { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const CreatePresentation = ({data}) => {
    const [slides, setSlides] = useState([
        { text: '', image: '', drawing: null }
    ]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [editingText, setEditingText] = useState(false);
    const [editingImage, setEditingImage] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [thumbnails, setThumbnails] = useState([]); // State to store thumbnails
    const slideRefs = useRef([]); // Ref to store slide DOM elements

    useEffect(() => {
        // Generate thumbnails when slides change
        const generateThumbnails = async () => {
        const newThumbnails = [];
        for (let i = 0; i < slides.length; i++) {
            const slideElement = slideRefs.current[i];
            const canvas = await html2canvas(slideElement);
            newThumbnails.push(canvas.toDataURL('image/png'));
        }
        setThumbnails(newThumbnails);
        };

        generateThumbnails();
    }, [slides]);

    // Handle text change
    const handleTextChange = (e) => {
        const updatedSlides = [...slides];
        updatedSlides[currentSlide].text = e.target.value;
        setSlides(updatedSlides);
    };

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
        const updatedSlides = [...slides];
        updatedSlides[currentSlide].image = reader.result;
        setSlides(updatedSlides);
        };
        reader.readAsDataURL(file);
    };

    // Add a new slide
    const addSlide = () => {
        setSlides([...slides, { text: '', image: '', drawing: null }]);
        setCurrentSlide(slides.length);
    };

    // Delete the current slide
    const deleteSlide = () => {
        if (slides.length > 1) {
        const updatedSlides = slides.filter((_, index) => index !== currentSlide);
        setSlides(updatedSlides);
        setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 0);
        }
    };

    // Generate PDF and update the PDF preview URL
    const generatePDF = async () => {
        const pdf = new jsPDF('portrait', 'px', 'a4');
        for (let i = 0; i < slides.length; i++) {
        const slideElement = slideRefs.current[i];
        const canvas = await html2canvas(slideElement);
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 420, 594); // Fit to A4
        if (i < slides.length - 1) pdf.addPage();
        }
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        setPdfUrl(pdfUrl);

        data.append('document', pdfBlob);
    };

    const generatePDFDownload = async () => {
        const pdf = new jsPDF('portrait', 'px', 'a4');
        for (let i = 0; i < slides.length; i++) {
        const slideElement = slideRefs.current[i];
        const canvas = await html2canvas(slideElement);
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 420, 594); // Fit to A4
        if (i < slides.length - 1) pdf.addPage();
        }
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);

    };

    return (
        <div className="p-4">
        {/* Navbar */}
        <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
            <button onClick={() => setEditingText(!editingText)} className="px-4 py-2 hover:bg-gray-700">
            {editingText ? 'Save Text' : 'Add Text'}
            </button>
            <button onClick={() => setEditingImage(!editingImage)} className="px-4 py-2 hover:bg-gray-700">
            {editingImage ? 'Save Document' : 'Add Document'}
            </button>
            <button onClick={addSlide} className="px-4 py-2 hover:bg-gray-700">Add Slide</button>
            <button onClick={deleteSlide} className="px-4 py-2 hover:bg-gray-700" disabled={slides.length === 1}>
            Delete Slide
            </button>
            <button onClick={generatePDF} className="px-4 py-2 hover:bg-gray-700">Save PDF</button>
            <button onClick={generatePDFDownload} className="px-4 py-2 hover:bg-gray-700">Generate PDF</button>
        </nav>

        {/* Slide Editor */}
        <div
            id={`slide-${currentSlide}`}
            ref={(el) => slideRefs.current[currentSlide] = el} // Assign ref to each slide element
            className="bg-white p-4 shadow-lg rounded-lg mt-4"
        >
            {editingText && (
            <textarea
                value={slides[currentSlide].text}
                onChange={handleTextChange}
                className="w-full border p-2 mb-4"
                placeholder="Add text to the slide"
            />
            )}

            {editingImage && (
            <div className="mb-4">
                <input type="file" onChange={handleImageChange} className="mb-4" />
                {slides[currentSlide].image && (
                <div className='flex flex-wrap justify-center'>
                    <img src={slides[currentSlide].image} alt="slide" className="w-[16rem] mb-4" />
                </div>
                )}
            </div>
            )}
        </div>

        {/* PDF Preview */}
        {pdfUrl && (
            <div className="mt-4">
                
            <iframe
                src={pdfUrl}
                width="800px"
                height="600px"
                className="border"
                title="PDF Preview"
            />
            </div>
        )}

        {/* Thumbnails of Slides */}
        <div className="mt-4 flex overflow-x-auto">
            {thumbnails.map((thumbnail, index) => (
            <div key={index} className="mr-2 w-[80%] ">
                <img src={thumbnail} alt={`Slide ${index + 1}`} className="w-[120%] h-30 object-cover border" />
            </div>
            ))}
        </div>

        {/* Slide Navigation */}
        <div className="mt-4 flex justify-between items-center">
            <button
            onClick={() => setCurrentSlide(currentSlide - 1)}
            disabled={currentSlide === 0}
            className={`px-4 py-2 rounded ${currentSlide === 0 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            >
            Previous Slide
            </button>
            <span className="font-bold">
            Slide {currentSlide + 1} of {slides.length}
            </span>
            <button
            onClick={() => setCurrentSlide(currentSlide + 1)}
            disabled={currentSlide === slides.length - 1}
            className={`px-4 py-2 rounded ${currentSlide === slides.length - 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            >
            Next Slide
            </button>
        </div>
        </div>
    );
};

export default CreatePresentation;
