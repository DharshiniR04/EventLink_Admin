import React, { useEffect, useState } from 'react';
import './Navbar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/main_logo.png';
import { SelectedUser } from '../../context/UserContext';
import { SelectedEmail } from '../../context/EmailContext';
import { useLocation } from 'react-router-dom';


function Navbar() {

    const { user, setUser } = SelectedUser() || {};
    const { setEmail } = SelectedEmail() || {};
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const location = useLocation();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = async () => {
        localStorage.removeItem("adminEmail");
        setEmail("");
        setUser(null);
        navigate('../');
    };

    useEffect(() => {
        const fetchUserDetails = async () => {

            const token = localStorage.getItem("adminEmail");
            if (token && setUser) {
                try {
                    const userdetail = await axios.post(
                        "http://localhost:5100/api/user/fetchuser",
                        { email: token }
                    );
                    setUser(userdetail.data);
                    setEmail(token);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
        };

        fetchUserDetails();
    }, [setUser, setEmail]);

    return (

        <div className="home-navbar">
            <img src={Logo} className="logo" alt="event-logo" />
            <h2 className="title">EventLink</h2>

            <div className="home-profile-wrapper">
                <label
                    htmlFor="home-profile-image-upload"
                    className="home-image-upload-label"
                    onClick={toggleDropdown}
                >
                    <div
                        className="home-profile-image-upload"
                        style={{ backgroundImage: `url(${user?.profile})` }}
                    />
                </label>
                {dropdownVisible && (
                    <div className="home-dropdown">
                        {location.pathname !== '/sidebar' && <p className="home-dropdown-item" onClick={() => { navigate("../profile") }}>Profile</p> }

                        <p className="home-dropdown-item" onClick={handleLogout}>Logout</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar;