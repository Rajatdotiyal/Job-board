const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL)
const userSchema = new mongoose.Schema({
    firstname : {type : String, require : true},
    lastname : {type : String, require : true},
    email : {type:String, require : true},
    password : {type:String, require : true},
    role : {type :String, enum : ["jobseeker", "employer"], require : true},
    jobSeekerProfile: {
        skills: [String],
        experience: { type: Number },  
        resumeUrl:  {
            data: Buffer, // Binary data of the file
            contentType: String, // MIME type (e.g., application/pdf)
            fileName: String, // File name
          },  
    },
    employerProfile: {
        companyName: { type: String },
        companySize: { type: String, enum: ['small', 'medium', 'large'] },
        industry: { type: String },
        website: { type: String }
    },
    createdAt: { type: Date, default: Date.now },
}) 


const jobSchema = new mongoose.Schema({
    title : {type  :String, require : true},
    description : {type  :String, require : true},
    company : {type  :String, require : true},
    location : {type : String},
    salary : {
        minimum : {type : Number},
        maximum : {type : Number},
    },
    jobtype : {type : String, enum : ["full-time","part-time","contract"]},
    skills : [String],
    createdAt: { type: Date, default: Date.now },
    postedBy : {type : mongoose.Schema.Types.ObjectId , ref : "User"}
});

const applicationSchema = new mongoose.Schema({
    jobId : {type : mongoose.Schema.Types.ObjectId , ref : "Job"},
    userId : {type : mongoose.Schema.Types.ObjectId, ref : "User"},
    resumeUrl:  {
        data: Buffer, // Binary data of the file
        contentType: String, // MIME type (e.g., application/pdf)
        fileName: String, // File name
      },
    status: {
        type: String,
        enum: ['applied', 'accepted', 'rejected'],
      },
      appliedAt: { type: Date, default: Date.now }
})

const User = mongoose.model("User", userSchema);
const Job = mongoose.model("JOb", jobSchema);
const application = mongoose.model("Application", applicationSchema);

module.exports = {User, Job, application};