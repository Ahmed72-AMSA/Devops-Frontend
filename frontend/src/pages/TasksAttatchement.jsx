import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const TaskAttachment = () => {
    const [loading, setLoading] = useState(false);
    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5059/api/taskDevelopers/files');
            setAttachments(response.data.$values);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const openFileInBrowser = (filePath) => {
        window.open(`http://localhost:5059/${filePath}`, '_blank');
    };

    return (
        <div style={{ backgroundColor: '#e8f4f8', padding: '20px' }}>
            <h1>Task Attachments</h1>
            <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Developer Name</th>
                        <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Task Name</th>
                        <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>View</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="3">Loading...</td>
                        </tr>
                    ) : (
                        attachments.map((attachment, index) => (
                            <tr key={index}>
                                <td className='p-3'>{attachment.developerName}</td>
                                <td>{attachment.taskName}</td>
                                <td>
                                    <Button variant="success" style={{ marginRight: '10px' }} onClick={() => openFileInBrowser(attachment.filePath)}>View</Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TaskAttachment;
