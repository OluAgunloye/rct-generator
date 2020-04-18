// https://medium.com/@ole.ersoy/unit-testing-commander-scripts-with-jest-bc32465709d6
const fs = require('fs');
const { join } = require('path');
const { exec } = require('child_process');

const BASE_PATH = join(__dirname, '../src');

test('On create component without --screen', async () => {
  let result = await cli(['generate', 'component', 'test-component']);

  const baseComponentPath = join(BASE_PATH, 'components/TestComponent');

  expect(fs.existsSync(baseComponentPath)).toBe(true);
  expect(fs.existsSync(join(baseComponentPath, 'index.tsx'))).toBe(true);
  expect(fs.existsSync(join(baseComponentPath, 'styles.ts'))).toBe(true);

  fs.rmdirSync(BASE_PATH, { recursive: true });
});

// TODO: add test for generate component with --screen
test('On create component with --screen', async () => {
  let result = await cli(['generate', 'component', 'test-comp', '--screen', 'test-scr']);

  const baseComponentPath = join(BASE_PATH, 'screens', 'TestScr', 'TestComp');

  expect(fs.existsSync(baseComponentPath)).toBe(true);
  expect(fs.existsSync(join(baseComponentPath, 'index.tsx'))).toBe(true);
  expect(fs.existsSync(join(baseComponentPath, 'styles.ts'))).toBe(true);

  fs.rmdirSync(BASE_PATH, { recursive: true });
});

// TODO: add test for generate screen

function cli(args, cwd) {
  return new Promise(resolve => {
    exec(`node ${join(__dirname, '../index')} ${args.join(' ')}`,
      { cwd },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr
        })
      })
  })
}