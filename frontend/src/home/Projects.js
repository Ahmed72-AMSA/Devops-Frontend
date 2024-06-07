import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../projects.css";
import DeliveryMeals from "../assets2/software.jpg";
import axios from 'axios'; // Import Axios

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [acceptedProjects, setAcceptedProjects] = useState([]);

  useEffect(() => {
    // Fetch projects assigned to the developer
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios.get(`http://localhost:5059/api/Homepage/projects/${userId}`)
        .then(response => {
          setProjects(response.data.$values);
        })
        .catch(error => {
          console.error('Error fetching projects:', error);
        });
    }

    // Fetch accepted project IDs for the current developer from the server
    const developerId = localStorage.getItem('developerId');
    if (developerId) {
      axios.get(`http://localhost:5059/api/Homepage/projects/accepted/${developerId}`)
        .then(response => {
          setAcceptedProjects(response.data);
        })
        .catch(error => {
          console.error('Error fetching accepted projects:', error);
        });
    }
  }, []);

  const isProjectAccepted = (projectId) => {
    return acceptedProjects.includes(projectId);
  };

  const handleAcceptProject = (projectId) => {
    const developerId = localStorage.getItem('developerId');
    axios.post('http://localhost:5059/api/Homepage/AcceptProject', {
      developerId: developerId,
      projectId: projectId
    })
    .then(response => {
      console.log('Project accepted:', response.data);
      // Add the project ID to the list of accepted projects
      setAcceptedProjects([...acceptedProjects, projectId]);
    })
    .catch(error => {
      if (error.response && error.response.data === "Project has already been accepted by the developer.") {
        // If the error is due to project already being accepted, mark it as accepted locally
        console.log('Project already accepted.');
        setAcceptedProjects([...acceptedProjects, projectId]);
      } else {
        console.error('Error accepting project:', error);
      }
    });
  };

  return (
    <div className="work-section-wrapper" id="project">
      <div className="work-section-top">
        <p className="primary-subheading">projects</p>
        <h1 className="primary-heading">Your Projects</h1>
        <p className="primary-text">
          "The only way to do great work is to love what you do."
        </p>
      </div>
      <div className="work-section-bottom">
        <div className="grid-container w-100" style={{ margin: "20px" }}>
          {projects.length > 0 ? (
            projects.map(project => (
              <div className="grid-item" key={project.id}>
                <div className="info-boxes-img-container">
                  <img src={DeliveryMeals} alt="" />
                </div>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <div>
                  <button onClick={() => handleAcceptProject(project.id)} className="btn btn-outline-success">
                    {isProjectAccepted(project.id) ? "Project Accepted" : "Accept Project"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <p className="primary-heading text-danger">No projects have been assigned yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
