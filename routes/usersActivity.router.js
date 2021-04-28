const express = require("express");
const router = express.Router();
const { UsersActivity } = require("../models/usersActivity.model");
const _ = require("lodash");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const data = await UsersActivity.find({});
      res.json({ success: true, data });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "Unable to load user activity",
          errorMessage: err.message,
        });
    }
  })

  .post(async (req, res) => {
    try {
      const UserActivity = req.body;
      const NewUserActivity = new UsersActivity(UserActivity);
      const savedUserActivity = await NewUserActivity.save();
      res.json({ success: true, UserActivity: savedUserActivity });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "unable to user activity",
          errorMessage: err.message,
        });
    }
  });

router.route("/user/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UsersActivity.findOne({ uid: id })
      .populate("history")
      .populate("like")
      .populate("playlist");
    res.json({ success: true, data });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Unable to populate user activity",
        errorMessage: err.message,
      });
  }
});
router.route("/user/:id/history/:vid").get(async (req, res) => {
  try {
    const { id, vid } = req.params;
    const data = await UsersActivity.findOne({ uid: id });
    console.log(data);
    const videoData = _.some(data.history, (video) => video.toString() === vid);
    if (videoData) {
      return res.json({ success: true });
    }
    res.json({ success: false });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Unable to find video",
        errorMessage: err.message,
      });
  }
});
router.route("/user/update/:id").post(async (req, res) => {
  try {
    const filter = req.params.id;
    const update = req.body;
    const data = await UsersActivity.findOne({ uid: filter });
    const videoData =_.extend(data, {
      history: _.union(data.history, [update.history]),
    });
  
    await videoData.save();
    res.json({ success: true, videoData });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "unable to add user activity",
        errorMessage: err.message,
      });
  }
});

module.exports = router;
