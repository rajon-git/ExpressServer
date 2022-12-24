const express=require('express');
const app=express();
const helmet=require('helmet');
const mongoose=require('mongoose');
const morgan=require('morgan');
const cors=require('cors');
require("dotenv").config();
const {readdirSync}=require("fs");

//middleware (application middleware eigulo ura application jure thakbe)

app.use(helmet());
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan("dev"));

//db connection
mongoose.connect(process.env.DATABASE)
         .then(()=> console.log("DB Connected"))
         .catch((error)=> console.log("DB Error ==>",error));
//routesmiddleware
readdirSync("./routes").map( r => app.use("/api/v1",require('./routes/${r}')));
//server
const port=process.env.PORT || 8000;
app.listen(port,() =>{
  console.log('App is running on port ', port);

});
