var log4js = require('log4js');
// initialize the var to use.
var loggerinfo = log4js.getLogger('info');
var loggererror = log4js.getLogger('error');
var loggerdebug = log4js.getLogger('debug');
let processId = undefined;
if (process.env.pm_id !== undefined) {
  processId = process.env.pm_id;
} else {
  processId = 'NA';
}
module.exports = {
  loggerInsert: function (error, debugMesg) {
    if (error !== undefined) {
      loggererror.error('Process id : ' + processId + ', Error : ' + error);
      let errMesg;
      if (error.message !== undefined) {
        errMesg = error.message;
      } else {
        errMesg = error;
      }
      loggerdebug.debug("Process id : " + processId + ", Error :" + errMesg + ", debugInfo : " + debugMesg);
    } else {
      loggerdebug.debug("Process id : " + processId + ", debugInfo : " + debugMesg);
    }
  },
  loggerInfo: function (infoMesg) {
    loggerinfo.info(infoMesg);
  },
  clientLoggerInsert: function (request) {
    let errorMsg = request.body.errorMesg;
    let errorStack = request.body.errorStack;
    let debugMesg = request.body.debugData;
    let userId = request.body.userEmail;
    let  errorLog;

    if (userId === 'null' || userId === null || userId === undefined) {
      errorLog = "Process id : " + processId + ",\n" + " Client Error : " + errorMsg;
    } else {
      errorLog = "Process id : " + processId + ", UserId : " + userId + ",\n" + " Client Error : " + errorMsg;
    }
    loggererror.error(errorLog + "\n" + errorStack);
    loggerdebug.debug(errorLog + ", debugInfo : " + debugMesg);
  }
}