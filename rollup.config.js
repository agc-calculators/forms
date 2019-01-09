// rollup.config.js
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import minify from 'rollup-plugin-babel-minify';
import resolve from 'rollup-plugin-node-resolve';
import copy from 'rollup-plugin-copy';

let outputs = [];
let jsonPlugin = json({
    // All JSON files will be parsed by default,
    // but you can also specifically include/exclude files
    exclude: 'node_modules/**',
    // for tree-shaking, properties will be declared as
    // variables, using either `var` or `const`
    preferConst: true,
    indent: '  ',
    compact: true,
    // generate a named export for every property of the JSON object
    namedExports: false
})

let packages = ['calving-date']
let names = ['CalvingDate']

packages.forEach( (pkg, idx) => {
    let resources = {};

    resources[`packages/${pkg}/schema.json`] = `packages/${pkg}/dist/schema.json`
    resources[`packages/${pkg}/uischema.json`] = `packages/${pkg}/dist/uischema.json`
    resources[`packages/${pkg}/lang/en.json`] = `packages/${pkg}/dist/lang/en.json`
    resources[`packages/${pkg}/lang/es.json`] = `packages/${pkg}/dist/lang/es.json`
    resources[`packages/${pkg}/lang/ch.json`] = `packages/${pkg}/dist/lang/ch.json`
    resources[`packages/${pkg}/lang/fr.json`] = `packages/${pkg}/dist/lang/fr.json`
    resources[`packages/${pkg}/lang/gr.json`] = `packages/${pkg}/dist/lang/gr.json`

    outputs.push({
        input: `packages/${pkg}/index.js`,
        output: {
          file: `packages/${pkg}/dist/agc-${pkg}.js`,
          format: 'iife',
          name: names[idx]
        },      
        plugins: [
            babel({
                exclude: 'node_modules/**'
            }),
            resolve(),
            jsonPlugin,
            copy(resources)
        ]
    })
    outputs.push({
        input: `packages/${pkg}/index.js`,
        output: {
          file: `packages/${pkg}/dist/agc-${pkg}.min.js`,
          format: 'iife',
          name: names[idx]
        },      
        plugins: [
            babel({
                exclude: 'node_modules/**'
            }),
            resolve(),
            minify({comments: false}),
            jsonPlugin
        ]
    })
})

export default outputs;
