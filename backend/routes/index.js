const express = require("express");
const router = express.Router();

const Users = require("../Models/Users");

router.get("/", function (req, res, next) {

    Users.Users.query().then((data) => {
        res.status(200).json({
            success: true,
            product: data
        })
    }).catch((err) => {
        res.status(404).json({
            success: false,
            err: err
        })
    });

});

router.post("/signup", function (req, res, next) {

    Users.Users.query().insert({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then((user) => {
        res.status(200).json({
            success: true,
            data: user
        });
    }).catch(err => {
        res.status(404).json({
            success: false,
            err: err
        });
    });

});

router.post("/login", function (req, res, next) {

    console.log(req.body.email);

    Users.Users.query().where({
        email: req.body.email
    }).where({
        password: req.body.password
    }).then(user => {

        if (user.length > 0) {
            res.status(200).json({
                success: true,
                user: user[0]
            });
        } else {
            res.status(200).json({
                success: false,
                message: "Invalid email or password"
            });
        }
    }).catch(err => {
        res.status(404).json({
            success: false,
            err: err
        });
    });

});

module.exports = router;