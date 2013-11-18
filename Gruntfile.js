var path = require('path');
var localify = require('./src/dev/localify');

var config = {};

var APPS = [
  'maze',
  'turtle'
];

// Parse options from environment.
var MINIFY = (process.env.MOOC_MINIFY === '1');
var LOCALIZE = (process.env.MOOC_LOCALIZE === '1');

var DIST_BROWSERIFIED = (MINIFY ? 'uglify:browserified' : 'copy:browserified');

var LOCALES = (LOCALIZE ? [
  'af_za',
  'ar_sa',
  'az_az',
  'bn_bd',
  'ca_es',
  'cs_cz',
  'da_dk',
  'de_de',
  'el_gr',
  'en_us',
  'en_ploc',
  'es_es',
  'fa_ir',
  'fi_fi',
  'fil_ph',
  'fr_fr',
  'he_il',
  'hi_in',
  'hu_hu',
  'id_id',
  'is_is',
  'it_it',
  'ja_jp',
  'ko_kr',
  'ms_my',
  'my_mm',
  'nl_nl',
  'no_no',
  'pl_pl',
  'pt_br',
  'pt_pt',
  'ro_ro',
  'ru_ru',
  'sq_al',
  'sr_sp',
  'sv_se',
  'ta_in',
  'th_th',
  'tr_tr',
  'uk_ua',
  'ur_pk',
  'vi_vn',
  'zh_cn',
  'zh_tw'
] : [
  'en_us',
  'en_ploc'
]);

config.clean = {
  all: ['build', 'dist']
};

config.copy = {
  src: {
    files: [
      {
        expand: true,
        cwd: 'src/',
        src: ['**/*.js'],
        dest: 'build/js'
      }
    ]
  },
  browserified: {
    files: [
      {
        expand: true,
        cwd: 'build/browserified',
        src: ['**/*.js'],
        dest: 'dist/js'
      }
    ]
  },
  static: {
    files: [
      {
        expand: true,
        cwd: 'static/',
        src: ['**'],
        dest: 'dist/media'
      },
      {
        expand: true,
        cwd: 'lib/blockly/media',
        src: ['**'],
        //TODO: Would be preferrable to separate Blockly media.
        dest: 'dist/media'
      }
    ]
  }
};

config.sass = {
  all: {
    options: {
      outputStyle: (MINIFY ? 'compressed' : 'nested')
    },
    files: {
      'dist/css/common.css': 'style/common.scss'
    }
  }
};
APPS.forEach(function(app) {
  var src = 'style/' + app + '/style.scss';
  var dest = 'dist/css/' + app + '.css';
  config.sass.all.files[dest] = src;
});

config.pseudoloc = {
  all: {
    srcBase: 'i18n',
    srcLocale: 'en_us',
    destBase: 'build/i18n',
    pseudoLocale: 'en_ploc'
  }
};

config.messages = {
  all: {
    locales: LOCALES,
    srcBases: ['i18n', 'build/i18n'],
    destBase: 'build/locale'
  }
};

config.symlink = {
  locale: {
    src: 'build/locale/en_us',
    dest: 'build/locale/current'
  }
};

config.ejs = {
  all: {
    srcBase: 'src',
    destBase: 'build/js'
  }
};

config.browserify = {};
APPS.forEach(function(app) {
  LOCALES.forEach(function(locale) {
    var src = 'build/js/' + app + '/main.js';
    var dest = 'build/browserified/' + locale + '/' + app + '.js';
    var files = {};
    files[dest] = [src];
    config.browserify[app + '_' + locale] = {
      files: files,
      options: {
        transform: [localify(locale)]
      }
    };
  });
});

config.concat = {};
LOCALES.forEach(function(locale) {
  config.concat['vendor_' + locale] = {
    nonull: true,
    src: [
      'lib/blockly/blockly_compressed.js',
      'lib/blockly/blocks_compressed.js',
      'lib/blockly/javascript_compressed.js',
      'lib/blockly/' + locale + '.js'
    ],
    dest: 'dist/js/' + locale + '/vendor.js'
  };
});

config.express = {
  server: {
    options: {
      port: 8000,
      bases: path.resolve(__dirname, 'dist'),
      server: path.resolve(__dirname, './src/dev/server.js'),
      livereload: true
    }
  }
};

var uglifiedFiles = {};
APPS.forEach(function(app) {
  LOCALES.forEach(function(locale) {
    var relname = locale + '/' + app + '.js';
    var src = 'build/browserified/' + relname;
    var dest = 'dist/js/' + relname;
    uglifiedFiles[dest] = [src];
  });
});
config.uglify = {
  browserified: {
    files: uglifiedFiles
  }
};

config.watch = {
  js: {
    files: ['src/**/*.js'],
    tasks: ['copy:src', 'browserify', DIST_BROWSERIFIED]
  },
  style: {
    files: ['style/**/*.scss', 'style/**/*.sass'],
    tasks: ['sass']
  },
  content: {
    files: ['static/**/*'],
    tasks: ['copy']
  },
  vendor_js: {
    files: ['lib/**/*.js'],
    tasks: ['concat']
  },
  ejs: {
    files: ['src/**/*.ejs'],
    tasks: ['ejs', 'browserify', DIST_BROWSERIFIED]
  },
  messages: {
    files: ['i18n/**/*.json'],
    tasks: ['pseudoloc', 'messages', 'browserify', DIST_BROWSERIFIED]
  },
  dist: {
    files: ['dist/**/*'],
    options: {
      livereload: true
    }
  }
};

config.jshint = {
  options: {
    node: true,
    browser: true,
    globals: {
      Blockly: true,
      //TODO: Eliminate the globals below here.
      BlocklyApps: true,
      Maze: true,
      Turtle: true,
    }
  },
  all: [
    'Gruntfile.js',
    'tasks/**/*.js',
    'src/**/*.js',
    'test/**/*.js'
  ]
};

config.mochaTest = {
  all: {
    options: {
      reporter: 'spec'
    },
    src: ['test/**/*.js']
  }
};

config.release = {
  options: {
    folder: 'dist',
    tagName: 'v<%= version %>',
  }
};

module.exports = function(grunt) {

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-symlink');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-release-bbloom');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.loadTasks('tasks');

  grunt.registerTask('build', [
    'pseudoloc',
    'messages',
    'symlink:locale',
    'copy:src',
    'ejs',
    'browserify',
    DIST_BROWSERIFIED,
    'copy:static',
    'concat',
    'sass'
  ]);

  grunt.registerTask('rebuild', ['clean', 'build']);
  grunt.registerTask('dev', ['express:server', 'watch']);
  grunt.registerTask('test', ['jshint', 'mochaTest']);

  grunt.registerTask('default', ['rebuild', 'test']);

};
