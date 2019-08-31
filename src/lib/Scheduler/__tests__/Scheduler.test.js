'use strict';

const { RunScheduler, TerminateScheduler } = require('../Scheduler');

const logger = { debug: () => {} };

/**
 * @param {number} times
 * @returns {Promise<void>}
 */
const flushSleep = async (times) => {
    for (let i = 0; i < times; i++) {
        await new Promise(setImmediate);
        jest.runAllTimers();
    }
};

jest.useFakeTimers();

test('Should call the process 10 times', async () => {
    const process = jest.fn(() => Promise.resolve());

    RunScheduler(1000, process, logger);

    jest.runAllTimers();

    await flushSleep(9);

    expect(process).toBeCalled();
    expect(process).toHaveBeenCalledTimes(10);
});

test('Should call the process 2 times if process take time more than intervalMilliseconds', async () => {
    const process = jest.fn(
        () => new Promise(resolve => setTimeout(resolve, 2000))
    );

    RunScheduler(1000, process, logger);

    jest.advanceTimersByTime(2000);
    await flushSleep(1);
    jest.advanceTimersByTime(1000);

    expect(process).toHaveBeenCalledTimes(2);
});

test('Should not run process if scheduler is terminated', async () => {
    const process = jest.fn();

    TerminateScheduler();

    RunScheduler(1000, process, logger);

    expect(process).not.toBeCalled();
});
