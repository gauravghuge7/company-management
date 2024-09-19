import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, FormControl, InputGroup } from 'react-bootstrap';
import { message } from 'react-message-popup';

const CompanyList = ({ setValue, setClientId, setClientName }) => {
    const [companies, setCompanies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchCompanies = async () => {
        try {
            const response = await axios.get("/api/admin/getAllClients");
            if (response.data.success) {
                message.success(response.data.message);
                setCompanies(response.data.data.clientList);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const setDetails = (clientId, clientName) => {
        setValue("addproject");
        setClientId(clientId);
        setClientName(clientName);
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const filteredCompanies = companies.filter(company =>
        company.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const companiesPerPage = 10;
    const indexOfLastCompany = currentPage * companiesPerPage;
    const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
    const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

    const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

    return (
        <Container
            style={{
                background: "#f0f4f8",
                padding: "40px",
                borderRadius: "12px",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                color: "#333",
                maxWidth: "100%",
                marginTop: "30px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "25px",
                }}
            >
                <h2 style={{ margin: 0, color: "#333" }}>Client List</h2>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <InputGroup style={{  maxWidth: "50%", marginRight: "10px" }}>
                        <FormControl
                            placeholder="Search Clients"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                    <Button
                        style={{
                            backgroundColor: "#007BFF",
                            border: "none",
                            padding: "12px 24px",
                            borderRadius: "8px",
                            color: "#fff",
                            fontWeight: "bold",
                            transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#007BFF")
                        }
                        onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "#007BFF")
                        }
                        onClick={() => setValue("createcompany")}
                    >
                        Add Client
                    </Button>
                </div>
            </div>
            <Row className="justify-content-md-center">
                <Col md={12}>
                    {currentCompanies.length > 0 ? (
                        <Table
                            striped
                            bordered
                            hover
                            style={{
                                backgroundColor: "#fff",
                                color: "#333",
                                borderRadius: "12px",
                                overflow: "hidden",
                            }}
                        >
                            <thead
                                style={{
                                    backgroundColor: "#007BFF",
                                    color: "#fff",
                                }}
                            >
                                <tr>
                                    <th>#</th>
                                    <th>Client Name</th>
                                    <th>Client Email</th>
                                    <th>Password</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCompanies.map((company, index) => (
                                    <tr key={index}>
                                        <td>{indexOfFirstCompany + index + 1}</td>
                                        <td>{company.clientName}</td>
                                        <td>{company.clientEmail}</td>
                                        <td>{company.clientPassword}</td>
                                        <td>
                                            <Button
                                                style={{
                                                    backgroundColor: "#007BFF",
                                                    border: "none",
                                                    padding: "12px 24px",
                                                    borderRadius: "8px",
                                                    color: "#fff",
                                                    fontWeight: "bold",
                                                    transition: "background-color 0.3s ease",
                                                }}
                                                onMouseEnter={(e) =>
                                                    (e.target.style.backgroundColor = "#007BFF")
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.target.style.backgroundColor = "#007BFF")
                                                }
                                                onClick={() => setDetails(company._id, company.clientName)}
                                            >
                                                Add Project
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p style={{ color: "#333" }}>No companies registered yet.</p>
                    )}
                </Col>
            </Row>
            <div  style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <Button
                    style={{ marginRight: "10px" }}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next 
                </Button>
            </div>
        </Container>
    );
};

export default CompanyList;
