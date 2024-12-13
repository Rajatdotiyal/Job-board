const express = require("express");
const { authMiddleware } = require("../middleware");
const { Job } = require("../db");
const router = express.Router();


router.post("/jobs",authMiddleware,async (req,res)=>{
    const userId = req.userId;
    if(!userId){
        return res.status(400).json({msg : "User ID is missing"})
    }
    const body = req.body;
    if(!body){
        return res.status(400).json({msg : "body is missing"})
    }
    try{
        const jobData = {...body, postedBy : userId}

        const job = new Job(jobData);
        const saveJob = await job.save();

        return res.json({
            msg : "job posted succesfully",
            saveJob
        })
    }catch(err){
        res.status(400).json({msg : "unable to add"})
    }
});

router.get("/jobs", authMiddleware,async (req,res)=>{
    try{
        const allJobs = await Job.find().populate('postedBy')
        if(!allJobs){
            return res.status(404).json({
                msg : "no jobs found"
            })
        }
        return res.json({allJobs})
    }catch(err){
        return res.status(500).json({msg : "erorr in jobs"})
    }
})

router.get('/jobs/:id', authMiddleware,async (req,res)=>{
    try{
        const job = await Job.findById(req.params.id).populate('postedBy');
        if(!job){
            return res.status(404).json({msg : "Job not found"})
        }   
        return res.json({job})
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params; // Employer's unique ID from the URL
        const jobs = await Job.find({ postedBy: userId }); // Assuming 'postedBy' links to the employer
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch jobs' });
    }
});

module.exports = router;