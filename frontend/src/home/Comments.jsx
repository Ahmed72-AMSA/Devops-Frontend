import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye } from 'react-icons/fa'; // Import FontAwesome icon
import './comment.css'; // Import your CSS file for styling

const Comments = () => {
  const [comments, setComments] = useState([]);
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    if (!userEmail) {
      console.error('User email not found in local storage');
      return;
    }

    // Fetch comments from the API using user email
    axios.get(`http://localhost:5059/api/comments/user/${userEmail}`)
      .then(response => {
        // Set comments in state
        setComments(response.data.$values);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [userEmail]); // Add userEmail as a dependency to useEffect

  return (
    <div className="comments-list">
      <h2>Comments</h2>
      {comments.map(comment => (
        <div key={comment.id} className={`comment ${comment.seen ? 'seen' : 'unseen'}`}>
          <img src="/images/avatar.webp" alt="User Avatar" className="avatar" />
          <div className="comment-content">
            <div className="comment-header">
              <span className="username">{comment.userEmail}</span>
              {/* Display task ID */}
              <span className="task-id">Task ID: {comment.taskId}</span>
              {/* Display admin ID */}
              <span className="admin-id">Admin ID: {comment.userId}</span>
            </div>
            <p className="text">{comment.commentBody}</p>
          </div>
          {/* Seen icon */}
          {comment.seen ? <FaEye className="seen-icon" /> : null}
        </div>
      ))}
    </div>
  );
};

export default Comments;
