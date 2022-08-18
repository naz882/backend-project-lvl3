#!/usr/bin/env node
import { program } from 'commander';
import run from '../src/index.js';
import { cwd } from 'node:process';


program
  .version('1.0')
  .arguments('<websitepath>')
  .description('')
  .option('-o', '--output [type]', 'add path', '/hi')
  .action((websitepath, ) => {
    console.log(run(websitepath, program.opts().output));
  });

program.parse(process.argv);