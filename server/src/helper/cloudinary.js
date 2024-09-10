
import { v2 as cloudinary } from 'cloudinary'


// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });




cloudinary.config({ 
    cloud_name: "dsh5742fk", 
    api_key: "899594559273632", 
    api_secret: "9E2v2LfZFqO2qiFf1-yuZmO3JX8"
});





const uploadOnCloudinary = async (file) => {

    try {

        const result = await cloudinary.uploader.upload(file, {
            
            resource_type: "auto"

        })

        console.log("result => ", result)


        return result;
        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        return null;
    }

}


export {
    uploadOnCloudinary
}