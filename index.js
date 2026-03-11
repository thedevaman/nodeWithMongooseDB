import mongoose from 'mongoose'
async function dbConnection(){
    await mongoose.connect('mongodb://localhost:27017/college')
    const schema = mongoose.Schema({
        name:String,
        age:Number,
        email:String
    })

    const studentsModel = mongoose.model('students',schema);
    const result = await studentsModel.find();
    console.log(result)
}

dbConnection()