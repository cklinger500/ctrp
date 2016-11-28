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
        /************* PA Features ************/
        'features/PAA\ F01\ Add\ and\ Edit\ General\ Trial\ Details.Feature',
        'features/PAA\ F02\ Add\ and\ Edit\ NCI\ Specific\ Information.Feature',
        'features/PAA\ F03\ Add\ and\ Edit\ Regulatory\ Information.Feature',
        'features/PAA\ F04\ Add\ and\ Edit\ Regulatory\ Information\ Human\ Subject\ Safety.Feature',
        'features/PAA\ F05\ Add\ and\ Edit\ Regulatory\ Information\ IND-IDE.Feature',
        'features/PAA\ F06\ Add\ and\ Edit\ Trial\ Status.Feature',
        'features/PAA\ F07\ Add\ and\ Edit\ Trial\ Funding.Feature',
        'features/PAA\ F08\ Add\ and\ Edit\ Trial\ Participating\ Sites.Feature',
        'features/PAA\ F09\ Add\ and\ Edit\ Trial\ Collaborators.Feature',
        'features/PAA\ F10\ Add\ and\ Edit\ Trial\ Related\ Documents.Feature'
    ],

    cucumberOpts: {
        require: ['features/step_definitions/*.js', 'features/support/*.js'],
        format: 'json:tests/features/output/*.json',
        format: 'pretty',
        resultJsonOutputFile: 'true'
    }
};

