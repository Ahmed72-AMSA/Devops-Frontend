import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../task.css";

const Tasks = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let dev_id = localStorage.getItem("developerId");
    axios.get(`http://localhost:5059/api/homepage/tasks/${dev_id}`)
      .then(response => {
        // Set tasks in state
        setTasks(response.data.$values);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handlePrev = () => {
    setActiveIndex(prevIndex => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => (prevIndex === tasks.length - 2 ? prevIndex : prevIndex + 1));
  };

  return (
    <div id='tasks'>
      <section className="py-xl-9 py-5 bg-gray-900 task">
        <div className="con">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 col-12">
              <div className="text-center mb-xl-7 mb-5">
                <small className="text-uppercase ls-md fw-semibold text-white">Your tasks</small>
                <p className="mb-0 text-white">"Believe you can and you're halfway there."</p>
              </div>
            </div>
          </div>
          <div className="row">
            {tasks.map((task, index) => (
              <div key={index} className={`col-md-4 ${index === activeIndex ? 'active' : ''}`}>
                <div className="card border-0 h-100 card-lift">
                  <img src={`http://localhost:5059/images/${task.taskImage}`} alt="task" className="img-fluid rounded-top-3" />
                  <div className="card-body">
                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex flex-column gap-4">
                        <div className='mt-3 mb-3 justify-content-center align-items-center'>
                          <h4><span className='text-capitalize text-danger me-1'>Task Id:</span>{task.taskId}</h4>
                          <div className='mt-3 mb-3 justify-content-center align-items-center'>
                            <h4><span className='text-capitalize text-danger me-1'>Title:</span>{task.taskTitle}</h4>
                            <div className='d-flex mb-3'>
                              <h4><span className='text-capitalize text-danger me-1'>Status:</span>{task.taskStatus}</h4>
                            </div>
                            <div className='d-flex mb-3'>
                              <h4><span className='text-capitalize text-danger me-1'>Project Name:</span>{task.projectName}</h4>
                            </div>
                            <div className='d-flex mb-3'>
                              <h4><span className='text-capitalize text-danger me-1'>Description:</span>{task.taskDescription}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-12 d-flex justify-content-center p-3">
              <button className="btn btn-prev btn-icon btn-white rounded-pill me-3 text-black bg-warning" onClick={handlePrev}>
                <i className="bi bi-arrow-left-short fs-3 lh-1"></i>
              </button>
              <button className="btn btn-next btn-icon btn-white rounded-pill text-white bg-warning" onClick={handleNext}>
                <i className="bi bi-arrow-right-short fs-3 lh-1"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tasks;
