/* eslint-disable no-unmodified-loop-condition */
'use strict';

/** @type {boolean} **/
let isRunning = true;

/**
 * @param {number} timeoutMilliseconds
 * @returns {Promise<any>}
 */
const sleep = (timeoutMilliseconds) => {
    return new Promise(resolve => { setTimeout(resolve, timeoutMilliseconds); });
};

/**
 * @param {number} intervalMilliseconds
 * @param {function} doProcess
 * @param {Logger} logger
 * @returns {Promise<void>}
 * @constructor
 */
const RunScheduler = async (intervalMilliseconds, doProcess, logger) => {
    while (isRunning) {
        const startTime = new Date().getTime();

        await doProcess();

        const duration = new Date().getTime() - startTime;
        await sleep(Math.max(0, intervalMilliseconds - duration));

        logger.debug(`My heart is beating ${(new Date().getTime() - startTime)}`);
    }
};

module.exports = {
    TerminateScheduler: () => {
        isRunning = false;
    },
    RunScheduler
};
