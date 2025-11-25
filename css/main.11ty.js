import less from "less";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class CssTemplate {
  data() {
    return {
      permalink: '/css/main.css',
      eleventyExcludeFromCollections: true
    };
  }

  async render() {
    const lessFile = join(__dirname, 'main.less');
    const lessInput = readFileSync(lessFile, 'utf8');
    const isProduction = process.env.NODE_ENV === 'production';

    const sourceMapOptions = isProduction ? undefined : {
      sourceMapFileInline: false,
      outputSourceFiles: true
    };

    const result = await less.render(lessInput, {
      filename: lessFile,
      compress: isProduction,
      sourceMap: sourceMapOptions
    });

    return result.css;
  }
}
