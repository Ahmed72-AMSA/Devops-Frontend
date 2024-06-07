import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DashboardNavbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Clear all data from local storage
        navigate('/signup', { replace: true });
};

    return (
        <Navbar bg="primary" expand="lg" className="justify-content-between">
            <Navbar.Brand href="#" className='text-white ms-4'>Devops</Navbar.Brand>
            <Nav>
                {/* Add any additional links or components here */}
            </Nav>
            <Nav>
                <Button className="btn-danger me-3" onClick={handleLogout}>Logout</Button>
            </Nav>
        </Navbar>
    );
};

export default DashboardNavbar;
