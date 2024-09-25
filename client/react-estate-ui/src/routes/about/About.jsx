import "./about.scss";
import { Link } from "react-router-dom"; 

function About() {
  return (
    <div className="About">
      <div className="Information">  
        <div className="about-header">
        <p>Your Trusted Real Estate Partner</p>
      </div>
      
      <div className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            At LydiaEstate, our mission is to connect people with their dream properties 
            by providing an unparalleled real estate experience. Whether you're looking to buy, sell, or rent, 
            we’re here to guide you every step of the way.
          </p>
        </div>

        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Experienced and dedicated agents who know the local market.</li>
            <li>Personalized service tailored to meet your unique needs.</li>
            <li>Access to a wide range of exclusive listings.</li>
            <li>A seamless and transparent buying or renting process.</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <p>
            We believe in building lasting relationships with our clients through trust, integrity, and exceptional service.
            Our core values revolve around customer satisfaction, transparency, and providing real value.
          </p>
        </div>

        
      </div>

      <div className="call-to-action">
        <h2>Get in Touch</h2>
        <p>Looking for your next property? Contact us today and let’s make it happen.</p>
        <button className="contact-btn"><Link to="/contact">Contact Us</Link> </button>
      </div> </div>
      <div className="imgContainer"> 
        <img src="/bg.png" alt="" /> 
         </div>
    </div>
  );
}

export default About;
