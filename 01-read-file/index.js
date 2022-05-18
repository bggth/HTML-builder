const fs = require('fs');
const path = require('path');
const stream = require('stream');

stream.pipeline(fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8'), process.stdout, (err => {console.log(err);}));
			