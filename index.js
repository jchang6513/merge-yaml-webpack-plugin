const fs = require('fs');
const yaml = require('js-yaml');

class MergeYamlWebpackPlugin {
  constructor(options) {
    options = Object.assign({
      fileName: '[name].yml',
      name: 'result',
      root: false
    }, options)
    if (!options.files || !options.files.length) {
        throw new Error('MergeYamlWebpackPlugin: option files is required and should not be empty');
    }
    this.settings = options;
  }

  mergeFiles() {
    const { fileName, outputPath, root, files } = this.settings;
    let datas = {}
    files.forEach((file) => {
      const data = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
      datas = { ...datas, ...data };
    })

    const result = (root) ? { [root]: datas } : datas;

    fs.writeFile(`${outputPath}/${fileName}`, yaml.safeDump(result), (err) => {
      if (err) { console.log(err); }
    });
  }

  apply(compiler) {
    let compileLoopStarted = false;
    compiler.hooks.emit.tap('MergeYamlWebpackPlugin', () => {
      if (!compileLoopStarted) {
        compileLoopStarted = true;
        this.mergeFiles();
      }
    });
    compiler.hooks.afterEmit.tap('MergeYamlWebpackPlugin', () => {
      compileLoopStarted = false;
    });
  }
}

module.exports = MergeYamlWebpackPlugin;
