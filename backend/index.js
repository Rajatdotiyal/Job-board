const express = require("express");
const userRouter = require("./Routes/userRouter");
const jobRouter = require("./Routes/jobRouter")
const appRouter = require("./Routes/appRouter")
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/app", appRouter)

app.use((err, req, res, next) => {
  if (res.headersSent) {
      return next(err); // Delegate to the default error handler
  }
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000)