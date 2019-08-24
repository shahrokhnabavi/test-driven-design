"use strict";

const path = require('path');

const defaultConfig = require('../etc/config.json');
const environment = process.env.APP_ENV || '';
const config = require(path.resolve('etc',environment, 'config.json'));

module.exports = {...defaultConfig, ...config};
