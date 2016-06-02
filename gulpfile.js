"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************
var gulp        = require("gulp"),
    runSequence = require("run-sequence"),
    del         = require('del'),
    browserSync = require('browser-sync').create();

var Builder = require('systemjs-builder');

var builder = new Builder('./source', './system-config.js');

var output = 'dist/';

gulp.task("build", ["clean"], function(cb) {
    builder.buildStatic('./source/app', './dist/all-in-one.js', {
        sourceMaps: true,
        lowResSourceMaps: true
    }).then(function () {
        console.log('Build complete');
        cb();
    }).catch(function (err) {
            console.log('Build error');
            console.log(err);
        });
});

gulp.task("build-module", ["build"], function(cb) {

    Promise.all([builder.trace('app'), builder.trace('lib')])
        .then(function (trees) {
            for (var len = trees.length; len--;) {
                var t = trees[len];
                for (var k in t) {
                    if (t[k].name.endsWith('.ts')) {
                        var n = t[k].name;
                        t[k].name = n.substring(0, n.length - 3);
                    }
                    for (var depK in t[k].depMap) {
                        var depV = t[k].depMap[depK];
                        if (depV.endsWith('.ts')) {
                            t[k].depMap[depK] = depV.substring(0, depV.length - 3);
                        }
                    }
                }
            }
            var commonTree = builder.intersectTrees(trees[0], trees[1]);
            return Promise.all([
                builder.bundle(builder.subtractTrees(trees[0], commonTree), output + 'app.js', {
                    minify: false,
                    lowResSourceMaps: true,
                    sourceMaps: true
                }),
                builder.bundle(trees[1], output + 'lib.js', {
                    sourceMaps: true,
                    lowResSourceMaps: true
                }).then(function () {
                    console.log('Build complete');
                    cb();
                })
            ]);
        }).catch(function (err) {
            console.log('Build error');
            console.log(err);
    });
});
gulp.task('clean', function () {
    // Delete Temp Files & Folders
    del(['dist']);

});
gulp.task("watch", ["build-module"], function () {
    browserSync.init({
        server: "."
    });

    gulp.watch([ "source/**/**.ts"], ["build"]);
    gulp.watch("dist/*.js").on('change', browserSync.reload);
});