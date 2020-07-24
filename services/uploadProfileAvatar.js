const express = require('express');
const uploadProfileAvatar = express.Router();
const { User } = require('../models/User');

const authAPIMiddlware = require('../middlwares/authAPIMiddlware');
const uploadProfileAvatarMiddlware = require('../middlwares/uploadProfileAvatarMiddlware');

const fs = require('fs');
const path = require('path');

uploadProfileAvatar.post('/', authAPIMiddlware, 
  uploadProfileAvatarMiddlware.single('avatar'), 
  async(req, res) => {
  if (res.locals.isLoggedIn) {
    const userId = res.locals.userId;
      try {
        const user = await User.findOne({_id: userId});
        if (user) {
          if (user.avatar !== 'uploads/avatars/default/default-avatar.png'){
            //const fileToDelete = user.avatar.split("/")[2];
            fs.unlink(path.join(__dirname, '../', user.avatar), (err) => {
              if (err) console.log(err);
            });
          }
          await User.updateOne({_id: userId}, {$set: {avatar: req.file.path}});
          const backUser = await User.findOne({_id: userId});
          res.status(201).json({user: backUser});
        }
      } catch (err) {
        console.log(err);
          res.status(401).json({message: "upload avatar service is not good !"});
      }
  }
});

module.exports = uploadProfileAvatar;