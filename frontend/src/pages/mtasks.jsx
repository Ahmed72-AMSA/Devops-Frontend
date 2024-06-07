import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Mtasks = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [titleEdit, setEditTitle] = useState("");
    const [descriptionEdit, setEditDescription] = useState("");
    const [statusEdit, setEditStatus] = useState("");
    const [projectID, setEditProjectID] = useState("");
    const [idEdit, setEditId] = useState("");



    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5059/api/task');
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

    const handleEdit = (id) => {
        handleShow();
        axios.get(`http://localhost:5059/api/task/${id}`)
            .then(result => {
                setEditId(result.data.taskId);
                setEditTitle(result.data.taskName);
                setEditDescription(result.data.taskDescription);
                setEditProjectID(result.data.projectId);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5059/api/task/${idEdit}`, {
                taskId: idEdit,
                taskName: titleEdit,
                taskDescription: descriptionEdit,
                projectId: projectID,
            });
            fetchData(); // Refetch the data after updating
            handleClose(); // Close the modal after updating
            toast.success("Task updated successfully!");
        } catch (error) {
            handleClose();
            if (error.response && error.response.status === 500) {
                toast.error("No project found with this ID");
            } else {
                toast.error(error.message || "Error updating project");
            }
            console.error('Error updating data:', error);
        }
    };
    

    const handleDelete = async (id) => {
        if (window.confirm("Do you Want to Delete Developer")) {
            try {
                await axios.delete(`http://localhost:5059/api/task/${id}`);
                toast.success("Task Deleted successfully!");
                fetchData();
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
                        <th style={thStyle}>Task ID</th>
                        <th style={thStyle}>Task Title</th>
                        <th style={thStyle}>Task Description</th>
                        <th style={thStyle}>Project ID</th>
                        <th style={thStyle}>Update</th>
                        <th style={thStyle}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {loading ? (
                        <tr>
                            <td colSpan="6">Loading...</td>
                        </tr>
                    ):

                    data.map(task => (
                        <tr key={task.taskId}>
                            <td style={tdStyle}>{task.id}</td>
                            <td style={tdStyle}>{task.title}</td>
                            <td style={tdStyle}>{task.description}</td>
                            <td style={tdStyle}>{task.projectID}</td>
                            <td style={tdStyle}><button className="btn btn-warning" onClick={() => handleEdit(task.id)}>Update</button></td>
                            <td style={tdStyle}><button className="btn btn-danger" onClick={() => handleDelete(task.id)}>Delete</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Modify/Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-5 p-4 mb-3">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="editName" className="form-label">Project Title</label>
                                <input type="text" className="form-control" id="editName" placeholder="Enter name" value={titleEdit} onChange={(e) => setEditTitle(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="editdesc" className="form-label">Project Description</label>
                                <input type="text" className="form-control" id="editdesc" placeholder="Enter name" value={descriptionEdit} onChange={(e) => setEditDescription(e.target.value)} />
                            </div>




        
                            <div className="mb-3">
                                <label htmlFor="projId" className="form-label">Project ID</label>
                                <input type="text" className="form-control" id="projId" placeholder="Enter Project ID" value={projectID} onChange={(e) => setEditProjectID(e.target.value)} />
                            </div>

                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Submit</button>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
};

export default Mtasks;

