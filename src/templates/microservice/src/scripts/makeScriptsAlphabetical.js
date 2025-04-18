const packageJson = require("../../package.json");
const fs = require('fs');
const scriptKeys = Object.keys(packageJson.scripts);
scriptKeys.sort();
const newScriptsObj = {};
for(const key of scriptKeys) {
    newScriptsObj[key] = packageJson.scripts[key]
}

packageJson.scripts = newScriptsObj;
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));