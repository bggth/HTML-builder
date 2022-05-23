const { pipeline, Transform } = require("stream");
const fs = require('fs')
const path = require('path')

const HELLO_MESSAGE = `\nInput string for write to file.\nEnter 'exit' to program exit.`;
const GOODBYE_MESSAGE = '\nGood bye!';
const TEXT_FILE_NAME = 'text-file.txt';
const CHECK_STRING = 'exit\n';

class CheckStringStream extends Transform {
	constructor(checkString) {
		super();
		this.checkString = checkString;
	}
    _transform(chunk, encoding, callback) {
		if (chunk==this.checkString)
			exitHandler();		
		else
			callback(null, chunk);
    }
}

function exitHandler() {
	console.log(GOODBYE_MESSAGE);
	process.exit();
}

function main() {
	process.on('SIGINT', exitHandler);

	console.log(HELLO_MESSAGE);
	
	let checkStream = new CheckStringStream(CHECK_STRING);
	let writeStream = fs.createWriteStream(path.join(__dirname, TEXT_FILE_NAME));
	
	pipeline(process.stdin, 
		checkStream, 
		writeStream, 
		(err) => { console.log(err) }
		);
}

try {
	main()
} catch (err) {
	console.log(err);
}

