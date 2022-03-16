const router = require("express").Router();


router.get("/test", (req, res, next) => {
  res.json("All good in here");
  console.log('---------------------------------------------');
});


router.get("/test", (req, res, next) => {
  console.log("All goooooood in here");
  res.json("All goodeln in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
