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

        /************* PO F2-F15 ************/
        'features/PO\ F2\ Search\ for\ Organizations.feature',
        'features/PO\ F3\ Create\ an\ Organization.feature',
        'features/PO\ F4\ Edit\ Organization\ Information.feature',
        'features/PO\ F5\ Delete\ Organization.feature',
        'features/PO\ F6\ Curator\ review\ of\ a\ Pending\ Organization.feature',
        'features/PO\ F7\ Create\ Organization\ Family\ Name.feature',
        'features/PO\ F7\ Edit\ Organization\ Family\ Name.feature',
        'features/PO\ F7\ Search\ Organization\ Family\ Name.feature',
        'features/PO\ F8\ Associate\ an\ Organization\ with\ a\ Family.feature',
        'features/PO\ F9\ Search\ for\ Persons.feature',
        'features/PO\ F10\ Create\ a\ Person\ Record.feature',
        'features/PO\ F11\ Edit\ Person\ Information.feature',
        'features/PO\ F12\ Delete\ Person\ record.feature',
        'features/PO\ F13 Curator\ review\ of\ a\ Pending\ Person\ Record.feature',
        'features/PO\ F14\ Change\ a\ Person\'s\ Affiliated\ Organization.feature',
        'features/PO\ F15\ Add\ Organization\ Alias.feature'

    ],

    cucumberOpts: {
        require: ['features/step_definitions/*.js', 'features/support/*.js'],
        format: 'json:tests/features/output/*.json',
        format: 'pretty',
        resultJsonOutputFile: 'true'
    }
};

