'use strict';

const path = require('path');

const defaultConfig = require('../../etc/config.json');
const environment = process.env.APP_ENV || '';
const config = require(path.resolve('etc', environment, 'config.json'));

/**
 * @typedef {
 *  {
 *      environment: string,
 *      port: number,
 *      schedulerInterval: number,
 *      logger: {
 *          logFilesPath: string,
 *          level: string,
 *          transports: Array.<string>,
 *      }
 *  }
 * } AppConfig
 */

module.exports = { ...defaultConfig, ...config };
