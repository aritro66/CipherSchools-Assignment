const usercreater = require("../models/user");

const updateuser = async (req, res) => {
  try {
    const email = req.query.email;
    const data = await creater.findOneAndUpdate({ email: email }, req.body, {
      new: true,
    });
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
    });
  } catch (error) {
    console.log(error);
    res.status(400).json("Unable to update");
  }
};
