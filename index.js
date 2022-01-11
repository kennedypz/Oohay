const express = require("express");
const app = express();
const connection = require("./database/database");
const questionModel = require("./database/Question");
const answerModel = require("./database/Answer");

//database
connection.authenticate().then(() => {
    console.log("The application is connected with the database");
}).catch((error) => {
    console.log(error);
});

//setting ejs as view engine (to render HTML);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    //findAll is rquivalent to SELECT * FROM QUESTION
    questionModel.findAll({
        //means that we only want the data in the table, without additional db info
        raw: true,
        order: [['id', 'desc']]
    }).then(questions => {
        res.render("index", {
            questions: questions
        });
    });
    
});

app.get("/ask", (req, res) => {
    res.render("ask");
});

app.post("/saveQuestion", (req, res) => {
    let title = req.body.title;
    let description = req.body.description;

    //Inserting data into 'Question' table, equivalent to using INSERT in sql
    questionModel.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/question/:id", (req, res) => {
    let id = req.params.id;

    questionModel.findOne({
        where: {id: id}
    }).then(question => {
        if(question != undefined){
            
            answerModel.findAll({
                where: {questionId: question.id},
                order: [['id', 'desc']]
            }).then(answers => {
                res.render("question", {
                    question: question,
                    answers: answers
                });
            });

        } else{
            res.redirect("/")
        }
    });
});

app.post("/answer", (req, res) => {
    let answerBody = req.body.answerBody;
    let questionId = req.body.questionId;

    answerModel.create({
        body: answerBody,
        questionId: questionId
    }).then(() => {
        res.redirect("/question/" + questionId);
    });
});

app.listen(8080, (error) => {
    if(error){
        console.log("An error occurred!");
    } else{
        console.log("Server started");
    }
});