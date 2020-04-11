const { existsSync, mkdirSync, writeFileSync, readFileSync } = require('fs');
const { Command } = require('commander');
const { join } = require('path');
const program = new Command();
program.version('1.0.0');

program
  .command('generate <type> [name]')
  .description('clone a repository into a newly created directory')
  .action((type, name) => {
    console.log('clone command called', type, name);

    const componentNameDelimiter = '__NAME__';
    const StylesContent = readFileSync(join(__dirname, 'templates', 'styles.ts'), 'utf8');
    const ComponentContent = readFileSync(join(__dirname, 'templates', 'component.tsx'), 'utf8');
    const ContainerContent = readFileSync(join(__dirname, 'templates', 'container.tsx'), 'utf8');
    const indexContent = readFileSync(join(__dirname, 'templates', 'screen.tsx'), 'utf8');
    const formattedName = name.replace(/component/i, '').charAt(0).toUpperCase() + name.substr(1).toLowerCase();
    const componentsDestination = join(__dirname, 'components');
    const screensDestination = join(__dirname, 'screens');

    switch (type){
      case 'screen':
        if (!existsSync(screensDestination)) {
          mkdirSync(screensDestination);
        }
        if (!existsSync(join(screensDestination, formattedName))) {
          mkdirSync(join(screensDestination, formattedName));
        }

        writeFileSync(join(screensDestination, formattedName, `${formattedName}.container.tsx`), ContainerContent.replace(
          new RegExp(componentNameDelimiter, "g"),
          formattedName
        ));
        writeFileSync(join(screensDestination, formattedName, `${formattedName}.component.tsx`), ComponentContent.replace(
          new RegExp(componentNameDelimiter, "g"),
          formattedName
        ));
        writeFileSync(join(screensDestination, formattedName, 'styles.ts'), StylesContent);
        writeFileSync(join(screensDestination, formattedName, 'index.ts'), indexContent.replace(
          new RegExp(componentNameDelimiter, "g"),
          formattedName
        ));
        break;
      case 'component':
        if (!existsSync(componentsDestination)) {
          mkdirSync(componentsDestination);
        }
        if (!existsSync(join(componentsDestination, formattedName))) {
          mkdirSync(join(componentsDestination, formattedName));
        }
        
        writeFileSync(
          join(componentsDestination, formattedName, "index.tsx"),
          ComponentContent.replace(
            new RegExp(componentNameDelimiter, "g"),
            formattedName
          )
        );

        writeFileSync(join(componentsDestination, formattedName, 'styles.ts'), StylesContent);
        break;
      default:
        break;
    }
  });


program.parse(process.argv);