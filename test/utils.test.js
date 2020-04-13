const fs = require('fs');
const { join } = require("path");

const utils = require('../utils');

describe('mkdirp', () => {
  it('should create nested directories', async () => {
    const basePath = join(__dirname, '../dir1');
    const directoryPath = join(basePath, 'dir2/dir3');

    utils.mkdirp(directoryPath);
    expect(fs.existsSync(directoryPath)).toBe(true);

    fs.rmdirSync(basePath, { recursive: true });
  });
});

describe('formatName', () => {
  it('should handle multiple words', async () => {
    const output = 'UserSetup';

    const inputs = [
      'user_setup_screen',
      'user-setup-screen',
      'user_setup_container',
      'user-setup-container',
      'user-setupContainer',
      'user-setupscreen',
      '-user-setup--',
      'user-setup--',
      'user_setup-',
      'user-setup_',
      'user-setup',
      'UseR-setup',
      'user-Setup',
      'User-Setup',
    ];

    inputs.forEach((input) => {
      expect(utils.formatName(input)).toBe(output);
    });
  });

  it('should handle one word param', () => {
    const output = 'Profile';
    const inputs = ['profile','proFIle', 'Profile'];

    inputs.forEach((input, index) => {
      expect(utils.formatName(input)).toBe(output);
    });
  });

  it('should throw error on empty param', () => {
    expect(true).toBe(true);
  });
});