module.exports = function(wallaby) {
    return {
        files: [
            'src/**/*.+(js|jsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
            'config/**/*.js',
            '!src/**/*.test.js?(x)',
            '!src/**/*.spec.js?(x)'
        ],

        tests: ['src/**/*.test.js?(x)', 'src/**/*.spec.js?(x)'],

        env: {
            type: 'node',
            runner: 'node',
            params: {
                runner: '--harmony'
            }
        },

        compilers: {
            '**/*.js?(x)': wallaby.compilers.babel({ babelrc: true, presets: ['babel-preset-jest'] })
        },

        filesWithNoCoverageCalculated: ['src/serviceWorker.js', 'config/**/*.js'],

        setup: function(wallaby) {
            const jestConfig = require('./package.json').jest;
            delete jestConfig.transform['^.+\\.(js|jsx)$'];
            delete jestConfig.testEnvironment;
            wallaby.testFramework.configure(jestConfig);
        },

        testFramework: 'jest'
    };
};
