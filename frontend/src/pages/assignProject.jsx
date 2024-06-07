import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignProject = () => {
  const [developerID, setDeveloperID] = useState("");
  const [projectID, setProjectID] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [projects, setProjects] = useState([]);

  // Function to retrieve token from local storage
  const getToken = () => {
    return localStorage.getItem('token');
  };

  const Clear = () => {
    setDeveloperID("");
    setProjectID("");
  };

  const fetchData = async () => {
    try {
      // Include the token in the request headers
      const token = getToken();
      
      // Fetch developers
      const developersResponse = await axios.get('http://localhost:5059/api/developer/withName', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDevelopers(developersResponse.data.$values);

      // Fetch projects
      const projectsResponse = await axios.get('http://localhost:5059/api/project', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProjects(projectsResponse.data.$values);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    try {
      // Include the token in the request headers
      const token = getToken();
      
      await axios.post("http://localhost:5059/api/ProjectDeveloper", {
        projectID: projectID,
        developerID: developerID,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchData();
      Clear();
      toast.success("Project assigned successfully!");
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error("Project has already been assigned to this developer.");
      } else {
        toast.error(error.message || "Error saving data");
      }
      console.error('Error saving data:', error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#e8f4f8', height: '95%', padding: '4em' }}>
      <ToastContainer />
      <h1>Assign a Project to a Developer</h1>
      <form className="w-100">  {/* Add class w-100 for full width */}
        <div className="form-group mt-2">
          <label htmlFor="developer" className='mb-2' >Select Developer:</label>
          <select className="form-control" id="developer" value={developerID} onChange={(e) => setDeveloperID(e.target.value)}>
            <option value="">Select Developer</option>
            {developers.map((developer) => (
              <option key={developer.id} value={developer.id}>{developer.name} (ID: {developer.id})</option>
            ))}
          </select>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="project" className='mb-2'>Select Project:</label>
          <select className="form-control" id="project" value={projectID} onChange={(e) => setProjectID(e.target.value)}>
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name} (ID: {project.id})</option>
            ))}
          </select>
        </div>

        <button type="button" className="btn btn-primary mt-3" onClick={handleSave}>Assign Project</button>
      </form>
    </div>
  );
};

export default AssignProject;
