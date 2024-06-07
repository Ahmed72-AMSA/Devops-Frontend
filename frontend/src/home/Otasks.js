import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../projects.css";

const Otasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5059/api/homepage/alltasks");
        setTasks(response.data.$values);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="work-section-wrapper " id="Otasks">
      <div className="work-section-top">
        <h1 className="primary-heading">Other's tasks</h1>
        <p className="primary-text">"The only way to do great work is to love what you do."</p>
      </div>
      <div className="work-section-bottom">
        <div className="grid-container w-100">
          {tasks.map((task) => (
            <div className="grid-item" key={task.taskId}>
              <div className="info-boxes-img-container">
                <img src={`http://localhost:5059/images/${task.taskImage}`} alt="" />
              </div>
              <h2>{task.taskName}</h2>
              <p>{task.projectName}</p>
              <p><span className='  text-capitalize text-warning me-1'>Status:</span>{task.status}</p>
              <h5><span className='  text-capitalize text-warning me-1'>Developer Name:</span>{task.developerName}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Otasks;
