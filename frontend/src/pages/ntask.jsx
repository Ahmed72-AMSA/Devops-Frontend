import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Task = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectID, setProjectID] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const Clear = () => {
    setTitle("");
    setDescription("");
    setProjectID("");
    setImageFile(null);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('projectID', projectID);
      formData.append('imageFile', imageFile);

      await axios.post("http://localhost:5059/api/task", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      Clear();
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error(error.message || "Error saving data");
      console.error('Error saving data:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#e8f4f8', padding: '20px' , height: '95%' }}>
      <ToastContainer/>
      <h1>Creating task</h1>

      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Task Title</label>
          <input type="text" className="form-control" id="title" placeholder="Enter name" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Task Description</label>
          <input type="text" className="form-control" id="desc" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="projId" className="form-label">Project ID</label>
          <input type="text" className="form-control" id="projId" placeholder="Enter Project ID" value={projectID} onChange={(e) => setProjectID(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="imageFile" className="form-label">Image File</label>
          <input type="file" className="form-control" id="imageFile" onChange={(e) => setImageFile(e.target.files[0])} />
        </div>

        <button type="button" className="btn btn-primary mt-3" onClick={handleSave}>Create New Task</button>
      </form>
    </div>
  );
};

export default Task;
