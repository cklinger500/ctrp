var HtmlReporter = require('protractor-html-screenshot-reporter');
var path = require('path');
var databaseConnection = require('./features/support/databaseConnection.js');
var eventsPG = require('events');
var fs = require('fs');
var junit = require('cucumberjs-junitxml');
var testConfiguration = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testConfig/';

exports.config = {

    framework: 'cucumber',
    //framework: 'jasmine2',

    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName' : 'firefox',
        shardTestFiles: true,
        maxInstances: 6

    },

      baseUrl: 'http://ctrp-ci.nci.nih.gov/ctrp/',
//    baseUrl: 'http://localhost/ctrp/',
//    baseUrl: 'http://ctrp-qa.ncifcrf.gov/ctrp/',

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

        /************* PAS Features ************/
        'features/PAS\ F01\ Add\ and\ Edit\ Trial\ Descriptions.feature',
        'features/PAS\ F02\ Add\ and\ Edit\ Trial\ Design.feature',
        'features/PAS\ F04\ Outcome\ Measures.feature',
        'features/PAS\ F06\ Associated\ Trials.feature',

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
        //  tags: '@runthis'
        /*     "@runThat",
         resultJsonOutputFile: 'true',
         tags: '@runthis'
         /*     "@runThat",
         "~@ignoreThis"]*/// or summary
        // tags: '@runthis'
        //    tags: '@runthis'
        /*     "@runThat",
         "~@ignoreThis"]*/// or summary
    }
};

