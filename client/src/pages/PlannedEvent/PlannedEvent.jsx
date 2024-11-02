import React, { useEffect, useState } from "react";
import { SelectedUser } from "../../context/UserContext";
import axios from 'axios';
import './PlannedEvent.css';

function PlannedEvent() {
    const [events, setEvents] = useState([]);
    const [isEventEdit, setIsEventEdit] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { user } = SelectedUser();

    useEffect(() => {
        const fetchPlannedEvent = async () => {
            try {
                const response = await axios.get("http://localhost:5100/api/event/getPlannedEvent", {
                    params: {
                        adminemail: user.email
                    }
                });
                setEvents(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        if (user?.email) {
            fetchPlannedEvent();
        }
    }, [user?.email]);

    const toggleModal = () => {
        setIsEventEdit(!isEventEdit);
    };

    const handleEditClick = (data) => {
        setSelectedEvent(data);
        toggleModal();
    };

    const handleDelete = async (data) => {
        try {
            const response = await axios.delete("http://localhost:5100/api/event/deleteEvent", {
                params: {
                    data: data._id
                }
            });
            if (response.data.message === "Deleted Successfully") {
                alert("Deleted Successfully");
                setEvents(events.filter(event => event._id !== data._id));
            } else if (response.data.message === "Event Not found") {
                alert("Event Not found");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleEventEditSave = async (e) => {
        e.preventDefault();

        const formatTime = (time) => {
            const [hours, minutes] = time.split(':');
            const formattedHours = (hours % 12) || 12;
            const period = hours >= 12 ? 'PM' : 'AM';
            return `${formattedHours}:${minutes} ${period}`;
        };
        const formattedTime=formatTime(selectedEvent.time)
        const data = {
            _id:selectedEvent._id,
            name: selectedEvent.name,
            category: selectedEvent.category,
            description: selectedEvent.description,
            location: selectedEvent.location,
            date: selectedEvent.date,
            time: formattedTime,
            teamsize: selectedEvent.teamsize,
            reminder: selectedEvent.reminder,
            rules: selectedEvent.rules,
            admincontact: selectedEvent.admincontact,
            adminemail: selectedEvent.adminemail,
        };
        try {
            const response = await axios.patch("http://localhost:5100/api/event/editEvent", { data: data });

            setEvents(response.data.events);
            toggleModal();
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {events.length > 0 ? (
                <div className="events-container">
                    {events.map((data, index) => (
                        <div className="event-card" key={index}>
                            <img src={data.image} alt={data.name} className="event-image" />
                            <h2 className="event-name">{data.name}</h2>
                            <p className="event-category"><strong>Category:</strong> {data.category}</p>
                            <p className="event-description"><strong>Description:</strong> {data.description}</p>
                            <p className="event-location"><strong>Location:</strong> {data.location}</p>
                            <p className="event-department"><strong>Department:</strong> {data.department}</p>
                            <p className="event-date"><strong>Date:</strong> {new Date(data.date).toLocaleDateString()}</p>
                            <p className="event-time"><strong>Time:</strong> {data.time}</p>
                            <p className="event-team-size"><strong>Team Size:</strong> {data.teamsize}</p>
                            <p className="event-reminder"><strong>Reminder:</strong> {data.reminder}</p>
                            <p className="event-rules"><strong>Rules:</strong> {data.rules.join(', ')}</p>
                            <p className="event-admin-contact"><strong>Admin Contact:</strong> {data.admincontact}</p>
                            <p className="event-admin-email"><strong>Admin Email:</strong> {data.adminemail}</p>
                            <div className="event-container-btn">
                                <button className="event-btn-edit" onClick={() => handleEditClick(data)}>Edit</button>
                                <button className="event-btn-delete" onClick={() => handleDelete(data)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-events-message">No planned events available</p>
            )}

            {isEventEdit && selectedEvent && (
                <div className="eventedit-modal">
                    <div className="eventedit-modal-content">
                        <h2>Edit Event</h2>
                        <form onSubmit={handleEventEditSave} className="eventedit-modal-form">
                            <label>Name:</label>
                            <input
                                type="text"
                                value={selectedEvent.name}
                                name="name"
                                onChange={(e) => setSelectedEvent({ ...selectedEvent, name: e.target.value })}
                            />

                            <label>Category</label>
                            <select name='category'
                                onChange={(e) => setSelectedEvent({ ...selectedEvent, category: e.target.value })}
                            >
                                <option value="technical">Technical</option>
                                <option value="non-technical">Non-Technical</option>
                                <option value="workshop">Workshop</option>
                            </select>

                            <label>Description:</label>
                            <textarea
                                value={selectedEvent.description}
                                name="description"
                                onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                            />

                            <label>Location:</label>
                            <input
                                type="text"
                                name="location"
                                value={selectedEvent.location}
                                onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
                            />

                            <label>Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={new Date(selectedEvent.date).toISOString().substr(0, 10)}
                                onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })}
                            />

                            <label>Time:</label>
                            <input
                                type="time"
                                name="time"
                                value={selectedEvent.time}
                                onChange={(e) => setSelectedEvent({ ...selectedEvent, time: e.target.value })}
                            />

                            <label>Team Size:</label>
                            <input
                                type="number"
                                name="teamsize"
                                value={selectedEvent.teamsize}
                                onChange={(e) => setSelectedEvent({ ...selectedEvent, teamsize: e.target.value })}
                            />

                            <label>Reminder:</label>
                            <input
                                type="text"
                                name="reminder"
                                value={selectedEvent.reminder}
                                onChange={(e) => setSelectedEvent({ ...selectedEvent, reminder: e.target.value })}
                            />

                            <label>Rules:</label>
                            <textarea
                                name="rules"
                                value={selectedEvent.rules.join(", ")}
                                onChange={(e) => setSelectedEvent({
                                    ...selectedEvent,
                                    rules: e.target.value.split(",").map(rule => rule.trim())
                                })}
                            />

                            <label>Admin Contact:</label>
                            <input
                                type="text"
                                name="admincontact"
                                value={selectedEvent.admincontact}
                                onChange={(e) => setSelectedEvent({ ...selectedEvent, admincontact: e.target.value })}
                            />

                            <label>Admin Email:</label>
                            <input
                                type="email"
                                name="adminemail"
                                value={selectedEvent.adminemail}
                                onChange={(e) => setSelectedEvent({ ...selectedEvent, adminemail: e.target.value })}
                            />
                            <div>
                                <button type="submit" className="eventedit-modal-save-btn" >Save</button>
                                <button type="button" className="eventedit-modal-close-btn" onClick={toggleModal}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </>
    );
}

export default PlannedEvent;
