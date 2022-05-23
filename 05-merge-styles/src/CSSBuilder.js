const Utils = require("./Utils");
const path = require('path');
class CSSBuilder {
	constructor(inputDir) {
		this.inputDir = inputDir;
		this.result = '';
	}

	async build(outputFileName) {
		let cssFiles = await Utils.enumFilesOnPath(this.inputDir);
		for (let i = 0; i < cssFiles.length; i++) {
            if (path.extname(cssFiles[i])==='.css') {
                let css = await Utils.readTextFromFile(cssFiles[i]);
                this.result += css;
            }
		}
        console.log(`build css: ${outputFileName}`);
		await Utils.writeTextToFile(outputFileName, this.result);
	}
}

module.exports = CSSBuilder;