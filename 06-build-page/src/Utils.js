const stream = require('stream');
const fs = require('fs');
const path = require('path');

class Utils {
	static readTextFromFile = async(fileName) => {
		let result = '';
		let readStream = fs.createReadStream(fileName, 'utf-8');
		await new Promise((resolve, reject) => {
			readStream.on('data', (chunk) => {result += chunk; });
			readStream.on('end', () => {resolve()});
		});
		return result;
	}

	static writeTextToFile = async(fileName, string) => {
		let writeStream = fs.createWriteStream(fileName, 'utf-8');
		await new Promise((resolve, reject) => {
			writeStream.write(string);
			resolve();
		});
	}

	static enumFilesOnPath = async(dir) => {
		let result = [];
		await new Promise((resolve, reject) => {
			fs.readdir(dir, (err, files) => {
				files.forEach(file => {
					let res = path.join(dir, file)
					result.push(res);
					if (files.indexOf(file) == files.length-1)
						resolve();
				})
			})
		});
		return result;
	}

	static enumFilesOnPathShort = async(dir) => {
		let result = [];
		await new Promise((resolve, reject) => {
			fs.readdir(dir, (err, files) => {
				files.forEach(file => {
					result.push(file);
					if (files.indexOf(file) == files.length-1)
						resolve();
				})
			})
		});
		return result;
	}

	static checkDir = async(dir) => {
		try {
			await fs.promises.mkdir(dir);
		} catch {
			
		}		
	}

	static copyFile = async(srcFileName, destFileName) => {
		let readStream = fs.createReadStream(srcFileName);
		let writeStream = fs.createWriteStream(destFileName);
		await stream.pipeline(readStream, writeStream, (err) => { console.log(err)});
	}
}

module.exports = Utils;