import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      fetchData(tokenFromStorage);
    }
  }, []);

  const fetchData = async (token) => {
    try {
      const response = await axios.get('http://localhost:5059/api/project', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setData(response.data.$values);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:5059/api/project", {
        name: name,
        description: description,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchData(token);
      clearFields();
      toast.success("Project added successfully!");
    } catch (error) {
      toast.error(error.message || "Error saving data");
      console.error('Error saving data:', error);
    }
  };

  const clearFields = () => {
    setName("");
    setDescription("");
  };

  return (
    <div style={{ backgroundColor: '#e8f4f8', height: '95%', padding:'4em'}}>
      <ToastContainer />
      <h1>Creating New Project</h1>
      <form className="w-100">
        <div className="form-group">
          <label htmlFor="name">Project Name:</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="desc">Project Description:</label>
          <input type="text" className="form-control" id="desc" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <button type="button" className="btn btn-primary mt-3" onClick={handleSave}>Create New Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
