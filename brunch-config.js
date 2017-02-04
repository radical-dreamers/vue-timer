module.exports = {
    paths: {
      public: './lib'
    },
    files: {
        javascripts: {
            joinTo: 'index.js'
        },
        templates: {
            joinTo: 'index.js'
        }
    },
    plugins: {
        babel: {
            presets: ['es2015', 'es2016']
        }
    }
};
