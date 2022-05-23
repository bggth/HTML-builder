const path = require('path');
const DirScan = require('./DirScan');
const Utils = require('./Utils');

class Assets {
	constructor() {

	}

	async build(inputDir, outputDir) {
        let dirScan = new DirScan(inputDir, outputDir);
        await dirScan.scan();
        for (let i = 0; i < dirScan.result.length; i++) {
            console.log(`write asset: ${dirScan.result[i].dest}`);
            await Utils.copyFile(dirScan.result[i].src, dirScan.result[i].dest);
        }
	}
}

module.exports = Assets;