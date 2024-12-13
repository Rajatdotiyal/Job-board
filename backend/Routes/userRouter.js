const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const multer = require("multer")
const router = express.Router();

const signupSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
});

//------signup route -----

router.post("/signup", async (req,res)=>{
  const validUser = signupSchema.safeParse(req.body);
  if(!validUser.success){
     return res.status(400).json({
      message: "Incorrect inputs"
     })
  }

  const existingUser = await User.findOne({
      email : req.body.email,
  })

  if(existingUser){
      return res.status(411).json({
          message: "Email already taken / Incorrect inputs"
         })
  }

  const dbUser = await User.create({
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,
    password : req.body.password,
  });

  const userId  = dbUser._id;


  const token = jwt.sign({
      userId,
      role : dbUser.role
  },JWT_SECRET,{ expiresIn: '12h' });

  res.json({
      message: "User created successfully",
      token: token
  })

})

const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

//-----signin route ------

router.post("/signin", async (req, res) => {
  const validUser = signinSchema.safeParse(req.body);
  if (!validUser.success) {
    return res.status(400).json({
      msg: "Incorrect Inputs",
    });
  }

  const dbUser = await User.findOne({
    email: req.body.email,
  });
  if (dbUser) {
    const token = jwt.sign({ userId: dbUser._id, role: dbUser.role }, JWT_SECRET,{ expiresIn: '12h' });
    return res.json({ token });
  }

  return res.status(403).json({
    msg: "error while logingin",
  });
});


// ---- role route ----
router.post("/info/role", authMiddleware, async (req, res) => {
  const userId = req.userId
  if(!userId){
    return res.status(400).json({msg : "User ID is missing"})
  }
  const body = req.body;
  if(!body){
    return res.status(400).json({msg : "body is missing"})
  }
  const updateUser = await User.findByIdAndUpdate(
    userId,
    {
    $set:{
      "role": req.body.role},
    },
   { new: true},
  );

  if (!updateUser) {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  return res.json({
    msg : "role added succesfully",
    updateUser
  })
  
});


//-----jobseeker details route -----

const storage = multer.memoryStorage();
const upload = multer({storage:storage})

router.post("/info/jsdetails", authMiddleware,upload.single('resume'), async (req, res) => {
  try{const userId = req.userId;
  if(!userId){
    return res.status(400).json({msg : "User ID is missing"})
  }
  const body = req.body;
  
  if(!body){
    return res.status(400).json({msg : "body is missing"})
  }
  let resumeData = null;
  if(req.file){
    resumeData = {
      data : req.file.buffer,
      contentType : req.file.mimetype,
      fileName : req.file.originalname
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set :{
        "jobSeekerProfile.skills" : body.skills,
        "jobSeekerProfile.experience" : body.experience,
        "jobSeekerProfile.resumeUrl" :resumeData
      }
    },
    {new : true}
  )

  if (!updatedUser) {
    return res.status(404).json({ msg: "User not found" });
  }
  return res.json({
    msg: "Jobseeker details added successfully",
    user: updatedUser, // Optionally return the updated user data
  });
  }catch(error){
    console.error(error);
    return res.status(500).json({ msg: "An error occurred", error: error.message });
  }
});


//-----employer details route ------

router.post("/info/empdetails", authMiddleware, async (req, res) => {
    try {
      const userId = req.userId;
  
      // Ensure userId is provided
      if (!userId) {
        return res.status(400).json({ msg: "User ID is missing" });
      }
  
      const body = req.body;
      if ( !body.companyName || !body.industry || !body.website) {
        return res.status(400).json({ msg: "Employer profile data is incomplete" });
      }
  
      // Update the employer profile fields in the user document
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            'employerProfile.companyName': body.companyName,
            'employerProfile.companySize': body.companySize,
            'employerProfile.industry': body.industry,
            'employerProfile.website': body.website,
          }
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      return res.json({
        msg: "Employer details added successfully",
        user: updatedUser, // Optionally return the updated user data
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "An error occurred", error: error.message });
    }
  });
  

module.exports = router;
