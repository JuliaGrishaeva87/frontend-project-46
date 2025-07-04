#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/genDiffCal.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const option = program.opts();
    console.log(genDiff(filepath1, filepath2, option.format));
  });

program.parse();
