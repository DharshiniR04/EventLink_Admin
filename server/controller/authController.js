const Admin= require('../models/admin')
const bcrypt=require('bcrypt');
const {sendPasswordRecoveryEmail} =require('../services/emailService');

const login=async(req,res)=>{
    const { email, password } = req.body;
   
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.json({ message: 'User does not exist' });
        }
    
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const passwordRecovery=async(req,res)=>{
    const {email}=req.query;
    try{
        await sendPasswordRecoveryEmail(email);
        res.status(200).json({message:"Recovery mail sent"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({meassage:'Server Error'});
    }
}



module.exports={login,passwordRecovery};