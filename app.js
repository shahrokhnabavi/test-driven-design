const path = require('path');
const fs = require('fs');
const { createLogger, format, transports } = require('winston');
const config = require('./lib/Configuration');


const logDir = 'log';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const filename = path.join(logDir, 'output.log');

const logger = createLogger({
    level: config.logger.level,
    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => ` -- ${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(
                    info => ` - ${info.timestamp} ${info.level}: ${info.message}`
                )
            )
        }),
        new transports.File({ filename })
    ]
});

logger.debug(`[DATE] Dedug: ${config.environment}`);

logger.debug('What rolls down stairs');
logger.info('alone or in pairs,');
logger.info('and over your neighbors dog?');
logger.warn('Whats great for a snack,');
logger.info('And fits on your back?');
logger.error('Its log, log, log');
