const Sequelize = require("sequelize");
const connection = require("./database");

//creating the model
//                                name of the table
const Question = connection.define('question', {
    //columns of the table
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//Sending the model to the database
Question.sync({force: false}).then(() => {
    console.log("Table 'Question' created successfully!");
});

module.exports = Question;