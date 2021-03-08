module.exports = function (config) {

    var moment = require('moment');
    let timezone = moment.tz.guess();
  
    var loggerconfig = { // configure to use all types in different files.
      pm2: true, // allow pm2 to log errors using log4js
      appenders: {
        errorLogs: {
          type: 'file',
          filename: 'logs/error.log',
          maxLogSize: config.logInfo.maxsize,
          backups: config.logInfo.backups,
          layout: {
            type: 'pattern',
            pattern: config.logInfo.datePattern + ',' + timezone + ' -[%p] %c - %m',
          },
        },
        infoLogs: {
          type: 'file',
          filename: 'logs/info.log',
          maxLogSize: config.logInfo.maxsize,
          backups: config.logInfo.backups,
          layout: {
            type: 'pattern',
            pattern: config.logInfo.datePattern + ',' + timezone + ' -[%p] %c - %m',
          }
        },
        debugLogs: {
          type: 'file',
          filename: 'logs/debug.log',
          maxLogSize: config.logInfo.maxsize,
          backups: config.logInfo.backups,
          layout: {
            type: 'pattern',
            pattern: config.logInfo.datePattern + ',' + timezone + ' -[%p] %c - %m',
          }
        },
        console: { type: 'console' }
      },
      categories: {
        error: { appenders: ['errorLogs'], level: 'error' },
        info: { appenders: ['infoLogs'], level: 'info' },
        debug: { appenders: ['debugLogs'], level: 'debug' },
        default: { appenders: ['console'], level: 'trace' }
      }
    }
  
    return loggerconfig;
  }