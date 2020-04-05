
const User = require('../models/users');
const bcrypt = require('bcrypt');

function encryptPassword(req, res, next) {
  bcrypt.hash(req.body.email, 10, (err, hash) => {
    if (err) {
      return json(err)
    } else {
      const myUser = {
        email: req.body.email,
        password: hash
      }
      User.create(myUser).then(user => {
        res.status(201).json({
          message: "user created",
          user
        })
      })
        .catch(err => res.status(500).json(err))
    }
  })
}

function getUsers(req, res, next) {
  User.find({}).then(user => {
    res.json(user)
  })
}

function addUsers(req, res, next) {
  User.find({ email: req.body.email }).then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: "invalid",
        user
      })
    } else {
      encryptPassword(req, res)
    }
  })
}

function userLogin(req, res, next) {
  console.log("hellooooooo")
  User.findOne({ email: req.body.email }).then(user => {
    if (user.length < 1) {
      res.status(401).json({ message: "Auth failed" })
    }
  })
    .catch(err => {
      res.status(500).json({ message: "Incorrect ID character length" })
    })
}

function deleteUser(req, res, next) {
  User.findByIdAndRemove({ _id: req.params.userId }).then(deletedUser => {
    return (!deletedUser) ? res.status(500).json({ message: "Cant delete unexistent users" }) :
      res.status(200).json({ message: "deleted user", deletedUser })
  })

}



module.exports = {
  encryptPassword,
  getUsers,
  addUsers,
  userLogin,
  deleteUser
};