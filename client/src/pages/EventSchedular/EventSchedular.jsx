import React, { useState } from 'react';
import axios from 'axios';
import {SelectedUser} from '../../context/UserContext';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './EventSchedular.css';
import Modal from '../../components/Modal/Modal';

const EventScheduler = () => {

  const { user } = SelectedUser();
  const [image, setImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEventDetail, setIsEventDetail] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [EventDet, setEventDet] = useState([]);
  const [currentRule, setCurrentRule] = useState('');
  const [rules, setRules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleAddRule = () => {
    if (currentRule.trim() !== '') {
      setRules([...rules, currentRule]);
      setCurrentRule('');
    }
  };

  const handleDeleteRule = (index) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };


  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    return [...Array(daysInMonth).keys()].map((day) => day + 1);
  };

  const handleDateClick = (day) => {
    const formattedMonth = String(selectedMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const selectedDate = `${selectedYear}-${formattedMonth}-${formattedDay}`;
    setSelectedDate(selectedDate);
    setIsSidebarOpen(true);
  };


  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else if (direction === 'next') {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const maxSizeMB = 2;
    const maxSizeBytes = 100000;

    if (file) {
      if (file.size > maxSizeBytes) {
        setModalMessage(`Your file size is ${file.size} bytes. File size exceeds the ${maxSizeMB}MB limit. Please upload a smaller file.`);
        setIsModalOpen(true);
        return;
      }

      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImage(reader.result);
        };
      } catch (error) {
        console.error("Image processing failed:", error);
      }
    }
  };


  const handleEvent = async (e) => {

    e.preventDefault();
    const data = {
      name: e.target.elements.name.value,
      date: e.target.elements.date.value,
      time: e.target.elements.time.value,
      duration: e.target.elements.duration.value,
      department: e.target.elements.department.value,
      location: e.target.elements.location.value,
      category: e.target.elements.category.value
    }

    const formatTime = (time) => {
      const [hours, minutes] = time.split(':');
      const formattedHours = (hours % 12) || 12;
      const period = hours >= 12 ? 'PM' : 'AM';
      return `${formattedHours}:${minutes} ${period}`;
    };

    const formattedTime=formatTime(data.time);

    try {
      const response = await axios.post("http://localhost:5100/api/event/addevent", { name: data.name, date: data.date, time: formattedTime, duration: data.duration, location: data.location, category: data.category });
      if (response.data.message === "Event Already Exists") {
        alert("Event Already Exists");
      }
      else if (response.data.message === "Added successfully") {
        alert("Added successfully");
        setEventDet(data);
        setIsEventDetail(true);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleEventDetail = async (e) => {

    e.preventDefault();

    const getReminderText = (reminderValue) => {
      switch (reminderValue) {
        case "60":
          return "1 hour before event";
        case "1440":
          return "1 day before event";
        case "10080":
          return "1 week before event";
        default:
          return "1 hour before event";
      }
    };


    const reminderText = getReminderText( Number(e.target.elements.reminder.value));

    const data = {
      name: EventDet.name,
      category: EventDet.category,
      date: EventDet.date,
      location: EventDet.location,
      department: EventDet.department,
      reminder: reminderText,
      description: e.target.elements.description.value,
      rules: rules,
      image: image,
      teamsize: Number(e.target.elements.teamSize.value),
      adminname:user.name,
      admincontact:user.mobile,
      adminemail:user.email,
      adminprofile:user.profile
    }


    try {
      const response = await axios.post("http://localhost:5100/api/event/addeventdetail", data);

      if (response.data.message === "Updated successfully") {
        alert("Updated successfully");
        setIsEventDetail(false);
        setRules([]);
        handleCloseSidebar();
      }
      else {
        setModalMessage("Error in updating");
        setIsModalOpen(true);
      }
    } catch (err) {
      if(err.status===413){
        setModalMessage("Payload too large - Change Image");
        setIsModalOpen(true);
      }
      console.log(err);
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };


  return (
    <>
      {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
      <div className="scheduler-container">
        <div className={`calendar-section ${isSidebarOpen ? 'blurred' : ''}`}>
          <div className="calendar-controls">
            <button onClick={() => handleMonthChange('prev')} className="arrow-btn">
              <FaArrowLeft />
            </button>
            <span className='month'>{months[selectedMonth]} {selectedYear}</span>
            <button onClick={() => handleMonthChange('next')} className="arrow-btn">
              <FaArrowRight />
            </button>
            <input
              type="number"
              value={selectedYear}
              onChange={handleYearChange}
              className="year-input"
            />
          </div>

          <div className="calendar-grid">
            {generateDays().map((day) => (
              <div
                key={day}
                className="calendar-date"
                onClick={() => handleDateClick(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {isSidebarOpen && !isEventDetail && (
          <div className="sidebar">
            <button className="close-btn" onClick={handleCloseSidebar}>X</button>
            <h2>Add New Event</h2>
            <form onSubmit={handleEvent}>
              <div className="form-group">
                <label>Event Name</label>
                <input type="text" name='name' placeholder="Add event name" />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={selectedDate ? selectedDate : ''}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input type="time" name='time' />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input type="text" name='duration' placeholder="Duration (hours)" />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input type="text" name='department' placeholder="Department" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" name='location' placeholder="Choose location" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name='category'>
                  <option value="technical">Technical</option>
                  <option value="non-technical">Non-Technical</option>
                  <option value="workshop">Workshop</option>
                </select>
              </div>
              <div className="form-buttons">
                <button type="submit" className="create-btn">Create Event</button>
                <button type="button" className="cancel-btn" onClick={handleCloseSidebar}>Cancel</button>
              </div>
            </form>
          </div>
        )}
        {isSidebarOpen && isEventDetail && (
          <div className="sidebar">
            <button className="close-btn" onClick={handleCloseSidebar}>X</button>
            <h2>Event Details</h2>
            <form onSubmit={handleEventDetail}>
              <div className="form-group">
                <label>Get Email Reminder</label>
                <select name='reminder' defaultValue="60">
                  <option value="60">1 hour before event</option>
                  <option value="1440">1 day before event</option>
                  <option value="10080">1 week before event</option>
                </select>

              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Add description" name='description'></textarea>
              </div>
              <div className="form-group">
                <label>Image for Display</label>
                <input
                  type="file"
                  id="profile-image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="form-group">
                <label>Team Size</label>
                <input
                  type="number"
                  name="teamSize"
                  placeholder="Enter team size"
                />
              </div>
              <div className="form-group">
                <div className='rule'>
                  <div className="rule-input-section">
                    <label>Rules</label>
                    <input
                      type="text"
                      value={currentRule}
                      onChange={(e) => setCurrentRule(e.target.value)}
                      placeholder="Add a rule"
                      className='rule-in'
                    />
                    <button type="button" onClick={handleAddRule} className='rule-btn'>Add Rule</button>
                  </div>
                  <div className='rule-list-section'>
                    <ul className="rules-list">
                      {rules.map((rule, index) => (
                        <li key={index}>
                          {rule}
                          <button type="button" onClick={() => handleDeleteRule(index)}>Remove</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="form-buttons">
                <button type="submit" className="create-btn">Create Event</button>
                <button type="button" className="cancel-btn" onClick={handleCloseSidebar}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default EventScheduler;
