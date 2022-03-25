const assert = require('assert');
const Project = require('../../backend/models/project')

// Create product
describe("Create the first data", () => {

    it("Create new project", async () => {

        // Create product
        const project = await Project.create({name:"Test name", description:"Test description"});
        
        // Assert is not new since its just been created
        assert(!project.isNew)  
    });
})