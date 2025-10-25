const less = require('less');
const fs = require('fs');
const path = require('path');

module.exports = class {
  data() {
    return {
      permalink: '/css/main.css',
      eleventyExcludeFromCollections: true
    };
  }

  async render() {
    const lessFile = path.join(__dirname, 'main.less');
    const lessInput = fs.readFileSync(lessFile, 'utf8');

    const result = await less.render(lessInput, {
      filename: lessFile,
      compress: process.env.NODE_ENV === 'production',
      sourceMap: process.env.NODE_ENV !== 'production' ? {
        sourceMapFileInline: false,
        outputSourceFiles: true
      } : undefined
    });

    return result.css;
  }
};
