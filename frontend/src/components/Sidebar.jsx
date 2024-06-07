import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../pages/side.css';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,
    FaTasks,
    FaEnvelopeOpenText ,
    FaSearchengin,
    FaFacebookMessenger,
    FaDropbox

} from "react-icons/fa";

import { NavLink } from 'react-router-dom';

const Sidebar = ({ children }) => {
 
    const menuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/dashboard/mteam",
            name: "manage team",
            icon: <FaUserAlt />
        },
        {
            path: "/dashboard/mprojects",
            name: "manage projects",
            icon: <FaRegChartBar />
        },
        {
            path: "/dashboard/mtasks",
            name: "manage tasks",
            icon: <FaCommentAlt />
        },
        {
            path: "/dashboard/dev-proj",
            name: "Assigned Projects",
            icon: <FaUserAlt />
        },
        {
            path: "/dashboard/nproject",
            name: "create project",
            icon: <FaThList />
        },
        {
            path: "/dashboard/ntask",
            name: "create task",
            icon: <FaShoppingBag />
        },


        {
            path: "/dashboard/assignProject",
            name: "Assign a project to developer",
            icon: <FaTasks/>
        },

        {
            path: "/dashboard/dev-task",
            name: "Assigned Tasks",
            icon: <FaEnvelopeOpenText/>


        },


        {
            path: "/dashboard/searchtasks",
            name: "Tasks Search",
            icon: <FaSearchengin/>


        },


        {
            path: "/dashboard/taskAttach",
            name: "Task attachement",
            icon: <FaCommentAlt />
        },


        
        {
            path: "/dashboard/inbox",
            name: "Inbox",
            icon: <FaFacebookMessenger/>
        },

        {
            path: "/dashboard/taskComments",
            name: "Task Comments",
            icon: <FaDropbox/>
        },


            
    ];

    return (
        <div className="container-fluid">
            <div className="row">
                <div style={{ width: "260px" , height: "100vh"}} className="sidebar">
                    <div className="top_section">
                        <h1 style={{ display:"block" }} className="logo"><span className='text-danger'>Dev</span><span className='text-primary'>Ops</span></h1>
                        <div style={{ marginLeft: "50px" }} className="bars">
                            <FaBars />
                        </div>
                    </div>
                    <div className="sidebar-content">
                        {menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index} className="link">
                                <div className="icon">{item.icon}</div>
                                <div className="link_text text">{item.name}</div>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <main className="col">{children}</main>
            </div>
        </div>
    );
};

export default Sidebar;



