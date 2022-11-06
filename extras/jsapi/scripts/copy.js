'use strict';
const fs = require('fs');

const args = process.argv.slice(2);
if (args.length < 1) {
	console.error('Needs <dst>');
	process.exit(1);
}
fs.cpSync('.', args[0], {preserveTimestamps: true, recursive: true})