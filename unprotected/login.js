module.exports = function (sequelize, config, app, Sequelize,jwt, jwtOptions) {
    loginRouter = require('express').Router();
    var validate = require('../validate');
    const usersData = require("../databasemodel/users")(sequelize);
    let common = require('../commonLib');
  
    loginRouter.post('/', function (req, res) {
      try {
        if (validate(req.body.email) || validate(req.body.password)) {
          res.send({
            message: "Server error authenticating user, try again !!",
          });
          return;
        }

        usersData
          .findOne({
            where: { email: req.body.email, password: req.body.password },
            logging: false,
          })
          .then(function (result) {
            if (result === null) {
              ErrorHandler(
                "Incorrect email or password, or user is not authorised !!",
                "User doesnt exists in db as count did not match to 1 - /login.",
                res,
                undefined
              );
              return;
            }
            SendToken(req.body.email, jwt, jwtOptions, config, result, res);
          })
          .catch((error) =>
            ErrorHandler(
              "Server error authenticating user login, try again !!",
              "Error while authenticating user login and creating jwt - /login.",
              res,
              error
            )
          );
      } catch (error) {
        console.log(error);
      }
    })
  
    function ErrorHandler(userMessage, res) {
      res.send({ message: userMessage });
    }
  
    function Cleanup(res) {
      if (!res.headersSent) { res.send({ message: 'Server error authenticating user login, try again !!' }); }
    }
  
    function SendToken(email, jwt, jwtOptions, config, result, res) {
      var payload = common.createPayload(email);
      var token = common.createToken(jwt, payload, jwtOptions, config.accessTokenTimeOut, email);
      var response = createTokenResponse(token, config, email, result);
      res.json(response);
    }
  
    function createTokenResponse(token, config, email, result) {
    console.log(result)
      return {
        message: "OK", token: token, expiresIn: config.accessTokenTimeOut + 'h',
        user_email: email
      };
    }
    return loginRouter;
  }
  