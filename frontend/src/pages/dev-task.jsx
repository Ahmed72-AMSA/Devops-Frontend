import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/esm/Button';


const DeveloperTask = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);




    
    const handleDelete = async (taskID,developerID) => {
        if (window.confirm("Do you Want to Delete Developer")) {
            try {
                await axios.delete(`http://localhost:5059/api/TaskDevelopers/${taskID}/${developerID}`);
                toast.success("Project Deleted from developer successfully!");
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
            const response = await axios.get('http://localhost:5059/api/TaskDevelopers/view');
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

    const getStatusColor = (status) => {
        if (status === 'in progress'.toLowerCase()) {
            return { color: 'red', fontWeight: 'bold',  backgroundColor: 'rgba(0, 128, 0, 0.5)' };
        } else if (status === 'done') {
            return { color: 'blue' , fontWeight: 'bold',  backgroundColor: 'rgba(0, 128, 0, 0.5)'}; 
        }
    };

    return (
        <div style={{ backgroundColor: '#e8f4f8', padding: '20px' }}>
            <ToastContainer />
            <h1>Assigned Tasks for Developers</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Task ID</th>
                        <th style={thStyle}>Developer ID</th>
                        <th style={thStyle}>Project ID</th>
                        <th style={thStyle}>Developer Name</th>
                        <th style={thStyle}>Task Name</th>
                        <th style={thStyle}>Project Name</th>
                        <th style={thStyle}>Delete</th>
                        <th style={thStyle}>Status</th>



                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6">Loading...</td>
                        </tr>
                    ) : (
                        data.map((Task_dev, index) => (
                            <tr key={Task_dev.id}>
                                <td style={tdStyle} className='p-3'>{Task_dev.taskId}</td>
                                <td style={tdStyle}>{Task_dev.developerId}</td>
                                <td style={tdStyle}>{Task_dev.projectId}</td>
                                <td style={tdStyle}>{Task_dev.developerName}</td>
                                <td style={tdStyle}>{Task_dev.taskName}</td>
                                <td style={tdStyle}>{Task_dev.projectName}</td>
                                <td>
                                    <Button variant="danger" className='ms-2' onClick={() => handleDelete(Task_dev.taskId,Task_dev.developerId)}>Delete</Button>
                                </td>
                                <td style={{ ...tdStyle, ...getStatusColor(Task_dev.status) }}>{Task_dev.status}</td>

                              
                            </tr>
                        ))
                    )}
                </tbody>
            </table>





        </div>

        


    );
};

export default DeveloperTask;
