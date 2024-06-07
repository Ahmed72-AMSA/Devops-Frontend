import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/esm/Button';

const Developer = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    // Function to retrieve token from local storage
    const getToken = () => {
        return localStorage.getItem('token');
    };

    const handleDelete = async (developerID, projectID) => {
        if (window.confirm("Do you Want to Delete Developer")) {
            try {
                // Include the token in the request headers
                const token = getToken();
                await axios.delete(`http://localhost:5059/api/ProjectDeveloper/${projectID}/${developerID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                toast.success("Task Deleted from developer successfully!");
                fetchData();
            } catch (error) {
                toast.error(error.message || "Error deleting data");
                console.error('Error deleting data:', error);
            }
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            // Include the token in the request headers
            const token = getToken();
            const response = await axios.get('http://localhost:5059/api/ProjectDeveloper/view', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data.$values);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Render function
    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
        marginTop: '20px'
    };

    const thStyle = {
        backgroundColor: '#f2f2f2',
        border: '1px solid #ddd',
        padding: '8px',
        fontWeight: 'bold'
    };

    const tdStyle = {
        border: '1px solid #ddd',
        padding: '8px'
    };

    const getStatusColor = (accepted) => {
        if (accepted === 'Accepted') {
            return { color: 'blue', fontWeight: 'bold',  backgroundColor: 'rgba(0, 128, 0, 0.5)' }; // Bold text with black background for accepted
        } else if (accepted === 'rejected') {
            return { color: 'red' , fontWeight: 'bold',  backgroundColor: 'rgba(0, 128, 0, 0.5)'}; // Red color for rejected
        } else {
            return { color: 'yellow' , fontWeight: 'bold',  backgroundColor: 'rgba(0, 128, 0, 0.5)' }; // Yellow color for not yet
        }
    };

    return (
        <div style={{ backgroundColor: '#e8f4f8', padding: '20px' }}>
            <ToastContainer />
            <h1>Assigned Projects for Developers</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Developer ID</th>
                        <th style={thStyle}>Project ID</th>
                        <th style={thStyle}>Developer Name</th>
                        <th style={thStyle}>Project Name</th>
                        <th style={thStyle}>Delete</th>
                        <th style={thStyle}>Accepted ?</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6">Loading...</td>
                        </tr>
                    ) : (
                        data.map((proj_dev, index) => (
                            <tr key={proj_dev.id}>
                                <td style={tdStyle} className='p-3'>{proj_dev.developerId}</td>
                                <td style={tdStyle}>{proj_dev.projectId}</td>
                                <td style={tdStyle}>{proj_dev.developerName}</td>
                                <td style={tdStyle}>{proj_dev.projectName}</td>
                                <td>
                                    <Button variant="danger" className='ms-2' onClick={() => handleDelete(proj_dev.developerId,proj_dev.projectId)}>Delete</Button>
                                </td>
                                <td style={{ ...tdStyle, ...getStatusColor(proj_dev.accepted) }}>{proj_dev.accepted}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Developer;
