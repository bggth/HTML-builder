const promises = require('fs/promises')
const fs = require('fs');
const path = require('path');

const TARGET_DIR = 'secret-folder';

async function getFileSize(fileName) {
	let result = -1;
	await new Promise((resolve, reject) => {
		fs.stat(fileName, (err, stats) => {
			result = stats.size;
			resolve();
		});
	})
	return result;
}

function getFileExt(fileName) {
	return path.extname(fileName).substring(1);
}

function getFileBaseName(fileName) {
	return fileName.split(path.sep)[fileName.split(path.sep).length-1].split('.')[0];
}

function convertToKiloBytes(bytes) {
	return (bytes / 1024).toFixed(3);
}

async function main() {
	let res = await promises.readdir(path.join(__dirname, TARGET_DIR), {withFileTypes: true});
	
	for (let i = 0; i < res.length; i++) {
		if (!res[i].isDirectory()) {
			let fullFileName = path.join(__dirname, TARGET_DIR, res[i].name);
			let fileSize = convertToKiloBytes(await getFileSize(fullFileName));
			let fileName = getFileBaseName(fullFileName);
			let fileExt =  getFileExt(fullFileName);
			console.log(`${fileName} - ${fileExt} - ${fileSize}kb`);
		}
	}
}

try {
	main();
} catch (err) {
	console.log(err);
}