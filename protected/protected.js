module.exports = function (
  expJWT,
  app,
  jwt,
  jwtOptions,
  sequelize,
  config,
  execFile
) {
  const protectedRouter = require("express").Router();
  var validate = require("../validate");

  protectedRouter.use(function (req, res, next) {
    console.log("protected route called");
    next();
  })

  function getValidToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      var token = req.headers.authorization.split(' ')[1];
      return token;
    } else if (req.query && req.query.token) {
      return req.query.token;
    } else {
      return null;
    }
  }

  // protected routes token middleware
  protectedRouter.use(
    expJWT({
      secret: 'key',
      credentialsRequired: false,
      getToken: function fromHeaderOrQuery(req) {
        return getValidToken(req);
      }
    }));

  protectedRouter.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.send('invalid token');
    } else
      next();
  })

  // secure protected routes using  user info
  protectedRouter.all('*', function (req, res, next) {
    if (validate(req.user))
      res.sendStatus('unauthorized user');
    else
      next();
  })

  // protected routes field:
  protectedRouter.post('/home', function (req, res, next) {
    res.send(req.user.usertypeid);
  })

  // protected routes field:
//   const refreshtokenRouter = require('./refreshtoken')(jwt, jwtOptions, config);
//   protectedRouter.use('/refresh_token', refreshtokenRouter);

  // protected routes field:

  return protectedRouter;
};
