module.exports = function (sequelize) {
  registerRouter = require("express").Router();
  var validate = require("../validate");
  var uuid = require("uuid");
  const usersData = require("../databasemodel/users")(sequelize);
  var moment = require("moment");

  //register call
  registerRouter.post("/", function (req, res) {
    try {
      if (
        validate(req.body.username) &&
        validate(req.body.fistname) &&
        validate(req.body.lastname) &&
        validate(req.body.email) &&
        validate(req.body.contact) &&
        validate(req.body.password)
      ) {
        res.send({
          message: "Server error authenticating user, try again !!",
        });
      } else {
        usersData
          .count({
            where: {
              email: req.body.email,
            },
          })
          .then((result) => {
            let count = result;
            if (count === 0) {
              insertUserIntoDatabase(req, res);
            } else {
              res.send({
                message: "User is already registered !!",
              });
            }
          })
          .catch((error) => {
            console.error(error);
            res.send({
              message: "Server Error while registering ,try again!!",
            });
          });
      }
    } catch (error) {
      res.send({
        message: "Server Error while registering ,try again!!",
      });
    }
  });

  function insertUserIntoDatabase(req, res) {
    var username = req.body.username;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var contact = req.body.contact;
    var password = req.body.password;
    let uuidv4 = uuid.v4();
    let date = new Date();
    let d = moment(date).format("YYYY-MM-DD HH:mm:ss");
    console.log(uuidv4);

    usersData
      .create({
        userid: uuidv4,
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        contact: contact,
        password: password,
        created_at: d,
        updated_at: d,
        isactive: 0,
        usertypeid: 1,
      })
      .then(function (result) {
        let mesg;
        if (result.id !== null) mesg = "Successfully saved user added";
        else mesg = "Server encountered error while inserting annotations";
        res.send({
          message: mesg,
        });
      })
      .catch((error) => {
        console.log(error);
        res.send({
          message: "Server encountered error while inserting annotations",
        });
      });
  }
  return registerRouter;
};
