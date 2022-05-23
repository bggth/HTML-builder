const promises = require('fs/promises');
const path = require('path');

class DirScan {
	constructor(srcDirectory, destDirectory) {
		this.srcDirectory = srcDirectory;
		this.destDirectory = destDirectory;
		this.result = [];
	}

	async scanPath(parent, dir) {
		let res = await promises.readdir(path.join(parent, dir), {withFileTypes: true});
		for (let i = 0; i < res.length; i++) {
			if (res[i].isDirectory()) {
				await this.scanPath(path.join(parent, dir), res[i].name);
			} else {
				let srcPath = path.join(parent, dir, res[i].name);
				let destPath = srcPath.replace(this.srcDirectory, this.destDirectory)
				let file = {src: srcPath, dest: destPath};
				this.result.push(file);
			}
		}
	}

	async scan() {
		await this.scanPath(this.srcDirectory, '');
	}
}

module.exports = DirScan;