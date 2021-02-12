import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from './.rollup/css-only'; // a modified version of "rollup-plugin-css-only"
import { serve } from './.rollup/serve';
import replace from '@rollup/plugin-replace';
import babel from 'rollup-plugin-babel';

const bundleName = 'bundle';
const bundleFile = `${bundleName}.js`;
const production = !process.env.ROLLUP_WATCH;
const extensions = ['.svelte', '.ts', '.js', '.mjs'];

export default {
    input: 'src/index.ts',
    output: [
        {
            sourcemap: true,
            format: 'iife',
            name: bundleName,
            file: `public/${bundleFile}`,
            plugins: [production && terser()],
        },
    ],
    plugins: [
        svelte({
            preprocess: sveltePreprocess({ sourceMap: !production }),
            compilerOptions: {
                dev: !production,
                customElement: true,
            },
            emitCss: false,
            include: './src/ShadowRoot.svelte',
        }),

        svelte({
            preprocess: sveltePreprocess({ sourceMap: !production }),
            compilerOptions: {
                dev: !production,
            },
            emitCss: true,
            exclude: './src/ShadowRoot.svelte',
        }),

        css({
            output(styles, styleNodes, bundle) {
                const match = production
                    ? `.shadowRoot.innerHTML="`
                    : `.shadowRoot.innerHTML = "`;

                const currentBundle = bundle[bundleFile];
                currentBundle.code = currentBundle.code.replace(
                    match,
                    `${match}<style>${styles}</style>`
                );
            },
        }),

        resolve({
            browser: true,
            dedupe: ['svelte'],
            extensions,
        }),
        commonjs(),
        typescript({
            sourceMap: !production,
            inlineSources: !production,
        }),

        !production && serve(),

        // add transition into shadow dom
        replace({
            '.ownerDocument': '.getRootNode()',
            delimiters: ['', ''],
        }),
        replace({
            '.head.appendChild': '.appendChild',
            delimiters: ['', ''],
        }),
        babel({
            extensions,
            exclude: 'node_modules/**',
            plugins: ['@babel/plugin-proposal-class-properties'],
            presets: [
                [
                    '@babel/preset-env',
                    {
                        // loose: true,
                        // // No need for babel to resolve modules
                        modules: false,
                        targets: {
                            // ! Very important. Target es6+
                            esmodules: true,
                        },
                    },
                ],
                '@babel/preset-typescript',
            ],
        }),
    ],
    watch: {
        chokidar: true,
        clearScreen: false,
        buildDelay: 1000,
    },
};
