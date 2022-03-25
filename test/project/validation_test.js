const assert = require('assert');
const Project = require('../../backend/models/project')

// Check Mongoose project model validation
describe('Project validation', () => {

    // Create a project with an undefined name.
    // Check if it validates with "validateSync".
    // Extract the message from the validation result and assert it matches what we expect.
    it('Name is required', () => {

        const project = new Project({description:'test description'});

        const result = project.validateSync();
        const { message } = result.errors.name
        assert(message === 'Please enter project name')
    });

    it('Description is required', () => {

        const project = new Project({name:'test name5'});

        const result = project.validateSync();
        const { message } = result.errors.description
        assert(message === 'Please enter project description')
    });
})