const Admin = require('../models/admin');

const updateUserDetail = async (req, res) => {
    const { name, profile, username } = req.body;
    const admin = Admin.findOne(username);
    if (admin) {
        await Admin.updateOne({ username: username }, { $set: { profile: profile, name: name } });
        const updatedAdmin = await Admin.findOne({ username });
        return res.status(200).json({ message: "Updated successfully", data: updatedAdmin });
    }
}

const deleteUser=async(req,res)=>{
    const {username}=req.body;
    await Admin.deleteOne({username:username});
    res.status(200).json({message: "Deleted successfully"})
}

const fetchuser=async(req,res)=>{
    const {email}=req.body;
    try{
        const response=await Admin.findOne({email:email});
        res.json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const userdetail=async(req,res)=>{
    const {email,profile,department,college,mobile}=req.body;
    try{
        await Admin.updateOne( { email: email }, { $set: { profile:profile,department:department,college:college,mobile:mobile } } );
        res.json("Updated Successfully") 
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}




module.exports = { updateUserDetail ,deleteUser,fetchuser,userdetail};