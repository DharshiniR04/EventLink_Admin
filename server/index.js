const express = require('express');
const dotenv = require('dotenv');
const cors=require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes');
const eventRoutes=require('./routes/eventRoute');

dotenv.config();

connectDB();

const app = express();
app.use(cors({
    origin: "https://event-link-admin-client.vercel.app", 
    methods: ["POST", "GET","PATCH","DELETE"],
    credentials: true
  }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://event-link-admin-client.vercel.app"); 
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));


app.get("/",async(req,res)=>{
     res.json("WELCOME TO EVENTLINK ADMIN");
})

app.use('/api/auth', authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/event',eventRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Admin server running on port ${PORT}`));
