const usercreater = require("../models/user");

const updateuser = async (req, res) => {
  try {
    const email = req.query.email;
    const data = await usercreater.findOneAndUpdate(
      { email: email },
      req.body,
      {
        new: true,
      }
    );
    res.json({
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      highesteducation: data.highesteducation,
      currentstatus: data.currentstatus,
      interests: data.interests,
      aboutme: data.aboutme,
      phno: data.phno,
      linkedinlink: data.linkedinlink,
      githublink: data.githublink,
      facebooklink: data.facebook,
      twitterlink: data.twitterlink,
      instagramlink: data.instagramlink,
      websitelink: data.websitelink,
      followercount: data.followers.length,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json("Unable to update");
  }
};

const followers = async (req, res) => {
  try {
    const followerids = await usercreater.find({ email: req.query.email });
    // console.log(followersids)
    const followerdata = await usercreater.find({
      _id: { $in: [...followerids[0].followers] },
    });
    const followerdatares = followerdata.map((data) => ({
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      highesteducation: data.highesteducation,
      followercount: data.followers.length,
    }));
    res.json(followerdatares);
  } catch (err) {
    console.log(err);
    res.status(400).send("error");
  }
};

module.exports = { followers, updateuser };
