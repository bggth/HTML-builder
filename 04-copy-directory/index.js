const promises = require('fs/promises');
const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream');
const { formatWithOptions } = require('util');

const SOURCE_DIRECTORY = 'files';
const DESTINATION_DIRECTORY  = 'files-copy';

class CopyDirectory {
	constructor(srcDir, destDir) {
		this.srcDir = srcDir;
		this.destDir = destDir;
		this.fileList = [];
	}

	async getFileList() {
		this.fileList = await promises.readdir(this.srcDir);
	}

	async clearDestDir() {
		let fileList = await promises.readdir(this.destDir);
		for (let i = 0; i < fileList.length; i++) {
			fileList[i] = path.join(this.destDir, fileList[i]);
		}
		for (let i = 0; i < fileList.length; i++)
			await this.deleteFile(fileList[i]);
	}

	async deleteFile(fileName) {
		let result = null;
		result = await new Promise((resolve, reject) => {
			fs.unlink(fileName, (err => {
				if (err)
					reject(err);
				else
					resolve();
			}))
		})
		return result;
	}

	async copyFile(srcFile, destFile) {
		let result = null;
		try {
			result = await new Promise((resolve, reject) => {
				let readStream = fs.createReadStream(srcFile);
				let writeStream = fs.createWriteStream(destFile);
				pipeline(readStream, writeStream, (err => {
					result = err;
					if (err) {
						reject(err);
					} else {
						resolve();
					}					
				}));	
			});	
		} catch (err) {
		}
		return result;
	}

	async do() {
		await this.getFileList();
		await fs.promises.mkdir(this.destDir, {recursive: true});
		await this.clearDestDir();
		for (let i = 0; i < this.fileList.length; i++) {
			let err = await this.copyFile(path.join(this.srcDir, this.fileList[i]), path.join(this.destDir, this.fileList[i]));
			console.log(`copy ${this.fileList[i]} ->`, err?'error':'ok');
		}
	}
}

async function main() {
	let copyDir = new CopyDirectory(path.join(__dirname, SOURCE_DIRECTORY), path.join(__dirname, DESTINATION_DIRECTORY));
	await copyDir.do();
}

try {
	main()
} catch (err) {
	console.log(err);
}