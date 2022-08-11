const express = require('express');
const app = express();
const cors = require('cors')
const connect  = require('./config/db');
const  userRouter = require('./routes/userRoutes');

require('dotenv').config();
const PORT = process.env.PORT || 5000;
connect();
app.use(express.json());
app.use(express.static('./public'));
app.use(cors());
app.use('/api/post/',userRouter);




app.listen(PORT, ()=>{
    console.log(`Project is connected at port ${PORT}`);
})

