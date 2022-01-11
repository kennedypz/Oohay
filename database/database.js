const Sequelize = require('sequelize');

//                               db name   user    password
const connection = new Sequelize('oohay', 'root', '123456', {
    //where the db is running and which dbms is being used
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;