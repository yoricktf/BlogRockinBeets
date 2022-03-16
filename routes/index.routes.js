const router = require("express").Router();


router.get("/test", (req, res, next) => {
  res.json("All good in here");
  console.log('---------------------------------------------');
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
