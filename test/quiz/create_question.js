const assert = require('assert');
const Question = require('../../backend/models/question')

// Create product
describe("Create the first quiz data", () => {

    it("Create new question", async () => {

        // Create product
        const question = await Question.create({question:"Test question"});
        
        // Assert is not new since its just been created
        assert(!question.isNew)  
    });
})