const assert = require('assert');
const Question = require('../../backend/models/question')

// Read question
describe("Read the question", async () => {

    let question;

    // Before each "it" test create a question, in order to be tested
    beforeEach(async () => {
        question = await Question.create({question:"Test question3"}); 
    });

    // Find all questions with same name as the one just created.
    // Assert the ID of the last of the questions named Test question3 equals the ID of the one just created.
    it("Find all Test question3", async () => {
        const test_question = await Question.find({question:"Test question3"})
        assert(test_question[test_question.length - 1]._id.toString() === question._id.toString())
    })
});