import express from "express";
import { createJobController, deleteJobController, getJobController, updateJobController } from "../controllers/jobController.js";

const route = express.Router()

// post is used to send the data from frontend to backend
route.post('/create-job', createJobController )

route.get('/get-job',getJobController)


//update
route.patch('/update-job/:id', updateJobController)

//delete
route.delete('/delete-job/:id',deleteJobController)
export default route