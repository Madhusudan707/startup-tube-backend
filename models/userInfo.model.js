const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  uid: Number,
  history: [],
  like: [],
  playlist: [
    {
      pid: Number,
      name: String,
      videoId: [],
    },
  ],
});

const userInfos = mongoose.model("userInfos", userInfoSchema);
module.exports = { userInfos };
