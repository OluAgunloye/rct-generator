const { existsSync, mkdirSync, writeFileSync, readFileSync } = require("fs");
const { join } = require("path");

const _replaceAll = (str, replacement) => {
  const delimiter = '__NAME__';
  return str.replace(
    new RegExp(delimiter, "g"),
    replacement
  );
};

const _toPascalCase = (str) => {
  return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
};

const formatName = (name) => {
  const delimiter = /-|_/;
  const extra = /container|screen/i;
  return name.replace(extra, '').split(delimiter).map(_toPascalCase).join('');
};

const generateTemplate = (destination, templateSrc, replacement) => {
  const template = readFileSync(join(__dirname, '..', 'templates', templateSrc), 'utf8');
  const content = replacement ? _replaceAll(template, replacement) : template;
  writeFileSync(destination, content);
};

const mkdirp = (path) => {
  let currentPath = process.cwd();

  path.replace(currentPath + '/', '').split('/').forEach(dir => {
    currentPath += `/${dir}`;

    if (!existsSync(currentPath)) {
      mkdirSync(currentPath);
    }
  });
};

module.exports = { mkdirp, generateTemplate, formatName };
