import React, { useState } from "react";
import axios from "axios";
import { SelectedUser } from "../../context/UserContext";
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Personal.css';

function Personal() {

  const {user,setUser}=SelectedUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProfileData, setEditProfileData] = useState({
    name: user?.name,
    username: user?.username,
    profile: user?.profile,
  });

  const [profilePreview, setProfilePreview] = useState(user?.profile);

  const handleBack = () => {
    window.history.back();
  };

  const handleLogout = () => {
    navigate("../");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    setEditProfileData({ ...editProfileData, [e.target.name]: e.target.value });
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const maxSizeMB = 2;
    const maxSizeBytes = 100000;
    const err=document.getElementById("personalErrorTag");
    err.textContent="";
    if (file) {
      if (file.size > maxSizeBytes) {
        err.textContent=`Your file size is ${file.size} bytes. File size exceeds the ${maxSizeMB}MB limit. Please upload a smaller file.`;
        return;
      }

      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setProfilePreview(reader.result);
        };
      } catch (error) {
        console.error("Image processing failed:", error);
      }
    }
  };

  const handleSaveChanges = async () => {
    const response = await axios.patch("https://event-link-admin-server.vercel.app/api/user/updateUserDetail", {
      name: editProfileData.name,
      profile: profilePreview,
      username:user?.username
    });
    setUser(response.data.data);
    toggleModal();
  };

  const handleDeleteAccount = async() => {
    console.log("Account Deleted");
    const response = await axios.post("https://event-link-admin-server.vercel.app/api/user/deleteUser", {
      username:user?.username
    });
    console.log(response.data.message);
    navigate("../");
  };



  return (
    <>
      <div className="personal-container">
        <div className="personal-header">
          <div className="personal-actions">
            <FaArrowLeft className="back-arrow" onClick={handleBack} />
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>

          <div className="personal-picture">
            {user?.profile ? (
              <img src={user?.profile} alt="Profile" className="profile-img" />
            ) : (
              <div className="default-picture">
                <p>Upload Profile Picture</p>
                <button>Save Profile Picture</button>
              </div>
            )}
          </div>

          <div className="personal-info">
            <h1>{user?.name}</h1>
            <p>@{user?.username}</p>
            <p>Joined on {new Date(user?.createdAt).toLocaleDateString()}</p>

            <button className="edit-personal-btn" onClick={toggleModal}>
              Edit Profile
            </button>
          </div>
        </div>


        {isModalOpen && (
          <div className="personal-modal">
            <div className="personal-modal-content">
              <h2>Edit Profile</h2>
              <div className="personal-modal-form">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={editProfileData.name}
                  onChange={handleInputChange}
                />

                <label>Profile Picture:</label>
                <input
                  type="file"
                  name="profile"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
                {profilePreview && (
                  <img src={profilePreview} alt="Profile Preview" className="profile-img-preview" />
                )}
                <p id="personalErrorTag"></p>

                <div className="personal-modal-actions">
                  <button onClick={handleSaveChanges} className="personal-save-btn">
                    Save Changes
                  </button>
                  <button onClick={handleDeleteAccount} className="personal-delete-btn">
                    Delete Account
                  </button>
                  <button onClick={toggleModal} className="personal-close-btn">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Personal;
