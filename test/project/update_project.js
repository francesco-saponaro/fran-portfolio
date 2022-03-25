const assert = require('assert');
const Project = require('../../backend/models/project')

// Update project
describe("Update the project", async () => {

    let project;

    // Before each "it" test create a Project, in order to be tested
    beforeEach(async () => {
        project = await Project.create({name:"Test name4", description:"Test description"}); 
    });

    // Set name of newly created project to a different name and save it, when using "set" its only saved in 
    // memory not in database, therefore must use save() afterwards.
    // Find all projects.
    // Then assert last created project name equals the modified name. 
    it("Set and Save", async () => {

        await project.set("name", "Kirin")
        await project.save()
        const projects = await Project.find()
        assert(projects[projects.length - 1].name === "Kirin")
    });

    // Update price of all projects named "Test name4".
    // Find all projects named "Test name4".
    // Then assert their price equals the modified price.
    it("Update Test name4s", async () => {

        await Project.updateMany({name:"Test name4"}, {description:"New description"})
        const projects = await Project.find({name:"Test name4"})
        assert(projects.every(project => project.description === "New description"))
    });
})