const winston = require("winston");
const util = require("util");
const R = require("ramda");
const {
  PapertrailConnection,
  PapertrailTransport,
} = require("winston-papertrail");

const { format, transports } = winston;
const { combine, printf, timestamp, json } = format;
const transportsArray = [new transports.Console()];

/* istanbul ignore next */
if (process.env.ENV === "production" && process.env.PAPERTRAIL) {
  const papertrailConnection = new PapertrailConnection({
    host: process.env.PAPERTRAIL,
    port: process.env.PAPERTRAIL_PORT,
  });

  papertrailConnection.on("connect", () => {
    // Do not log here since can happen before transports are setup
    // winston.info('[Monitoring] Papertrail is connected');
  });
  papertrailConnection.on("error", (err) => {
    // Handle, report, or silently ignore connection errors and failures
    winston.error("[Monitoring] Papertrail could not connect", err);
  });
  transportsArray.push(
    new PapertrailTransport(papertrailConnection, {
      hostname: `${process.env.APP_NAME}-${process.env.ENV}`,
      colorize: true,
      handleExceptions: true,
    }),
  );
}

const formatObject = (param) => {
  /* istanbul ignore next */
  if (R.is(Object, param)) {
    return JSON.stringify(param, null, 2);
  }
  return `${param}`;
};

const logFormatter = printf((info) => {
  const { level, message, ...meta } = info;
  return `[${meta.timestamp}] [${level}]: ${formatObject(message)}`;
});

function transform(info) {
  const args = info[Symbol.for("splat")];
  if (args) {
    info.message = util.format(info.message, ...args);
  }
  return info;
}

function utilFormatter() {
  return { transform };
}

/* istanbul ignore next */
const print = () => {
  return process.env.PORT
    ? combine(
        timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        utilFormatter(),
        // align(),
        json(),
      )
    : combine(
        timestamp({
          format: () => {
            return new Date().toLocaleString();
          },
        }),
        utilFormatter(),
        logFormatter,
      );
};

const Init = async () => {
  winston.configure({
    level: "info",
    format: print(),
    transports: transportsArray,
    hostname: `${process.env.APP_NAME}-${process.env.ENV}`,
    colorize: true,
    handleExceptions: true,
  });

  /* istanbul ignore next */
  process.on("unhandledRejection", (err) => {
    winston.error(err);
  });
};

export const Logger = Init;
