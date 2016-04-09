var path = require('path');

module.exports = {
    entry: {
      'app': path.resolve(__dirname, 'src/es2015-webpack/boot.js')
    },
    output: {
      path: 'src/bundle',
      filename: '[name].js',
      chunkFilename: '[id].js'
    },
    modules: ["node_modules"],
    // (was split into `root`, `modulesDirectories` and `fallback` in the old options)
    // In which folders the resolver look for modules
    // relative paths are looked up in every parent folder (like node_modules)
    // absolute paths are looked up directly
    // the order is respected

    descriptionFiles: ["package.json"],
    // These JSON files are read in directories

    // mainFields: ["main", "browser"],
    // These fields in the description files are looked up when trying to resolve the package directory

    mainFiles: [path.resolve(__dirname, "src/es2015-webpack")],
    // These files are tried when trying to resolve a directory

    // aliasFields: ["browser"],
    // These fields in the description files offer aliasing in this package
    // The content of these fields is an object where requests to a key are mapped to the corresponding value

    extensions: [".js", ".json"],
    // These extensions are tried when resolving a file

    enforceExtension: false,
    // If false it will also try to use no extension from above

    moduleExtensions: ["-loader"],
    // These extensions are tried when resolving a module

    enforceModuleExtension: false,
    // If false it's also try to use no module extension from above

    alias: {
        // jquery: path.resolve(__dirname, "vendor/jquery-2.0.0.js")
    }
    // These aliasing is used when trying to resolve a module
}