import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = axios.create({
  baseURL: 'http://localhost:5059/api/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

const Mprojects = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [nameEdit, setEditName] = useState('');
  const [descriptionEdit, setEditDescription] = useState('');
  const [idEdit, setEditId] = useState('');

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('project');
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
    api.get(`project/${id}`)
      .then(result => {
        setEditId(result.data.id);
        setEditName(result.data.name);
        setEditDescription(result.data.description);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`project/${idEdit}`, {
        id: idEdit,
        name: nameEdit,
        description: descriptionEdit
      });
      fetchData();
      handleClose();
      toast.success('Project updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Error updating project');
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Do you Want to Delete Developer')) {
      try {
        await api.delete(`project/${id}`);
        toast.success('Project Deleted successfully!');
        fetchData();
      } catch (error) {
        toast.error(error.message || 'Error deleting data');
        console.error('Error deleting data:', error);
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#e8f4f8', padding: '20px' }}>
      <ToastContainer />
      <h1>Manage Projects</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Project Name</th>
            <th style={thStyle}>Project Description</th>
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
            data.map((project, index) => (
              <tr key={index} className="p-4">
                <td className="p-3">{project.id}</td>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>
                  <Button variant="warning" style={{ marginRight: '50px' }} onClick={() => handleEdit(project.id)}>Update</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(project.id)}>Delete</Button>
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
                <input type="text" className="form-control" id="editDesc" placeholder="Enter Password" value={descriptionEdit} onChange={(e) => setEditDescription(e.target.value)} />
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

export default Mprojects;
