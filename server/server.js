const express = require('express');
let app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
let router = express.Router();
const { getQuestions,
        getAnswers,
        addQuestion,
        addAnswer,
        addQHelpful,
        addQReport,
        addAHelpful,
        addAReport
      } = require('./controllers/qa.js');

router.get("/", (req, res) => {
  res.status(200).send('Server connection works');
});

router.get('/qa/questions/:product_id', (req, res) => {
  //get the questions from the db with the associated product_id
  getQuestions(req, res);
});

router.get('/qa/questions/:question_id/answers', (req, res) => {
  getAnswers(req, res);
});

router.post('/qa/questions', (req, res) => {
  addQuestion(req, res);
});

router.post('/qa/questions/:question_id/answers', (req, res) => {
  addAnswer(req, res);
});

router.put('/qa/questions/:question_id/helpful', (req, res) => {
  addQHelpful(req,res);
});

router.put('/qa/questions/:question_id/report', (req, res) => {
  addQReport(req, res);
});

router.put('/qa/answers/:answer_id/helpful', (req, res) => {
  addAHelpful(req, res);
});

router.put('/qa/answers/:answer_id/report', (req, res) => {
  addAReport(req, res);
});

app.use(router);

module.exports = app;

const port = 6001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

