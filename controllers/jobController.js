import jobModel from "../models/jobModel.js"

//create a job
export const createJobController = async (req, res, next) => {
    try {
        const { company, position, jobType } = req.body
        if (!company || !position) {
            next('please provide company name')
        }
        //const teacherJobTypes=["Teaching", "Teacher","tutor"]
        if (jobType == "Teaching") {
            next("Teacching job is not allowed")
        }

        const newjob = {
            company,
            position,
            jobType
        }


        const job = await jobModel.create(newjob)
        res.status(200).json({
            success: true,
            message: "job added successfully"
        })
    }
    catch (err) {

    }
}


//get job
export const getJobController = async (req, res, next) => {

    try {
        const jobs = await jobModel.find();
        res.status(200).json({
            success: true,
            jobs,
            totalJobs: jobs.length
        })
    }
    catch (err) {

    }
}




///update
export const updateJobController = async (req, res, next) => {
    try {
        const {id}=req.params
        const {workLocation, position} =req.body
        
        console.log(workLocation,position)
        if(!workLocation || !position){
            next("please provide all fields")
        }


        const job = await jobModel.findOne({_id:id})

        if(!job){
            next(`no job found with this id ${id} `)
        }

        const updateJob= await jobModel.findOneAndUpdate({_id:id}, {
            workLocation:workLocation,
            position:position //or req.body
        } )
        res.status(200).json({
            updateJob
        })

    } catch (err) {
        next("error in updatecontroller")

    }
}


//delete
export const deleteJobController = async (req, res, next) => {
    try {
        const {id}=req.params
        

        const job= await jobModel.findOne({_id:id})

        if(!job){
            next("no job found")
        }


        await job.deleteOne({_id:id});
        res.status(200).json({
            message:"Success, Job deleted.. "
            
        })

    } catch (err) {
        next("error in deleteecontroller")

    }
}