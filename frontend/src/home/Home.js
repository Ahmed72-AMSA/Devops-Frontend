import React from "react";
import BannerBackground from "../assets2/home-banner-background.png";
import 'bootstrap/dist/css/bootstrap.min.css';

import BannerImage from "../assets2/dev2.jpg";
import Navbar from "./Navbar";

import Projects from './Projects';
import Tasks from './Tasks';
import Otasks from './Otasks';
import Contact from './Contact';
import Footer from './Footer';
import SubmitTasks from "./SubmitTasks";
import Comments from "./Comments";

const Home = () => {
  return (
    <div>
    <div className="home-container" id="Home">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
          Bridging the Gap: How DevOps is Revolutionizing IT
          </h1>
          <p className="primary-text">
          "DevOps is about creating a culture of shared responsibility, continuous improvement, and rapid iteration"
          </p>
          
        </div>
        <div className="home-image-section">
          <img
            src={BannerImage}
            alt=""
            style={{
              borderRadius: "50%",
              width: "400px", // adjust the width to your liking
              height: "400px", // adjust the height to your liking
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
    <Projects/>
    <Tasks/>
    <SubmitTasks/>
  
    <Otasks />
    <Contact/>
    <Comments/>
    <Footer/>




    </div>
    
  );
};

export default Home;










  // const workInfoData = [
  //   {
  //     image: ecomerce,
  //     title: "e-commerce organization",
  //     text: "making e-commerce website for handling customers orders",
  //   },
  //   {
  //     image: ChooseMeals,
  //     title: "Choose How Often",
  //     text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et",
  //   },
  //   {
  //     image: DeliveryMeals,
  //     title: "Fast Deliveries",
  //     text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
  //   },
  // ];