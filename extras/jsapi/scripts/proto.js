'use strict';

const fs = require('fs');
const child = require('child_process');

const mkdir = (path) => {
	try {
		fs.mkdirSync(path, {recursive: true});
	} catch (e) {
		console.error(e);
	}
};

mkdir('dist/proto');
mkdir('lib/proto');

child.execSync(
    'yarn pbjs -t static-module -o lib/proto/bundle.js proto/**/*.proto');
child.execSync('yarn pbts -o lib/proto/bundle.d.ts lib/proto/bundle.js');

fs.cpSync(
    'lib/proto', 'dist/proto', {preserveTimestamps: true, recursive: true})