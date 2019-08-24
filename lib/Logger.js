"use strict";

const path = require('path');
const fs = require('fs');
const { createLogger, format, transports } = require('winston');

const logDir = 'log';
const logFile = path.join(logDir, 'output.log');

/**
 * @param config
 * @returns {winston.Logger}
 */
const Logger = config => {
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    const formattedPrint = info => {
        return `[${info.timestamp}] ${info.level}: ${info.message} [${config.environment}:${info.label}]`
    };

    return createLogger({
        level: config.logger.level,
        format: format.combine(
            format.colorize(),
            format.label({label: path.basename(process.mainModule.filename)}),
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.printf(formattedPrint),
        ),
        transports: [
            new transports.Console(),
            new transports.File({
                filename: logFile,
                format: format.combine(
                    format.uncolorize(),
                    format.json()
                )
            })
        ]
    });
};

module.exports = Logger;
