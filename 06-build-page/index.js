const path = require('path');

const Config = require("./src/Config");
const Builder = require("./src/Builder");

let config = new Config(output = path.join(__dirname, './project-dist'),
	template = path.join(__dirname, 'template.html'),
	components = path.join(__dirname, './components'),
	styles =  path.join(__dirname, './styles'),
	assets = path.join(__dirname,'./assets')
);

let builder = new Builder(config);
builder.build().then(res => {
	//console.log(builder.template.result);
});