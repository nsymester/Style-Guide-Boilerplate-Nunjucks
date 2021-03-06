'use strict';
// =======================================================================
// Gulp Plugins
// =======================================================================
const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

// load all plugins in 'devDependencies' into the variable $
// pattern: include '*' for non gulp files
const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', '*'],
  replaceString: /\bgulp[-.]/,
  rename: {
    'gulp-nunjucks': 'gulpnunjucks',
    'run-sequence': 'runSequence',
    'nunjucks-markdown': 'markdown'
  },
  scope: ['devDependencies']
});

// is this a development build?
const devBuild = process.env.NODE_ENV !== 'production';
const isWin = process.platform === 'win32';

// folders
const folder = {
  src: 'src/',
  build: ''
};

const sassOptions = {
  style: 'nested',
  comments: false
};

const onError = function(err) {
  // $.gutil.beep();
  console.log(err);
};

// fetch command line arguments
const arg = (argList => {
  let arg = {},
    a,
    opt,
    thisOpt,
    curOpt;
  for (a = 0; a < argList.length; a++) {
    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');

    if (opt === thisOpt) {
      // argument value
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;
    } else {
      // argument name
      curOpt = opt;
      arg[curOpt] = null;
    }
  }

  return arg;
})(process.argv);

// =======================================================================
// ENV Vars
// =======================================================================
const dist = 'dist'; //Set this as your target you be compiling into
const src = 'src'; //Set this as the location of your source files
const templates = src + '/templates'; //Set this as the folder that contains your nunjuck files

// =======================================================================
// Index Task (Generate pages from template *.html files.)
// =======================================================================
gulp.task('pages', function() {
  // Gets .html files. see file layout at bottom

  // Create an new nunjuck envroment. This seemed to be the problem for me. Didn't work for me until I specified the FileSystemLoader.
  // The templates folder tells the nunjuck renderer where to find any *.njk files you source in your *.html files.
  const env = new $.nunjucks.Environment(
    new $.nunjucks.FileSystemLoader(templates)
  );
  // all fo the follwing is optional and this will all work just find if you don't include any of it. included it here just in case you need to configure it.
  $.marked.setOptions({
    renderer: new $.marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });

  // This takes the freshley created nunjucks envroment object (env) and passes it to nunjucks-markdown to have the custom tag regestered to the env object.
  // The second is the marked library. anything that can be called to render markdown can be passed here.
  $.markdown.register(env, $.marked);

  //  let data = JSON.parse({ files: getData('markup') });
  let data = { files: getData('markup') };

  return (
    gulp
      .src([templates + '/*.html'])
      // Renders template with nunjucks and marked
      .pipe($.data(data))
      .pipe($.gulpnunjucks.compile('', { env: env }))
      // Uncomment the following if your source pages are something other than *.html.
      // .pipe(rename(function (path) { path.extname=".html" }))
      // output files in dist folder
      .pipe(gulp.dest(dist))
    // .pipe(browserSync.stream())
  );
});

/**
 * @desc browserSync, start the server
 */ gulp.task('browserSync', function() {
  // check for operating system
  // - for WINDOWS 10 use "Chrome"
  // - for MAC OS X use 'Google Chrome'
  const browser = isWin ? 'Chrome' : 'Google Chrome';
  browserSync.init({
    injectChanges: true,
    server: {
      baseDir: './dist'
    },
    browser: browser,
    directory: false
  });
});

/**
 * @desc css task - compile sass to css, compress and add prefixes
 */
gulp.task('css', function() {
  const postCssOpts = [
    $.autoprefixer({ browsers: ['last 2 versions', '> 2%'] })
  ];

  if (!devBuild) {
    console.log('css build ', devBuild);
    sassOptions.style = 'compressed';
    sassOptions.comments = false;
  }

  return gulp
    .src(`${folder.src}/stylesheets/*.scss`)
    .pipe(
      $.plumber({
        errorHandler: onError
      })
    )
    .pipe($.if(devBuild, $.sourcemaps.init()))
    .pipe(
      $.sass({
        outputStyle: sassOptions.style,
        sourceComments: false,
        imagePath: 'images/',
        errLogToConsole: true
      }).on('error', $.util.log)
    )
    .pipe($.postcss(postCssOpts))
    .pipe(
      $.if(
        devBuild,
        $.sourcemaps.write('maps', {
          includeContent: false
        })
      )
    )
    .pipe(gulp.dest('dist/css'))
    .pipe($.size());
});

gulp.task('js', function() {
  return gulp.src(`${folder.src}/scripts/*.js`).pipe(gulp.dest('dist/js'));
});

/**
 * @desc watch - watch for changes
 */
gulp.task('watch', function() {
  // nunjuck changes
  gulp
    .watch(folder.src + '+(templates)/**/*.njk', ['pages'])
    .on('change', browserSync.reload);

  gulp
    .watch(folder.src + '+(templates)/**/*.md', ['pages'])
    .on('change', browserSync.reload);

  gulp
    .watch(folder.src + '+(templates)/**/*.html', ['pages'])
    .on('change', browserSync.reload);

  // css changes
  gulp
    .watch(folder.src + 'stylesheets/*.scss', ['css'])
    .on('change', browserSync.reload);

  // js changes
  gulp
    .watch(folder.src + 'scripts/*.js', ['js'])
    .on('change', browserSync.reload);
});

/**
 * @desc default task
 */
gulp.task('default', function(callback) {
  $.runSequence(['pages', 'css', 'browserSync', 'watch'], callback);
});

// return a json file with list of folders and directories
function getData(folderPath, fileList) {
  let files = fs.readdirSync(`src/templates/${folderPath}`);

  fileList = fileList || [];

  files.forEach(file => {
    let tPath = `${folderPath}/${file}`;
    if (fs.statSync(`src/templates/${tPath}`).isDirectory()) {
      let obj = {
        name: `${file}`,
        type: 'd'
      };
      fileList.push(obj);
      fileList = getData(tPath + '/', fileList);
    } else {
      let obj = {
        name: `${file}`,
        type: 'f'
      };
      fileList.push(obj);
    }
  });

  return fileList;
}
