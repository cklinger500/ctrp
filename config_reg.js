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
        /************* Registry Features ************/
        'features/Reg\ F01\ Search\ Clinical\ Trials.feature',
        'features/Reg\ F02\ Search\ Persons.feature',
        'features/Reg\ F02\ View\ Persons.feature',
        'features/Reg\ F03\ Search\ Organizations.feature',
        'features/Reg\ F03\ View\ Organizations.feature',
        'features/Reg\ F04\ Register\ Trial\ Study\ Source.feature',
        'features/Reg\ F05\ Register\ Trial\ Protocol\ Identifiers.feature',
        'features/Reg\ F06\ Register\ Trial\ Details.feature',
        'features/Reg\ F07\ Register\ Trial\ Study\ Design.feature',
        'features/Reg\ F08\ Register\ Trial\ Person\ and\ Organization\ Associations.feature',
        'features/Reg\ F09\ Register\ Trial\ FDAAA\ Information.feature',
        'features/Reg\ F10\ Register\ Trial\ Grant\ Information.feature',
        'features/Reg\ F11\ Register\ Trial\ Dates\ and\ Trial\ Status.feature',
        'features/Reg\ F12\ Register\ Trial\ IND\ IDE.feature',
        'features/Reg\ F13\ Register\ Trial\ Documents.feature',
        'features/Reg\ F14\ Register\ Trial\ Review\ and\ Submit.feature',
        'features/Reg\ F15\ Register\ Trial\ Save\ as\ Draft.feature',
        'features/Reg\ F16\ Import\ Trial.feature',
        'features/Reg\ F21\ Verify\ Trial\ Data.feature',
    ],

    cucumberOpts: {
        require: ['features/step_definitions/*.js', 'features/support/*.js'],
        format: 'json:tests/features/output/*.json',
        format: 'pretty',
        resultJsonOutputFile: 'true'
    }
};

