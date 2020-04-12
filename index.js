#!/usr/bin/env node
"use strict";

const { Command } = require('commander');
const { join } = require('path');

const { mkdirp, generateTemplate, formatName } = require('./utils');

const program = new Command();

program
  .version('1.0.0')
  .option('-s, --screen <name>', 'indicate whether a commponent should be generated for an existing screen')

program
  .command('generate <type> [name]')
  .description('generate useful stuff')
  .action((type, name) => {
    let basePath = process.cwd() + '/src';
    const formattedName = formatName(name);

    switch (type) {
      case 'screen':
        mkdirp(basePath = join(basePath, 'screens', formattedName));

        generateTemplate(join(basePath, `${formattedName}.component.tsx`), 'component.tsx', formattedName + 'Component');
        generateTemplate(join(basePath, `${formattedName}.container.tsx`), 'container.tsx', formattedName);
        generateTemplate(join(basePath, 'index.ts'), 'screen.ts', formattedName);
        generateTemplate(join(basePath, 'styles.ts'), 'styles.ts');
        break;

      case 'component':
        if (program.screen) {
          mkdirp(basePath = join(basePath, 'screens', formatName(program.screen), formattedName));
        } else {
          mkdirp(basePath = join(basePath, 'components', formattedName));  
        }
        
        generateTemplate(join(basePath, 'index.tsx'), 'component.tsx', formattedName);
        generateTemplate(join(basePath, 'styles.ts'), 'styles.ts');
        break;

      default:
        console.log('usage: generate <type> [name]');
        break;
    }

    process.exit(1);
  });

program.parse(process.argv);
