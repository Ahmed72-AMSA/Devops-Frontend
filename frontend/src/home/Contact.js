import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const developerId = localStorage.getItem("developerId");
  
  // State to hold form data
  const [formData, setFormData] = useState({
    managerEmail: "",
    taskId: "",
    message: ""
  });

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5059/api/Comments", {
        commentBody: formData.message,
        taskId: formData.taskId,
        userId: developerId,
        userEmail: formData.managerEmail
      });

      // Show success message using Toastify
      toast.success("Message submitted successfully!");

      // Clear form fields
      setFormData({
        managerEmail: "",
        taskId: "",
        message: ""
      });
    } catch (error) {
      // Show error message using Toastify
      toast.error(error.response.data);
    }
  };

  return (
    <div className="contact-page-wrapper" id="Contact">
      <h1 className="primary-heading">Have Question In Mind?</h1>
      <h5 className="primary-text">Feel free to message your leader</h5>
      <div className="contact-form-container mb-2">
        <input
          type="text"
          placeholder="Your Manager Email"
          className="form-control"
          value={formData.managerEmail}
          onChange={(e) =>
            setFormData({ ...formData, managerEmail: e.target.value })
          }
        />
      </div>

      <div className="contact-form-container mb-2">
        <input
          type="text"
          className="form-control"
          value={developerId}
          disabled
        />
      </div>

      <div className="contact-form-container mb-2">
        <input
          type="text"
          placeholder="Your Task ID"
          className="form-control"
          value={formData.taskId}
          onChange={(e) =>
            setFormData({ ...formData, taskId: e.target.value })
          }
        />
      </div>

      <div className="contact-form-container mb-2">
        <input
          type="text"
          placeholder="Write Your Message here"
          className="form-control"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
      </div>

      <button className="secondary-button ms-2" onClick={handleSubmit}>
        Submit
      </button>

      <ToastContainer />
    </div>
  );
};

export default Contact;
