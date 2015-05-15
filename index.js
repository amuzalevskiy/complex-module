var fs = require('fs'),
    walk = require('fs-walker'),
    baseDir;

/**
 * Removes filename from full filename leaving base dir only
 *
 * @param {string} str
 * @returns {string}
 */
module.exports.baseDir = function (str) {
    return str.replace(/[\/\\][^\/\\]*$/i, '');
}

baseDir = module.exports.baseDir;

/**
 * Finds all javascripts inside folder and inserts into result. Converts directory structure to object structure
 *
 * Usual use case:
 * ```javascript
 * // will populate all modules in current directory to module.exports object
 * require('complex-module').make(module);
 * ```
 *
 * If your library is in subfolder:
 * ```javascript
 * var complexModule = require('complex-module');
 * complexModule.make(complexModule.baseDir(module.filename) + '/lib', module.exports);
 * ```
 *
 * @param {string|Object} moduleInfoOrDir - module information or directory where search files
 * @param {Object=} res - result where to store found modules, uses moduleInfoOrDir.exports if not defined
 * @param {Object=} filter - see [fs-walker filter](https://github.com/steventhuriot/node-fs-walker#filters) for details.
 *                         Default behaviour is to add all `*.js` files, ignoring files placed in `node_modules`, `test`
 *                         and dot-started directories
 * @returns {Object} object passed as an argument or new object populated with all modules inside baseDir
 */
module.exports.make = function (moduleInfoOrDir, res, filter) {
    var fileCheckFn,
        directory = !moduleInfoOrDir.hasOwnProperty('filename') ? moduleInfoOrDir : baseDir(moduleInfoOrDir.filename),
        ignoreFolders = ['node_modules', 'test', /^\./];

    if (!res) {
        if (moduleInfoOrDir.hasOwnProperty('exports')) {
            res = moduleInfoOrDir.exports;
        } else {
            res = {};
        }
    }

    if (!filter) {
        fileCheckFn = moduleInfoOrDir.hasOwnProperty('filename') ?
            function (stats) {
                return /\.js$/i.test(stats.name) && stats.fullname !== moduleInfoOrDir.filename;
            } :
            function (stats) {
                return /\.js$/i.test(stats.name);
            };
        filter = {
            file: fileCheckFn,
            directory: function (stats) {
                var i;
                for (i = 0; i < ignoreFolders.length; i++) {
                    var folder = ignoreFolders[i];
                    if (typeof folder.test === 'function') {
                        if (folder.test(stats.name)) {
                            return false;
                        }
                    } else if (stats.name === folder) {
                        return false;
                    }
                }
                return true;
            }
        };
    }

    walk.files
        .sync(directory, filter)
        .forEach(function(stats) {
            var i, part,
                requiredModule = require(stats.fullname),
                shortName = stats.fullname. substr(directory.length + 1),
                parts = shortName.replace(/\.js$/i, '').split(/[\/\\]/),
                currentTreePos = res;

            // create path and store required module
            for (i = 0; i < parts.length; i++) {
                part = parts[i];
                if (i === parts.length - 1 ) {
                    currentTreePos[part] = requiredModule;
                } else {
                    if (!currentTreePos.hasOwnProperty(part)) {
                        currentTreePos[part] = {};
                    }
                    currentTreePos = currentTreePos[part];
                }
            }
        });

    return res;
}
