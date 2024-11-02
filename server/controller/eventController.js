const Event = require('../models/event');
const mongoose = require('mongoose');

const addEvent = async (req, res) => {

    const { name, date, time, duration, department, location, category } = req.body;

    try {
        const exists = await Event.findOne({ name: name, date: date, location: location, department: department, category: category });
        if (exists) {
            res.status(200).json({ message: 'Event Already Exists' });
            return;
        }
        await Event.insertMany({ name: name, date: date, time: time, duration: duration, department: department, location: location, category: category });
        res.status(200).json({ message: 'Added successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const addEventDetail = async (req, res) => {
    const { name, category, date, department, location, reminder, description, rules, image, teamsize, adminname, admincontact, adminemail, adminprofile } = req.body;

    try {
        const exists = await Event.findOne({ name: name, date: date, location: location, category: category });

        if (exists) {
            await Event.updateOne({ name: name, date: date, location: location, category: category }, { $set: { reminder: reminder, description: description, rules: rules, image: image, department: department, teamsize: teamsize, adminname: adminname, admincontact: admincontact, adminemail: adminemail, adminprofile: adminprofile } });
            res.status(200).json({ message: 'Updated successfully' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const getPlannedEvent = async (req, res) => {

    const { adminemail } = req.query;

    try {
        const exists = await Event.find({ adminemail: adminemail }).sort({ date: 1 });

        if (exists) {
            res.status(200).json({ message: 'Retrived Successfully', data: exists });
            return;
        }
        res.status(200).json({ message: 'No Event Planned' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const editEvent = async (req, res) => {
    const { data } = req.body;

    try {
        const eventId = data._id;
        const objectId = new mongoose.Types.ObjectId(eventId);

        const exist = await Event.findOne({ _id: objectId });
        if (!exist) {
            res.status(200).json({ message: 'Event Not found' });
            return;
        }

        await Event.updateOne(
            { _id: objectId },
            { $set: data }
        );

        const events = await Event.find();


        res.status(200).json({ message: 'Event Updated', events });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};


const deleteEvent = async (req, res) => {
    const { data } = req.query;

    try {
        const eventId = new mongoose.Types.ObjectId(data);
        const exist = await Event.findOne({ _id: eventId });
        if (!exist) {
            res.status(200).json({ message: 'Event Not found' });
            return;
        }
        await Event.deleteOne({ _id: data });
        res.status(200).json({ message: 'Deleted Successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}



module.exports = { addEvent, addEventDetail, getPlannedEvent, editEvent, deleteEvent };