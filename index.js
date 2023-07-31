/**
 * start process from backend express
 */
require('mysql2'); // fixed for vercel/pkg 
require('mariadb'); // fixed for vercel/pkg 
require('./src/backend/index');