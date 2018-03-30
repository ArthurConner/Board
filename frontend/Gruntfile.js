var winston = require('winston');


winston.emitErrs = true;
//========== winston
var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'debug',
            filename: './logs/grunt.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});
logger.level = 'debug';
logger.info('added transport');
//========== main
module.exports = function(grunt) {

    grunt.initConfig({
       

  
        esformatter: {
            options:  {
                "formatJSX": true, //Duh! that's the default 
                "max_preserve_newlines":2,
"preserve_newlines":true,
                "attrsOnSameLineAsTag": false, // move each attribute to its own line 
                "maxAttrsOnTag": 3, // if lower or equal than 3 attributes, they will be kept on a single line 
                "firstAttributeOnSameLine": true, // keep the first attribute in the same line as the tag 
                "formatJSXExpressions": true, // default true, if false jsxExpressions won't be recursively formatted 
                "JSXExpressionsSingleLine": true, // default true, if false the JSXExpressions might span several lines 
                "alignWithFirstAttribute": true, // do not align attributes with the first tag 
                "spaceInJSXExpressionContainers": " ", // default to one space. Make it empty if you don't like spaces between JSXExpressionContainers 
                "removeSpaceBeforeClosingJSX": false, // default false. if true <React.Something /> => <React.Something/> 
                "closingTagOnNewLine": false, // default false. if true attributes on multiple lines will close the tag on a new line 
                "JSXAttributeQuotes": "", // possible values "single" or "double". Leave it as empty string if you don't want to modify the attributes' quotes 
                "htmlOptions": {
                  // put here the options for js-beautify.html 
                }
              },
            src: ['src/components/*.js','src/actions/*.js','src/reducers/*.js']
          }
    });

    grunt.loadNpmTasks("grunt-esformatter")
 

    grunt.registerTask('default', ['esformatter']);
   
};
