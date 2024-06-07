import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const InboxPage = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);



    const fetchData = async () => {
        const userEmail = localStorage.getItem("email");

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5059/api/Comments/user/${userEmail}`);
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





    const handleDelete = async (id) => {
        if (window.confirm("Do you Want to Delete Message From Inbox")) {
            try {
                await axios.delete(`http://localhost:5059/api/Comments/${id}`);
                fetchData();
                toast.success("Your Message Has been read!");
            } catch (error) {
                toast.error(error.message || "Error deleting data");
                console.error('Error deleting data:', error);
            }
        }
    };



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







    // Filter tasks based on ID and developer name
 

    return (
      <div style={{ backgroundColor: '#e8f4f8', padding: '20px' }}>
        <ToastContainer/>
            <h1>Manage Tasks</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>User ID</th>
                        <th style={thStyle}>Task ID</th>
                        <th style={thStyle}>Comment Body</th>
                        <th style={thStyle}>Don't Show It again</th>

                    </tr>
                </thead>
                <tbody>
                {loading ? (
                        <tr>
                            <td colSpan="6">Loading...</td>
                        </tr>
                    ):

                    data.map(message => (
                        <tr key={message.id}>
                            <td style={tdStyle}>{message.userId}</td>
                            <td style={tdStyle}>{message.taskId}</td>
                            <td style={tdStyle}>{message.commentBody}</td>
                            <td style={tdStyle}><button className="btn btn-danger" onClick={() => handleDelete(message.id)}>Readed</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>




        </div>
    );
};

export default InboxPage;

