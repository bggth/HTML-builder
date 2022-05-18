const Utils = require("./Utils");
const path = require('path');

class Component {
	constructor(fileName) {
		this.fileName = fileName;
		this.name = fileName.split(path.sep)[fileName.split(path.sep).length-1].split('.')[0];
		this.html = '';
	}

	async init(){
		this.html = await Utils.readTextFromFile(this.fileName);
	}
}

module.exports = Component;