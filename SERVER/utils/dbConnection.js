import mongoose from "mongoose";

const connectionString= process.env.MONGOOSE_CONNECTION_STRING 


const dbConnection= ()=>{
    mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Mongoose connection error:', err);
});

}



export default dbConnection