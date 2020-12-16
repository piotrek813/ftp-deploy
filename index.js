#!/usr/bin/env node
'use strict';
const meow = require('meow');
const fs = require('fs');
const { dirname } = require('path');
const deploy = require('./deploy')

const createCircleciConfig = (packageManager) => (
`version: 2
jobs:
  build:
    docker:
      - image: circleci/node:10
    working_directory: ~/gatsby-site
    steps:
      - checkout
      - run:
          name: Install Dependencies
          command: ${packageManager === 'yarn' ? 'yarn' : 'npm i'}
      - run:
          name: Gatsby Build
          command: ${packageManager === 'yarn' ? 'yarn' : 'npm run'} build
      - run:
          name: deploy
          command: npx deploy-ftp
`)


const cli = meow(`
	Usage
		$ deploy

	Options
		--addConfig, -a Add config for circleci
		--packageManager, -p Specify wich package manager dp you want to use with circleci. Default is yarn

	Examples
		$ deploy --addConfig --useNpm
		$ deploy
`, {
	flags: {
		addConfig: {
			type: 'boolean',
			alias: 'a'
		},
		packageManager: {
			type: 'string',
			alias: 'p',
			default: 'yarn'
		},
	}
});


if (cli.flags.addConfig) {
	console.log('Adding config...')
	if (!fs.existsSync(`${process.cwd()}/.circleci`)) {
		fs.mkdir(`${process.cwd()}/.circleci`, (err) => {
			if (err) {
				return console.error(err);
			}
		});
	}
	fs.writeFile(`${process.cwd()}/.circleci/config.yml`, createCircleciConfig(cli.flags.packageManager), (err) => {
		if (err) throw err;
		console.log('Done. Config was successfully created. Now you need to create circleci project and push changes to your remote repo.');
	})
}
else deploy();

console.log(cli.flags)