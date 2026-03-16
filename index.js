// import mongoose from 'mongoose'
// async function dbConnection(){
//     await mongoose.connect('mongodb://localhost:27017/college')
//     const schema = mongoose.Schema({
//         name:String,
//         age:Number,
//         email:String
//     })

//     const studentsModel = mongoose.model('students',schema);
//     const result = await studentsModel.find();
//     console.log(result)
// }

// dbConnection()


import mongoose from "mongoose";
import express, { application } from 'express'
import studentModel from "./model/studentModel.js";

const app = express()

app.use(express.json())

 await mongoose.connect('mongodb://localhost:27017/college').then(()=>{
    console.log("connected")
 })

app.get("/",async(req,res)=>{

    const studentData = await studentModel.find()

    res.send({
      studentData
    })

})


app.post("/save",async (req,res)=>{
  
  const {name,age,email} = req.body


  if(!req.body || !name || !age || !email)
  {
    res.send({
    "message":"data not stored",
    "success":false,
    "storedInfo" :null
   })
   return
  }

  const studentData = await studentModel.create(req.body)

   res.send({
    "message":"data stored",
    "success":true,
    "storedInfo" :studentData
   })
})

app.put('/update/:id',async(req,res)=>{

  console.log(req.body)
  console.log(req.params.id)
  const id = req.params.id

  const studentData = await studentModel.findByIdAndUpdate(id,{
    ...req.body
  })

  res.send({
    message:"data updated",
    success:true,
    dataInfo:req.body
  })
})

app.delete('/delete/:id',async(req,res)=>{

  const id = req.params.id

  const studentData = await studentModel.findByIdAndDelete(id)

  res.send({
    message:"data Deleted",
    success:true,
    dataInfo:studentData
  })
})

app.listen(3200)