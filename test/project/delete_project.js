const assert = require('assert');
const Project = require('../../backend/models/project')

// Delete Project
describe("Delete the project", async () => {

    let project;

    // Before each "it" test create a Project, in order to be tested
    beforeEach(async () => {
        project = await Project.create({name:"Test name2", description:"Test description"}); 
    });

    // Find created Project by ID and delete it.
    // Then assert attempt to find it returns null. 
    it('Delete by ID', async () => {

        await Project.findByIdAndDelete(project._id);
        assert(Project.findOne({name:"Test name2"} === null));
    });

    // Find created Project by name and delete it.
    // Then assert attempt to find it returns null. 
    it('Delete by name', async () => {
        
        await Project.findOneAndDelete({name:"Test name2"});
        assert(Project.findOne({name:"Test name2"} === null));
    });

    // Find created Project by ID and delete it.
    // Then assert attempt to find it returns null. 
    it('Delete by Test name2', async () => {

        await Project.deleteOne({_id:project._id});
        assert(Project.findOne({name:"Test name2"} === null));
    });
})