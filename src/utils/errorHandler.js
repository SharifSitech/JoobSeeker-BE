const logger = require("./logger");

const errorHandler = (res, error, title) => {
    const status = error?.status || 500;

    logger.error(`${title}: ${error.message}`);
    res.status(status).json({error: "Something went wrong", details: error.message});
}

module.exports = {errorHandler};