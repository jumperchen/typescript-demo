tsconfig = require('./tsconfig.json')
delete tsconfig.compilerOptions.target
delete tsconfig.compilerOptions.moduleResolution
System.config({
  baseURL: "./",
  defaultJSExtensions: false,
  transpiler: "typescript",
  typescriptOptions: tsconfig.compilerOptions,

  packages: {
    "": {
      "defaultExtension": "ts",
    }
  },
  map: {
    "typescript": "./node_modules/typescript/lib/typescript.js"
  }
});