const path = require('path');
const DirScan = require('./DirScan');
const Utils = require("./Utils");

class Assets {
	constructor() {

	}

	async build(inputDir, outputDir) {
		console.log(inputDir, outputDir);
        let dirScan = new DirScan(inputDir);
        await dirScan.scan()
        return;
		let files = await Utils.enumFilesOnPathShort(inputDir);
		console.log(files);
		await Utils.copyFile(path.join(inputDir, 'test.txt'), path.join(outputDir, 'test.txt'))
	}
}

module.exports = Assets;