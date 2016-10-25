var HtmlReporter = require('protractor-html-screenshot-reporter');
var path = require('path');
var databaseConnection = require('./features/support/databaseConnection.js');
var eventsPG = require('events');
var fs = require('fs');
var junit = require('cucumberjs-junitxml');
var testConfiguration = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testConfig/';

exports.config = {

    framework: 'cucumber',

    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName' : 'firefox',
        shardTestFiles: true,
        maxInstances: 3

    },

    baseUrl: 'http://ctrp-ci.nci.nih.gov/ctrp/',

    params: {
        login: {
            user_admin: 'ctrpadmin',
            user_po: 'testercurator'
        }
    },

    onPrepare: function() {
        browser.driver.manage().window().maximize();
        var dbConnect = new databaseConnection();
        getDBConnection = dbConnect.buildDBConnection();
        eventsPG.EventEmitter.defaultMaxListeners = 100;
        var configurationFile;
        console.log('file path'+testConfiguration);
        configurationFile = ''+testConfiguration+'/testSettings.json';
        var configuration = JSON.parse(
            fs.readFileSync(configurationFile)
        );
        console.log(configuration.uiUrl);
        return browser.get(''+configuration.uiUrl+'');
    },

    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: true,
        showColors: true,
        includeStackTrace: true
    },

    allScriptsTimeout: 50000,
    getPageTimeout: 50000,

    specs: [
        /************* PAS Features ************/
        'features/PAS\ F01\ Add\ and\ Edit\ Trial\ Descriptions.feature',
        'features/PAS\ F02\ Add\ and\ Edit\ Trial\ Design.feature',
        'features/PAS\ F04\ Outcome\ Measures.feature',
        'features/PAS\ F06\ Associated\ Trials.feature',

    ],

    cucumberOpts: {
        require: ['features/step_definitions/*.js', 'features/support/*.js'],
        format: 'json:tests/features/output/*.json',
        format: 'pretty',
        resultJsonOutputFile: 'true'
    }
};

