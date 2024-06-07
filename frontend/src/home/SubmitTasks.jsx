import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeveloperId = localStorage.getItem("developerId");

const SubmitTasks = () => {
  const [formData, setFormData] = useState({
    taskId: '',
    developerId: DeveloperId,
    Status:'Done',
    file: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.taskId || !formData.file) {
      // Display error toast if task ID or file is missing
      toast.error("Please choose Task ID and upload a file.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const form = new FormData();
    form.append('taskId', formData.taskId);
    form.append('developerId', formData.developerId);
    form.append('Status', formData.Status);
    form.append('file', formData.file);

    try {
      const response = await axios.put(`http://localhost:5059/api/homepage/taskSubmission/${formData.taskId}/${formData.developerId}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Show success toast upon successful submission
      toast.success("Well done! You have finished your task.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error:', error);
      // Display error toast for other errors
      toast.error(`${error.response.data}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="container mt-5 w-100">
      <ToastContainer />
      <h2 className="text-center mb-4">Submit Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="taskId" className="form-label">Task Id</label>
          <input
            type="text"
            className="form-control"
            id="taskId"
            name="taskId"
            value={formData.taskId}
            onChange={handleChange}
            placeholder="Enter Task ID"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="developerId" className="form-label">Developer ID</label>
          <input
            type="text"
            className="form-control"
            id="developerId"
            name="developerId"
            value={formData.developerId}
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="developerId" className="form-label">Status</label>
          <input
            type="text"
            className="form-control"
            id="developerId"
            name="developerId"
            value="Done"
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">Upload File</label>
          <input
            type="file"
            className="form-control"
            id="file"
            name="file"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>

        
      </form>
    </div>
  );
};

export default SubmitTasks;
