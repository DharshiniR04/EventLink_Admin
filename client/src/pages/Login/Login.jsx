import React, { useEffect, useState } from "react";
import './Login.css';
import axios from "axios";
import Image from '../../assets/login.png';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { SelectedUser } from "../../context/UserContext";
import Modal from '../../components/Modal/Modal';

function Login() {
    const navi = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const { user,setUser } = SelectedUser();

    useEffect(()=>{
        console.log(user);
    },[user]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const fetchUserDetail=async(email)=>{
        try{
           const userdetail=await axios.post("https://event-link-admin-server.vercel.app/api/user/fetchuser",{email:email});
           return userdetail;
        }
        catch(err){
           console.log(err);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const errorTag = document.getElementById('errorTag');
        const data = {
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        };
        try {
            const response = await axios.post("https://event-link-admin-server.vercel.app/api/auth/login", { email: data.email, password: data.password });
            if (response.data.message === "User does not exist") {
                errorTag.textContent = "User does not exist";
            }
            else if (response.data.message === "Invalid credentials") {
                errorTag.textContent = "Invalid credentials";
            }
            else if (response.data.message === "Login successful") {
                const userDetail=await fetchUserDetail(data.email);
                setUser(userDetail.data);
                localStorage.setItem("adminEmail",data.email);
                setModalMessage("Login successful");
                setIsModalOpen(true);
            }

        } catch (err) {
            console.log(err);
        }

    }

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage("");
        navi('../sidebar');
    };

    return (
        <div className="login-container">
            {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
            <div className="login">
                <div className="login-img">
                    <div className="overlay"></div>
                    <div className="login-text">
                        <h1>EventLink</h1>
                        <p>Create Events, Create new oppurtunities!</p>
                    </div>
                    <img src={Image} alt="login-img" />
                </div>
                <div className="login-content">
                    <FaArrowLeft className="back-arrow" onClick={() => {window.history.back() }} />
                    <h2 className="login-content-head">Welcome back ,</h2>
                    <form onSubmit={handleLogin}>
                        <div className="login-form-group">
                            <div className="input-container">
                                <input type="email" id="email" name="email" className="solid-input" placeholder="Email" required />
                            </div>
                            <div className="input-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="solid-input"
                                    placeholder="Password"
                                    required
                                />
                                <span className="password-toggle" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <p id="errorTag"></p>
                            <button className="login-btn" type="submit">Login</button>
                            <p className="forgotpasslog">Forgot Password ?<span id="forgotpasssapn" onClick={()=>{navi('../passwordrecover')}}>  Recover</span></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
