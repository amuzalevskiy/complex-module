# complex-module

Simple tool for creating complex modules. Converts directory structure to object.

### Sample:
Directory structure
```sh
tools/
    usefullTool.js
exportedClass.js
```
will be converted to
```js
module.exports = {
    tools: {
        usefullTool: require('./tools/usefullTool.js'),
    },
    exportedClass: require('./exportedClass.js')
}
```

Using following script (e.g. `index.js`):
```javascript
// will populate all modules in current directory to module.exports object
require('complex-module').make(module);
```

Or if your library is placed in sub-folder:
```javascript
var complexModule = require('complex-module');
complexModule.make(complexModule.baseDir(module.filename) + '/lib', module.exports);
```

<a name="baseDir"></a>
## baseDir(str) ⇒ <code>string</code>
Removes filename from full filename leaving base dir only

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

<a name="make"></a>
## make(moduleInfoOrDir, [res], [filter]) ⇒ <code>Object</code>
Finds all javascripts inside folder and inserts into result. Converts directory structure to object structure

Usual use case:
```javascript
// will populate all modules in current directory to module.exports object
require('complex-module').make(module);
```

If your library is in subfolder:
```javascript
var complexModule = require('complex-module');
complexModule.make(complexModule.baseDir(module.filename) + '/lib', module.exports);
```

**Kind**: global function  
**Returns**: <code>Object</code> - object passed as an argument or new object populated with all modules inside baseDir  

| Param | Type | Description |
| --- | --- | --- |
| moduleInfoOrDir | <code>string</code> &#124; <code>Object</code> | module information or directory where search files |
| [res] | <code>Object</code> | result where to store found modules, uses moduleInfoOrDir.exports if not defined |
| [filter] | <code>Object</code> | see [fs-walker filter](https://github.com/steventhuriot/node-fs-walker#filters) for details.                         Default behaviour is to add all `*.js` files, ignoring files placed in `node_modules`, `test`                         and dot-started directories |

