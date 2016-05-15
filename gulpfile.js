var gulp = require('gulp');
var os = require('os');

var EXPRESS_PORT = 4001;
var EXPRESS_ROOT = __dirname;
var LIVERELOAD_PORT = 35729;

var getNetworkInformation = function(){
    console.log("Starting express on local host: " + EXPRESS_PORT);
    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces)
    {
        for (var k2 in interfaces[k])
        {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal)
            {
                addresses.push(address.address);
            }
        }
    }

    return addresses;
}

function startExpress(){
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')());
    app.use(express.static(EXPRESS_ROOT));
    app.listen(EXPRESS_PORT);
}

var lr;

function startLiveReload(){
    lr = require('tiny-lr')();
    lr.listen(LIVERELOAD_PORT);
}

function notifyLivereload(event){
    var fileName = require('path').relative(EXPRESS_ROOT, event.path);
    console.log("Change.");

    lr.changed({
        body: {
        files: [fileName]
    }
    })
}

gulp.task('default', function()
{
    console.log("Current network information")
    console.log(getNetworkInformation());
    startExpress();
    startLiveReload();
    gulp.watch(['*.html', 'css/*.css', 'js/**/*'], notifyLivereload);
})
