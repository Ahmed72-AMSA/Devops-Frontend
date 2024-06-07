import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskComments = () => {
    const [formData, setFormData] = useState({
        taskId: '',
        userId: localStorage.getItem("userId"),
        userEmail: '',
        commentBody: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5059/api/Comments', formData);
            console.log('Comment posted successfully:', formData);
            toast.success('Comment posted successfully!');
        } catch (error) {
            console.error('Error posting comment:', error);
            toast.error('Failed to post comment. Please Check all fields and check that Task ID is Right.');
            // Add error handling logic here
        }
    };

    return (
        <Container fluid className="p-5 m-auto">
            <ToastContainer />
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="text-center mb-4 text-danger">Send a Comment on a Task</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="taskId" className='mb-3'>
                            <Form.Label>Task ID</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="taskId" 
                                value={formData.taskId} 
                                onChange={handleChange} 
                                placeholder="Enter Task ID" 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="adminId" className='mb-3'>
                            <Form.Label>Admin ID</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="userId" 
                                value={formData.userId} 
                                onChange={handleChange} 
                                disabled 
                            />
                        </Form.Group>
                        <Form.Group controlId="DeveloperMail" className='mb-3'>
                            <Form.Label>Developer Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                name="userEmail" 
                                value={formData.userEmail} 
                                onChange={handleChange} 
                                placeholder="Enter Developer Email" 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="comment" className='mb-3'>
                            <Form.Label>Your Comment</Form.Label>
                            <Form.Control 
                                as="textarea"
                                rows={3}
                                name="commentBody" 
                                value={formData.commentBody} 
                                onChange={handleChange} 
                                placeholder="Enter your Comment" 
                                required 
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="primary" type="submit" className='mt-3'>Send Comment</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default TaskComments;
