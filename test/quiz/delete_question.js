const assert = require('assert');
const Question = require('../../backend/models/question')

// Delete question
describe("Delete the question", async () => {

    let question;

    // Before each "it" test create a question, in order to be tested
    beforeEach(async () => {
        question = await Question.create({question:"Test question2"}); 
    });

    // Find created question by ID and delete it.
    // Then assert attempt to find it returns null. 
    it('Delete by ID', async () => {

        await Question.findByIdAndDelete(question._id);
        assert(Question.findOne({question:"Test question2"} === null));
    });

    // Find created question by name and delete it.
    // Then assert attempt to find it returns null. 
    it('Delete by question', async () => {
        
        await Question.findOneAndDelete({question:"Test question2"});
        assert(Question.findOne({question:"Test question2"} === null));
    });

    // Find created question by ID and delete it.
    // Then assert attempt to find it returns null. 
    it('Delete by Test question2', async () => {

        await Question.deleteOne({_id:question._id});
        assert(Question.findOne({question:"Test question2"} === null));
    });
})