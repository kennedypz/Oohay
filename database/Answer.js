const Sequelize = require("sequelize");
const connection = require("./database");

const Answer = connection.define('answer', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answer.sync({force: false}).then(() => {
    console.log("Table 'Answer' created successfully!");
});

module.exports = Answer;