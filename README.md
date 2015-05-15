## Members
<dl>
<dt><a href="#baseDir">baseDir</a> ⇒ <code>string</code></dt>
<dd><p>Removes filename from full filename leaving base dir only</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#make">make(moduleInfoOrDir, [res], [filter])</a> ⇒ <code>Object</code></dt>
<dd><p>Finds all javascripts inside folder and inserts into result. Converts directory structure to object structure</p>
<p>Usual use case:</p>
<pre><code class="lang-javascript">// will populate all modules in current directory to module.exports object
require(&#39;complex-module&#39;).make(module);
</code></pre>
<p>If your library is in subfolder:</p>
<pre><code class="lang-javascript">var complexModule = require(&#39;complex-module&#39;);
complexModule.make(complexModule.baseDir(module.filename) + &#39;/lib&#39;, module.exports);
</code></pre>
</dd>
</dl>
<a name="baseDir"></a>
## baseDir ⇒ <code>string</code>
Removes filename from full filename leaving base dir only

**Kind**: global variable  

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
| [res] | <code>Object</code> | result where to store found modules, uses moduleInfoOrDir.exports if |
| [filter] | <code>Object</code> | see [fs-walker filter](https://github.com/steventhuriot/node-fs-walker#filters) for details.                         default behaviour is to add *.js files ignoring files placed in `node_modules`, `test`                         and dot-started directories |

