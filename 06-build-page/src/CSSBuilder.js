const Utils = require("./Utils");

class CSSBuilder {
	constructor(inputDir) {
		this.inputDir = inputDir;
		this.result = '';
	}

	async build(outputFileName) {
		let cssFiles = await Utils.enumFilesOnPath(this.inputDir);
		for (let i = 0; i < cssFiles.length; i++) {
			let css = await Utils.readTextFromFile(cssFiles[i]);
			this.result += css;
		}

		await Utils.writeTextToFile(outputFileName, this.result);
	}
}

module.exports = CSSBuilder;