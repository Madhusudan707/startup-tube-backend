const express = require("express");
const router = express.Router();
const { UsersActivity } = require("../models/usersActivity.model");
const _ = require("lodash");

/* 1. Normal Get and Post */
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


/* 2. Populating Data for specific user*/

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

/* 3.Checking with user id if history is already present or not */
router.route("/user/:id/history/:vid").get(async (req, res) => {
  try {
    const { id, vid } = req.params;
    const data = await UsersActivity.findOne({ uid: id });
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
        message: "Unable to find history video",
        errorMessage: err.message,
      });
  }
});

/* 4.Adding or Updating the history */
router.route("/user/history/update/:id").post(async (req, res) => {
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
        message: "unable to add user activity history",
        errorMessage: err.message,
      });
  }
});

/*5 Checking with user id if like is already present or not  */

router.route("/user/:id/like/:vid").get(async (req, res) => {
    try {
      const { id, vid } = req.params;
      const data = await UsersActivity.findOne({ uid: id });
      const videoData = _.some(data.like, (video) => video.toString() === vid);
      if (videoData) {
        return res.json({ success: true });
      }
      res.json({ success: false });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "Unable to find like video",
          errorMessage: err.message,
        });
    }
  });


  /* 6.Adding or Updating the like  */
router.route("/user/like/update/:id").post(async (req, res) => {
    try {
      const filter = req.params.id;
      const update = req.body;
      const data = await UsersActivity.findOne({ uid: filter });
      const videoData =_.extend(data, {
        like: _.union(data.like, [update.like]),
      });
    
      await videoData.save();
      res.json({ success: true, videoData });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "unable to add user activity like",
          errorMessage: err.message,
        });
    }
  });

  /* 7 Remove like */

  router.route("/user/like/remove/:id").post(async (req, res) => {
    try {
      const filter = req.params.id;
      const update = req.body;
      const data = await UsersActivity.findOne({ uid: filter });
    //    const videoData = _.some(data.like, (video) => video.toString() === vid);
      const videoData =_.extend(data, 
        {
        like: _.remove(data.like, [update.like]),
      });
    
    
      await videoData.save();
      res.json({ success: true, videoData });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "unable to add user activity like",
          errorMessage: err.message,
        });
    }
  });


 /* Todo: Add router for playlist */
module.exports = router;
