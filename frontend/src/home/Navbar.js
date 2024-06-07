import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-scroll";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

import { scroller } from "react-scroll";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      to: "Home", // Scroll to the corresponding section ID
    },
    {
      text: "Projects",
      icon: <InfoIcon />,
      to: "project",
      route: "projects" // Scroll to the corresponding section ID
    },
    {
      text: "Other's tasks",
      icon: <CommentRoundedIcon />,
      to: "Otasks", // Scroll to the corresponding section ID
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      
      to: "Contact", // Scroll to the corresponding section ID
    },
    {
      text: "Tasks",
      icon: <InfoIcon />,
      to: "tasks", // Scroll to the corresponding section ID
    },
  ];

  const handleLinkClick = (sectionId) => {
    setOpenMenu(false); // Close the menu
    scroller.scrollTo(sectionId, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  
    
  };
  const navigate=useNavigate();
  const handleLogout = () => {
    navigate('/');
    localStorage.clear()
  };
  return (
    <nav>
      <div className="nav-logo-container">
        <h4>Devops</h4>
      </div>
      <div className="navbar-links-container">
        {menuOptions.map((item) => (
          <Link
            key={item.text}
            to={item.to}
            spy={true}
            smooth={true}
            duration={500}
            onClick={() => handleLinkClick(item.to)}
          >
            {item.text}
          </Link>
        ))}
        <button className="primary-button"  onClick={handleLogout}>Logout</button>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        anchor="right"
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => handleLinkClick(item.to)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
