const CSSBuilder = require('./src/CSSBuilder');
const path = require('path');

const STYLES_DIRECTORY = 'styles';
const BUNDLE_DIRECTORY = 'project-dist'
const BUNDLE_FILE = 'bundle.css';

function main() {
    let builder = new CSSBuilder(path.join(__dirname, STYLES_DIRECTORY));
    builder.build(path.join(__dirname, BUNDLE_DIRECTORY, BUNDLE_FILE));
}

try {
    main()
} catch (err) {
    console.log(err);
}