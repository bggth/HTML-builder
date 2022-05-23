const promises = require('fs/promises');
const path = require('path');

class DirScan {
	constructor(directory) {
		this.directory = directory;
		this.result = [];
	}

	async scanPath(parent, dir) {
		let res = await promises.readdir(path.join(parent, dir), {withFileTypes: true});
		for (let i = 0; i < res.length; i++) {
			if (res[i].isDirectory()) {
				await this.scanPath(path.join(parent, dir), res[i].name);
			} else {
				this.result.push(path.join(parent, dir, res[i].name));
			}
		}
	}

	async scan() {
		await this.scanPath(this.directory, '');
		console.log(this.result);
	}
}

module.exports = DirScan;