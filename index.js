#!/usr/bin/env node
"use strict";

const { Command } = require('commander');
const { join } = require('path');
const { existsSync } = require('fs');

const packageJson = require('./package.json');

const { mkdirp, getBasePath, generateTemplate, formatName } = require('./utils');

const program = new Command();

program
  .version(packageJson.version)
  .option('--basePath <path>', 'Set source code base path')
  .option('-s, --screen <name>', 'Generate component for an existing screen.')

program
  .command('generate [type] [name]')
  .alias('g')
  .description('Generate screen or component.')
  .action((type, name) => {
    let basePath = getBasePath(program.basePath);
    const formattedName = formatName(name);

    switch (type) {
      case 's':
      case 'screen':
        mkdirp(basePath = join(basePath, 'screens', formattedName));

        generateTemplate(join(basePath, `${formattedName}.component.tsx`), 'component.tsx', formattedName + 'Component');
        generateTemplate(join(basePath, `${formattedName}.container.tsx`), 'container.tsx', formattedName);
        generateTemplate(join(basePath, 'index.ts'), 'screen.ts', formattedName);
        generateTemplate(join(basePath, 'styles.ts'), 'styles.ts');

        break;

      case 'c':
      case 'component':
        if (program.screen) {
          if (!existsSync(join(basePath, 'screens', formatName(program.screen)))) {
            console.warn(`[Warning] Screen ${program.screen} not found. Component has been created regardless in ${basePath}. Please run rct-generator generate screen ${program.screen}`);  
          }

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
