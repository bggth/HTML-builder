const fs = require('fs');
const path = require('path');
const Component = require("./Component");
const Utils = require("./Utils");

class Template {
	constructor(fileName, components) {
		this.fileName = fileName;
		this.componentsDir = components;
		this.components = [];
		this.result = '';
	}

	async init() {
		this.result = await Utils.readTextFromFile(this.fileName);
		let componentFiles = await Utils.enumFilesOnPath(this.componentsDir)
		for(let i = 0; i < componentFiles.length; i++) {
			let component = new Component(componentFiles[i]);
			await component.init();
			this.components.push(component);
		}
	}

	process() {
		this.result.split('\n').forEach(elem => {
			let start = elem.indexOf('{{');
			if (start > 0) {
				let end = elem.indexOf('}}');
				if (end > 0) {
					let componentName = elem.substring(start+2, end);
					let search = elem.trim();
					let replace = this.searchComponentByName(componentName).html;
					this.result = this.result.replace(search, replace);
				}
			}
		})
	}

	async build(outputFileName) {
		this.process();
		await Utils.writeTextToFile(outputFileName, this.result);
	}

	searchComponentByName(name) {
		for (let i = 0; i < this.components.length; i++) {
			if (name==this.components[i].name)
				return this.components[i];
		}
		return null;
	}
}

module.exports = Template;