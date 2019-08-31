'use strict';

const mysql = require('mysql');

let _logger;
let _pool;
let _mysqlInstance;

class MySQL {
    constructor () {
        if (!_pool) {
            _pool = mysql.createPool({
                connectionLimit: 10,
                host: 'localhost',
                user: 'devuser',
                password: 'devpass',
                port: 9906,
                database: 'web_db'
            });
        }
    }

    async connection () {
        return new Promise((resolve, reject) => {
            _pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err.code);
                }

                resolve(connection);
            });
        });
    }

    async query (sql) {
        const connection = await this.connection();

        return new Promise((resolve, reject) => {
            // Use the connection
            connection.query(
                sql,
                function (error, results, fields) {
                    connection.release();

                    if (error) {
                        reject(error.code);
                    }

                    resolve({ results, fields });
                }
            );
        });
    }

    get pool () {
        return _pool;
    }

    async close () {
        return new Promise( (resolve, reject) => {
            _pool.end(function (error) {
                if (error) {
                    reject(error);
                }

                _logger.debug('MySQL connection is closed.');
                resolve();
            });
        });
    }
}

module.exports = (config, logger) => {
    if (!_mysqlInstance) {
        _logger = logger;
        _mysqlInstance = new MySQL();
    }

    return _mysqlInstance;
};
