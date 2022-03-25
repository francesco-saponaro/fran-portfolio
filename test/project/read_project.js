const assert = require('assert');
const Project = require('../../backend/models/project')

// Read project
describe("Read the project", async () => {

    let project;

    // Before each "it" test create a Project, in order to be tested
    beforeEach(async () => {
        project = await Project.create({name:"Test name3", description:"Test description"}); 
    });

    // Find all projects with same name as the one just created.
    // Assert the ID of the last of the projects named Test name3 equals the ID of the one just created.
    it("Find all Test name3", async () => {
        const test_project = await Project.find({name:"Test name3"})
        assert(test_project[test_project.length - 1]._id.toString() === project._id.toString())
    })
});