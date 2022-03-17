const router = require("express").Router();
const User = require('../models/User.model')


// router.get("/test", (req, res, next) => {
//   res.json("All good in here");
//   console.log('---------------------------------------------');
// });

router.post('/getUser', (req, res, next) => {
  User.findById(req.body._id)
    .then(user => {
      res.status(200).json(user)
    })
})

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
