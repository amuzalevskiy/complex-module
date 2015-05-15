var assert = require('assert');
describe("complex-module", function () {
    var testModule = require('testModule'),
        testModuleInDir = require('testModuleInDir'),
        testIgnores = require('testIgnores');
    it("should require files", function () {
        assert.equal(testModule.toExport, 'toExport.js');
        assert.equal(testModule.folder.toExport, 'folder/toExport.js');
    });
    it("should work from directory", function () {
        assert.equal(testModuleInDir.toExport, 'toExport.js');
        assert.equal(testModuleInDir.folder.toExport, 'folder/toExport.js');
    });
    it("should ignore test/node_modules and .* directories", function () {
        assert(!testIgnores.hasOwnProperty('test'), 'test directory included');
        assert(!testIgnores.hasOwnProperty('node_modules'), 'node_modules directory included');
        assert(!testIgnores.hasOwnProperty('.dotDir'), '.dotDir directory included');
        assert(!testIgnores.hasOwnProperty('folder'), 'folder directory included');
    });
});
