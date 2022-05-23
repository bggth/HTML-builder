const Template = require('./Template');
const CSSBuilder = require('./CSSBuilder');
const Assets = require('./Assets');
const path = require('path');
const Utils = require('./Utils');

class Builder {
	constructor(config) {
		this.config = config;
	}

	async build() {
		await Utils.checkDir(this.config.output);

		let template = new Template(this.config.template, this.config.components);
		await template.init();
		await template.build(this.config.template_output);

		let cssBuilder = new CSSBuilder(this.config.styles);
		await cssBuilder.build(this.config.styles_output);

		let assets = new Assets();
		await assets.build(this.config.assets, this.config.assets_output);
	}
}

module.exports = Builder;