const path = require('path');
const Builder = require('./src/Builder');

let config = {
    output:                 path.join(__dirname, 'project-dist'),
    template:               path.join(__dirname, 'template.html'),
    template_output:        path.join(__dirname, 'project-dist', 'index.html'),
    components:             path.join(__dirname, 'components'),
    styles:                 path.join(__dirname, 'styles'),
    styles_output:          path.join(__dirname, 'project-dist','style.css'),
    assets:                 path.join(__dirname, 'assets'),
    assets_output:          path.join(__dirname, 'project-dist','assets')
}
console.log(config);

let builder = new Builder(config);
builder.build();