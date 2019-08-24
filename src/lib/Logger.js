'use strict';

const path = require('path');
const fs = require('fs');
const { createLogger, format, transports } = require('winston');

/**
 * @param {AppConfig} config
 * @returns {winston.Logger}
 */
const Logger = config => {
    if (!fs.existsSync(config.logger.logFilesPath)) {
        fs.mkdirSync(config.logger.logFilesPath);
    }

    const formattedPrint = info => {
        return `[${info.timestamp}] ${info.level}: ${info.message} [${config.environment}:${info.label}]`;
    };

    const logTransports = [];

    if (config.logger.transports.includes('console')) {
        logTransports.push(new transports.Console());
    }

    if (config.logger.transports.includes('file')) {
        logTransports.push(
            new transports.File({
                filename: path.join(config.logger.logFilesPath, 'output.log'),
                format: format.combine(
                    format.uncolorize(),
                    format.json()
                )
            })
        );
    }

    return createLogger({
        level: config.logger.level,
        format: format.combine(
            format.colorize(),
            format.label({ label: path.basename(process.mainModule.filename) }),
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.printf(formattedPrint)
        ),
        transports: logTransports
    });
};

module.exports = Logger;
