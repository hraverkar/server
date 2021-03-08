module.exports = {
  CallbackToPromise: function (inputParameters, functionwithcallback) {
    return new Promise((resolve, reject) => {
      try {
        functionwithcallback(
          ...inputParameters,
          function (err) {
            try {
              this.resolve(err);
            } catch (err) {
              this.reject(err);
            }
          }.bind({ resolve: resolve, reject: reject })
        );
      } catch (err) {
        reject(err);
      }
    });
  },

  Cleanup: function (res, zipped_folder) {
    // send response if not sent.
    if (!res.headersSent) {
      this.cacheHeader(res, zipped_folder);
    }
  },

  createToken: function (jwt, payload, jwtOptions, accessTokenTimeOut, email) {
    return jwt.sign(payload, jwtOptions.secretOrKey, {
      expiresIn: accessTokenTimeOut + "h",
      subject: email,
    });
  },

  decodeToken: function (token, jwt, jwtOptions) {
    var decoded = jwt.verify(token, jwtOptions.secretOrKey);
    return decoded;
  },

  createPayload: function (email) {
    return {
      email: email,
      usertypeid: 1
    };
  },

  cacheHeader: function (res, result) {
    if (result.message === undefined) {
      // in case of response with data, cache for 1 day and validate for every request.
      res.header("Cache-Control", "private, max-age=86400, no-cache");
    } else {
      // in case the request contains messages prevent caching response.
      res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    }
  },
};
