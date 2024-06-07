import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Mteam = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [nameEdit, setEditName] = useState("");
    const [emailEdit, setEditEmail] = useState("");
    const [typeEdit, setEditType] = useState("");
    const [passwordEdit, setEditPassword] = useState("");
    const [idEdit, setEditId] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5059/api/user');
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
        axios.get(`http://localhost:5059/api/user/${id}`)
            .then(result => {
                setEditId(result.data.id);
                setEditPassword(result.data.password);
                setEditName(result.data.name);
                setEditEmail(result.data.email);
                setEditType(result.data.type);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5059/api/user/${idEdit}`, {
                id: idEdit,
                email: emailEdit,
                password: passwordEdit,
                name: nameEdit,
                type: typeEdit
            });
            fetchData(); // Refetch the data after updating
            handleClose(); // Close the modal after updating
            toast.success("Developer updated successfully!");
        } catch (error) {
            toast.error(error.message || "Error updating project");
            console.error('Error updating data:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Do you Want to Delete Developer")) {
            try {
                await axios.delete(`http://localhost:5059/api/user/${id}`);
                toast.success("Developer Deleted successfully!");
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

    return (
        <div style={{ backgroundColor: '#e8f4f8', padding: '20px' }}>
            <ToastContainer />
            <h1>Manage Team</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>access level</th>
                        <th style={thStyle}>update</th>
                        <th style={thStyle}>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6">Loading...</td>
                        </tr>
                    ) : (
                        data.map((user, index) => (
                            <tr key={index}>
                                <td className='p-3'>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.type}</td>
                                <td>
                                    <Button variant="primary" style={{ marginRight: '10px' }} onClick={() => handleEdit(user.id)}>Edit</Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    )}
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
                                <label htmlFor="editName" className="form-label">Name</label>
                                <input type="text" className="form-control" id="editName" placeholder="Enter name" value={nameEdit} onChange={(e) => setEditName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editPass" className="form-label">Password</label>
                                <input type="text" className="form-control" id="editDesc" placeholder="Enter Password" value={passwordEdit} onChange={(e) => setEditPassword(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editEmail" className="form-label">Email</label>
                                <input type="text" className="form-control" id="editDesc" placeholder="Enter Email" value={emailEdit} onChange={(e) => setEditEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editType" className="form-label">User Type</label>
                                <input type="text" className="form-control" id="editDesc" placeholder="Enter Type" value={typeEdit} onChange={(e) => setEditType(e.target.value)} />
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

export default Mteam;
