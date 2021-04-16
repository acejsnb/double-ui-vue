module.exports = {
    plugins: [
        require('precss'),
        require('autoprefixer'),
        require('cssnano')
    ]
};

// module.exports = ({ env }) => ({
//     plugins: [
//         require('autoprefixer'),
//         env === 'production' ? require('cssnano')() : null
//     ]
// });
