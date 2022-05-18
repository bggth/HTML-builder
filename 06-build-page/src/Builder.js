const Config = require("./Config");
const Template = require("./Template");
const CSSBuilder = require("./CSSBuilder");
const path = require('path');
const Utils = require("./Utils");
const Assets = require("./Assets");

class Builder {
	constructor(config) {
		this.config = config;
	}

	async build() {
		await Utils.checkDir(this.config.output);

		let template = new Template(this.config.template, this.config.components);
		await template.init();
		await template.build(path.join(this.config.output, 'index.html'))

		let cssBuilder = new CSSBuilder(this.config.styles);
		await cssBuilder.build(path.join(this.config.output, 'style.css'));

		let assets = new Assets();
		await assets.build(this.config.assets, path.join(this.config.output, 'assets'));
	}
}

module.exports = Builder;