// middlewares/loggerMiddleware.js
const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
    const { method, originalUrl, body, query } = req;

    logger.info(`Incoming Request: ${method} ${originalUrl}`);
    logger.info(`Body: ${JSON.stringify(body)} | Query: ${JSON.stringify(query)}`);

    next();
};

module.exports = requestLogger;
