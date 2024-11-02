import React from 'react';
import { useNavigate } from 'react-router-dom';
import Step1 from '../../assets/step-1.png';
import Step2 from '../../assets/step-2.png';
import Step3 from '../../assets/step-3.png';
import './Home.css';

function Home() {
  const navi = useNavigate();
  return (
    <div className="home-container">
      <div className='home-section1'>
        <header className="home-header">
          <div className="home-logo">EventLink</div>
          <div className="header-buttons">
            <button className="sign-up-button" onClick={() => { navi("../login") }}>Login</button>
          </div>
        </header>

        <main className="main-content">
          <h1 className="home-title">Create Events!</h1>
          <p className="subtitle">
            With EventLink, seamlessly organize and manage events while maintaining ongoing communication straight from your inbox, ensuring smooth coordination and easy follow-ups with your contacts              </p>
          <button className="cta-button" onClick={() => { navi("../login") }}>Explore</button>
        </main>
      </div>
      <section className="how-it-works">
        <h2>Here's how it works</h2>
        <p>EventLink - Admin</p>
        <div className="steps">
          <div className="step">
            <img src={Step1} alt="Scan QR code" />
            <h4>Signup</h4>
            <p>Start by creating your account. Simply provide your email, set a password, and you're ready to go!</p>
          </div>
          <div className="step">
            <img src={Step2} alt="Send a message" />
            <h4>Create Event</h4>
            <p>Event Once signed in, head to the dashboard and create your event. Customize it by entering the event name, date, time, and other details.</p>
          </div>
          <div className="step">
            <img src={Step3} alt="Follow-up" />
            <h4>Schedule Event</h4>
            <p> Need to make changes? Easily update your event with new information or adjust the details at any time through the event dashboard.</p>
          </div>
        </div>
        <button className="start-jiving-button" onClick={() => { navi("../login") }}>Start Planning</button>
      </section>

      <footer className="footer">
        <p>© 2024 EventLink. All rights reserved.</p>
      </footer>
    </div>
  );
}


export default Home;