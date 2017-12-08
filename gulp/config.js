var gulp  = require('gulp');
var gutil = require('gulp-util');

var developmentDir = 'build/',
    productionDir  = '../bitrix/templates/test/build/';

var path = {
    dest: gutil.env.env === 'prod' ? productionDir : developmentDir,

    build: {
        html: developmentDir,

        js: 'js/',
        jquery: 'js/jquery/', // jQuery делаем отдельно чтобы подключить его в head

        css: 'css/',

        img: 'img/',
        sprite: 'src/img/',

        fonts: 'fonts/'
    },
    src: {
        html: 'src/*.html',

        jsInternal: 'src/js/internal.js',
        jsExternal: 'src/js/external.js',
        jquery: 'bower_components/jquery/dist/*.*', // jQuery делаем отдельно чтобы подключить его в head

        styleInternal: 'src/style/internal.pcss',
        styleExternal: 'src/style/external.pcss',
        styleInclude: ['src/style/', './bower_components'],

        img: ['src/img/**/*.*', '!src/img/sprite/**/*.*'],
        imgProduction: ['src/img/**/*.*', '!src/img/sprite/**/*.*', '!src/img/inhtml/**/*.*'],
        sprite: 'src/img/sprite/**/*.*',
        svg: 'src/img/svg/',

        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',

        jsInternal: ['src/js/**/*.js', '!src/js/external.js', '!src/js/vendor/**/*.js'],
        jsExternal: ['src/js/external.js', 'src/js/vendor/**/*.js'],

        styleInternal: ['src/style/**/*.pcss', 'src/style/internal.pcss', '!src/style/external.pcss'],
        styleExternal: 'src/style/external.pcss',

        img: 'src/img/**/*.*',

        fonts: 'src/fonts/**/*.*'
    }
};

module.exports = {
    browsersync: {
        server: {
            baseDir: './' + developmentDir
        },
        tunnel: false,
        open: false,
        host: 'localhost',
        port: 3000,
        logPrefix: 'Blank'
    },
    html: {
        src: path.src.html,
        dest: path.build.html
    },
    js: {
        srcInternal: path.src.jsInternal,
        srcExternal: path.src.jsExternal,
        srcJquery: path.src.jquery, // jQuery делаем отдельно чтобы подключить его в head
        dest: path.dest + path.build.js,
        destJquery: path.dest + path.build.jquery
    },
    css: {
        srcInternal: path.src.styleInternal,
        srcExternal: path.src.styleExternal,
        options: {
            includePaths: path.src.styleInclude,
            sourceMap: true,
            errLogToConsole: true
        },
        dest: path.dest + path.build.css
    },
    autoprefixer: {
        browsers: [
            'last 10 versions',
            'IE 8',
            'IE 9',
            '> 3%'
        ]
    },
    images: {
        src: path.src.img,
        srcProduction: path.src.imgProduction,
        dest: path.dest + path.build.img,
        options: {
            // use добавляется в таске
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false,
                convertStyleToAttrs: true
            }],
            interlaced: true
        }
    },
    svg: {
        paths: [
            path.src.svg
        ]
    },
    sprites: {
        imagePath: path.src.sprite,
        spritePath: path.build.sprite
    },
    fonts: {
        src: path.src.fonts,
        dest: path.dest + path.build.fonts
    },
    watch: {
        html: path.watch.html,
        jsInternal: path.watch.jsInternal,
        jsExternal: path.watch.jsExternal,
        cssInternal: path.watch.styleInternal,
        cssExternal: path.watch.styleExternal,
        images: path.watch.img,
        sprites: path.watch.imgSprite,
        fonts: path.watch.fonts
    },
    clean: {
        dest: './' + path.dest
    }
};