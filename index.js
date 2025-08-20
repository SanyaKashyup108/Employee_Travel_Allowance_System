import express from 'express'
import connectDB from "./config/db.js"
import Route from './Routes/Route.js'
import UserRoute from './Routes/UserRoutes.js'


const app = express()
 
const PORT=process.env.PORT

connectDB();

//middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running....")
})


//routes
app.use("/api/request", Route);
app.use("/api/user",  UserRoute);


app.listen(PORT,()=>{
    console.log(`srver running on ${PORT}`);
})