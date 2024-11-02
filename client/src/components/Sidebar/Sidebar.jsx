import React, { useState } from 'react';
import './Sidebar.css';
import Password from '../../pages/PasswordRecover/Password';
import EventScheduler from '../../pages/EventSchedular/EventSchedular';
import Personal from '../../pages/Personal/Personal';
import Navbar from '../Navbar/Navbar';
import PlannedEvent from '../../pages/PlannedEvent/PlannedEvent';


function Sidebar() {
    const [activeSection, setActiveSection] = useState("Schedule Event");

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    return (
        <>
            <Navbar />
            <div className="profile-page">
                <div className="profile-container">
                    <div className="profile-sidebar">
                        <ul>
                            <li
                                className={activeSection === "Personal Information" ? "active" : ""}
                                onClick={() => handleSectionChange("Personal Information")}
                            >
                                Personal Information
                            </li>
                            <li
                                className={activeSection === "Schedule Event" ? "active" : ""}
                                onClick={() => handleSectionChange("Schedule Event")}
                            >
                                Schedule Event
                            </li>
                            <li
                                className={activeSection === "Planned Event" ? "active" : ""}
                                onClick={() => handleSectionChange("Planned Event")}
                            >
                                Planned Event
                            </li>
                            <li
                                className={activeSection === "Password Change" ? "active" : ""}
                                onClick={() => handleSectionChange("Password Change")}
                            >
                                Password Change
                            </li>
                        </ul>
                    </div>

                    <div className="profile-content">
                        {activeSection === "Personal Information" && (
                            <div className="content-section">
                                <Personal />
                            </div>
                        )}

                        {activeSection === "Password Change" && (
                            <div className="content-section">
                                <Password />
                            </div>
                        )}

                        {activeSection === "Planned Event" && (
                            <div className="content-section">
                               <PlannedEvent/>
                            </div>
                        )}

                        {activeSection === "Schedule Event" && (
                            <div className="content-section">
                                <EventScheduler />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
