const { createLogger, format, transports } = require('winston');
const winston = require('winston');
const { combine, timestamp, label, printf } = format;
 
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
 
const logger = createLogger({
    level: 'info',
  format: combine(
    label({ label: '' }),
    timestamp(),
    myFormat
  ),
  defaultMeta: {service: `user-service`},
  transports: [
 
    new winston.transports.File({ filename: './logger/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logger/info.log', level: 'info' }),

    new winston.transports.File({ filename: './logger/combined.log' }),
  ]
});

module.exports = logger;

