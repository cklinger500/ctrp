/**
 * Author: Shamim Ahmed
 * Date: 07/15/2016
 * Gulp file to catch error
 */

var plumber = require('gulp-plumber');

var gulpfile = function(){

    this.continueOnError = function (error) {
        console.log(error);
        this.emit('end');
    };
};

module.exports = gulpfile;