import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';

const SearchTasks = () => {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('ID'); // Default search type
    const [notFound, setNotFound] = useState(false);

    const searchByID = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5059/api/task/${searchQuery}`);
            setSearchResults(response.data ? [response.data] : []);
            setNotFound(response.data ? false : true);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
            setNotFound(true);
        } finally {
            setLoading(false);
        }
    };

    const searchByDeveloperName = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5059/api/task/ByDeveloperName/${searchQuery}`);
            setSearchResults(response.data ? response.data.$values : []);
            setNotFound(response.data ? false : true);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
            setNotFound(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchType === 'ID') {
            searchByID();
        } else if (searchType === 'DeveloperName') {
            searchByDeveloperName();
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchTypeChange = (type) => {
        setSearchType(type);
        setSearchQuery(''); // Reset search query when changing search type
    };

    return (
        <div style={{ backgroundColor: '#e8f4f8', padding: '20px'}}>
            <ToastContainer />
            <h1>Search about Tasks</h1>
            <Form onSubmit={handleSearchSubmit}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder={`Search by ${searchType === 'ID' ? 'task ID' : 'developer name'}`}
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                </Form.Group>
                <div className="d-flex align-items-center">
                    <div className="btn-group mr-2 mt-2" role="group">
                        <button
                            type="button"
                            className={`btn btn-outline-secondary ${searchType === 'ID' ? 'active' : ''}`}
                            onClick={() => handleSearchTypeChange('ID')}
                        >
                            Search by ID
                        </button>
                        <button
                            type="button"
                            className={`btn btn-outline-secondary ${searchType === 'DeveloperName' ? 'active' : ''}`}
                            onClick={() => handleSearchTypeChange('DeveloperName')}
                        >
                            Search by Developer Name
                        </button>
                    </div>
                    <button type="submit" className="btn btn-primary mt-2 ms-4">Search</button>
                </div>
            </Form>
            {loading ? (
                <p>Loading...</p>
            ) : searchResults.length > 0 ? (
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>Task ID</th>
                            <th>Task Name</th>
                            <th>Task Description</th>
                            <th>Developer Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((task, index) => (
                            <tr key={index}>
                                <td>{task.taskId}</td>
                                <td>{task.taskName}</td>
                                <td>{task.taskDescription}</td>
                                <td>{task.developerName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : notFound ? (
                <div className="alert alert-danger mt-3" role="alert">
                    <p>No Tasks Found please check your database or check your task ID or Developer name again !</p>
                </div>
            ) : null}
        </div>
    );
};

export default SearchTasks;
