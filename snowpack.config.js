const production = process.env.NODE_ENV === 'production'

const babelOptions = () => {
    return {
        plugins: production
                    ? ['transform-remove-console']
                    : []
    }
}

module.exports = {
    mount: {
        public: '/',
        src: '/dist',
    },
    plugins: [
        ['@snowpack/plugin-svelte', {
            preprocess: require('svelte-preprocess')({
                scss: {
                    prependData: '@import "./src/scss/main.scss";',
                },
                postcss: {
                    plugins: [
                        require('autoprefixer')()
                    ]
                },
                babel: babelOptions()
            })
        }],
        ['@snowpack/plugin-babel', {
            transformOptions: babelOptions()
        }],
        '@snowpack/plugin-dotenv',
        '@snowpack/plugin-sass',
        '@snowpack/plugin-optimize'
    ],
    alias: {
        '~': './src'
    }
}