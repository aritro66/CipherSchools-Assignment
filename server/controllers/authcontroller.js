const bcrypt = require("bcryptjs"); // encrypting password
const jwt = require("jsonwebtoken"); // json web token
const usercreater = require("../models/user");

let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWTKEY,
    {
      expiresIn: "10h",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWTREFRESHKEY
  );
};

const login = async (req, res) => {
  console.log(req.body);
  try {
    const data2 = await usercreater.find({
      email: req.body.email,
    }); // finding user by email
    console.log(data2);
    if (data2) {
      const pass = req.body.password;
      const result = await bcrypt.compareSync(
        pass.toString(),
        data2[0].password
      ); // checks if password is correct
      if (result) {
        const accessToken = generateAccessToken(data2[0]); // creating token
        const refreshToken = generateRefreshToken(data2[0]);
        refreshTokens.push(refreshToken);
        res.json({
          fname: data2[0].fname,
          lname: data2[0].lname,
          email: data2[0].email,
          highesteducation: data2[0].highesteducation,
          currentstatus: data2[0].currentstatus,
          interests: data2[0].interests,
          aboutme: data2[0].aboutme,
          phno: data2[0].phno,
          linkedinlink: data2[0].linkedinlink,
          githublink: data2[0].githublink,
          facebooklink: data2[0].facebook,
          twitterlink: data2[0].twitterlink,
          instagramlink: data2[0].instagramlink,
          websitelink: data2[0].websitelink,
          accessToken,
          refreshToken,
        });
      } else {
        res.status(401).json("Wrong password or Wrong user");
      }
    } else {
      res.status(401).json("Wrong password or Wrong user");
    }
  } catch (err) {
    console.log(err);
    res.status(401).json("Wrong password or Wrong user");
  }
};

const signup = async (req, res) => {
  console.log(req.body);

  try {
    const salt = bcrypt.genSaltSync(10); // generating salt
    // salt is a string of charcters different from password
    const password = req.body.password;
    const pass = await bcrypt.hashSync(password.toString(), salt);
    // password is hashed using hashing algorithim and applying salt
    const data = await usercreater.insertMany([
      {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: pass,
      },
    ]);
    console.log(data);
    const accessToken = generateAccessToken(data[0]); // creating token
    const refreshToken = generateRefreshToken(data[0]);
    refreshTokens.push(refreshToken);
    res.status(201).json({
      fname: data[0].fname,
      lname: data[0].lname,
      email: data[0].email,
      highesteducation: data[0].highesteducation,
      currentstatus: data[0].currentstatus,
      interests: data[0].interests,
      aboutme: data[0].aboutme,
      phno: data[0].phno,
      linkedinlink: data[0].linkedinlink,
      githublink: data[0].githublink,
      facebooklink: data[0].facebook,
      twitterlink: data[0].twitterlink,
      instagramlink: data[0].instagramlink,
      websitelink: data[0].websitelink,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json("Unable to sign up");
  }
};

const logout = (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
};

const refresh = (req, res) => {
  //take the refresh token from the user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, process.env.JWTREFRESHKEY, (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
  //if everything is ok, create new access token, refresh token and send to user
};

const changepassword = async (req, res) => {
  console.log(req.body);
  if (req.body.newpassword1 == req.body.newpassword2) {
    // checks if both password equal
    try {
      const data2 = await usercreater.find({
        email: req.body.email,
      }); // finding user by email
      console.log(data2);
      if (data2) {
        const oldpass = req.body.oldpassword;
        const result = await bcrypt.compareSync(
          oldpass.toString(),
          data2[0].password
        );
        if (result) {
          const salt = bcrypt.genSaltSync(10); // generating salt
          // salt is a string of charcters different from password
          const password = req.body.newpassword1;
          const pass = await bcrypt.hashSync(password.toString(), salt);
          // password is hashed using hashing algorithim and applying salt
          const data = await usercreater.findOneAndUpdate(
            { email: req.body.email },
            { $set: { password: pass } },
            { new: true }
          );
          console.log(data);
          res.json("password changed");
        } else {
          res.status(401).json("Unable to change password");
        }
      } else {
        res.status(401).json("Unable to change password");
      }
    } catch (err) {
      console.log(err);
      res.status(400).json("Unable to change password");
    }
  } else {
    res.status(400).json("Passwords are not same");
  }
};

module.exports = {
  login,
  signup,
  logout,
  refresh,
  changepassword,
};
