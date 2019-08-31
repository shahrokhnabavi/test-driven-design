'use strict';

/** @type {AppConfig} **/
const config = require('./lib/Configuration');
const logger = require('./lib/Logger')(config);
const { TerminateScheduler, RunScheduler } = require('./lib/Scheduler/Scheduler');
const Mysql = require('./lib/Database/MySql');

const dbConnection = Mysql(config, logger);
const doProcess = () => {
    const processDuration = Math.round(Math.random() * 1000) + 1000;
    return new Promise(resolve => { setTimeout(resolve, processDuration); });
};

process.on('SIGINT', async () => {
    await dbConnection.close();
    TerminateScheduler();
    logger.info('Application is terminated.');
    process.exit(0);
});

(async function () {
    logger.info('Application is starting.');

    const result = await dbConnection.query('select * from customers');
    console.log(result);

    RunScheduler(config.schedulerInterval, doProcess, logger);
})();
