'use strict';

/** @type {AppConfig} **/
const config = require('./lib/Configuration');
const logger = require('./lib/Logger')(config);
const { TerminateScheduler, RunScheduler } = require('./lib/Scheduler/Scheduler');

const doProcess = () => {
    const processDuration = Math.round(Math.random() * 5000) + 1000;
    return new Promise(resolve => { setTimeout(resolve, processDuration); });
};

process.on('SIGINT', function () {
    TerminateScheduler();
    logger.info('Application is terminated.');
    process.exit(0);
});

(async function () {
    logger.info('Application is starting.');

    RunScheduler(config.schedulerInterval, doProcess, logger);
})();
