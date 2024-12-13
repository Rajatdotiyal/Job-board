const express = require("express");
const { authMiddleware } = require("../middleware");
const { application, Job } = require("../db");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/application",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(400).json({ msg: "User ID is missing" });
      }
      const jobId = req.query.jobId;
      if (!jobId) {
        return res.status(400).json({ msg: "Job ID is missing" });
      }

      const body = req.body;
      if (!body) {
        return res.status(400).json({ msg: "body is missing" });
      }

      let resumeData = null;
      if (req.file) {
        resumeData = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
          fileName: req.file.originalname,
        };
      }
      const app = new application({
        userId,
        jobId,
        resumeUrl: resumeData,
        status: req.body.status || "applied",
      });
      const savedApplication = await app.save();
      return res.json(savedApplication);
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  }
);

router.get("/job/:id/applicants", authMiddleware, async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    const applicants = await application.find({ jobId }).populate('userId');
    if (applicants.length === 0) {
      return res.status(404).json({ msg: "No applicants for this job" });
    }

    return res.json({ applicants });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error: " + err.message });
  }
});



router.get("/applications", authMiddleware, async (req, res) => {
  try {
    const applications = await application
      .find()
      .populate("jobId")
      .populate("userId");


    return res.json(applications);
  } catch (err) {
    return res.status(400).json({ msg: "application not found" });
  }
});

router.get("/applications/:id", authMiddleware, async (req, res) => {
  try {
    const appView = await application
      .findById(req.query.id)
      .populate("jobId")
      .populate("userId");
    if (!appView) {
      return res.status(404).json({ error: "Application not found" });
    }
    return res.json(appView);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch application details",
      details: error.message,
    });
  }
});

module.exports = router;
