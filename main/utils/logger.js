const winston = require('winston');
function logger(context) {
  this.context = context;
  const alignedWithColorsAndTime = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSSZZ' }),
    winston.format.align(),
    winston.format.printf((info) => {
      const { timestamp, level, message, ...args } = info;

      const ts = timestamp.slice(0, 19).replace('T', ' ');
      return `[${this.context}] ${ts} [${level}]: ${message} ${
        Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
      }`;
    }),
  );
  return winston.createLogger({
    level: 'silly',
    format: alignedWithColorsAndTime,
    transports: [new winston.transports.Console()],
  });
}

module.exports = logger;
