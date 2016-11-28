/**
 * Author: Shamim Ahmed
 * Author: Shilpi Singh
 * Date: 10/14/2015
 * Desc: Project related methods
 */

var fs = require('fs');
var junit = require('cucumberjs-junitxml');
var reportDir = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/features/output';
//var reportFilePath = reportDir + '/cucumber-test-results.json';

var monthMap = {
    "1": "Jan", "2": "Feb", "3": "Mar", "4": "Apr", "5": "May", "6": "Jun",
    "7": "Jul", "8": "Aug", "9": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"
};

var currentDate = new Date(),
    currentHoursIn24Hour = currentDate.getHours(),
    currentTimeInHours = currentHoursIn24Hour>12? currentHoursIn24Hour-12: currentHoursIn24Hour,
    totalDateString = currentDate.getDate()+'-'+ monthMap[currentDate.getMonth()+1]+ '-'+(currentDate.getYear()+1900) +
        '-'+ currentTimeInHours+'h-' + currentDate.getMinutes()+'m' + currentDate.getSeconds()+'s';

var reportFilePath = reportDir + '/cucumber-test-results-'+totalDateString+'.json';
var testResult = [];

var reporterHooks = function() {
    // save feature output
    this.registerHandler('BeforeFeature', function(event, callback) {
        var feature = event.getPayloadItem('feature');
        featureNameToRun = feature.getName();
        console.log('******** Name of feature ******');
        console.log(featureNameToRun);
        var currentFeatureId = feature.getName().replace(/ /g, '-');
        var featureOutput = {
            id: currentFeatureId,
            name: feature.getName(),
            description: feature.getDescription(),
            line: feature.getLine(),
            keyword: feature.getKeyword(),
            uri: feature.getUri(),
            elements: []
        };

        testResult.push(featureOutput);

        callback();
    });

    // save scenario output
    this.registerHandler('BeforeScenario', function(event, callback) {
        var scenario = event.getPayloadItem('scenario');
        var currentScenarioId = testResult[testResult.length - 1].id + ';' + scenario.getName().replace(/ /g, '-');
        var scenarioOutput = {
            id: currentScenarioId,
            name: scenario.getName(),
            description: scenario.getDescription(),
            line: scenario.getLine(),
            keyword: scenario.getKeyword(),
            steps: []
        };

        testResult[testResult.length - 1].elements.push(scenarioOutput);

        callback();
    });

    // save steps output
    this.registerHandler('StepResult', function(event, callback) {
        var stepResult = event.getPayloadItem('stepResult');
        var steps = stepResult.getStep();

        var stepOutput = {
            name: steps.getName(),
            line: steps.getLine(),
            keyword: steps.getKeyword(),
            result: {},
            match: {}
        };
        var resultStatus;
        var attachments;

        if (stepResult.isSuccessful()) {
            resultStatus = 'passed';
            if (stepResult.hasAttachments()) {
                attachments = stepResult.getAttachments();
            }
            stepOutput.result.duration = stepResult.getDuration();
        } else if (stepResult.isPending()) {
            resultStatus = 'pending';
            stepOutput.result.error_message = undefined;
        } else if (stepResult.isSkipped()) {
            resultStatus = 'skipped';
        } else if (stepResult.isUndefined()) {
            resultStatus = 'undefined';
        } else {
            resultStatus = 'failed';
            var failureMessage = stepResult.getFailureException();
            if (failureMessage) {
                stepOutput.result.error_message = (failureMessage.stack || failureMessage);
            }
            if (stepResult.hasAttachments()) {
                attachments = stepResult.getAttachments();
            }
            stepOutput.result.duration = stepResult.getDuration();
        }

        stepOutput.result.status = resultStatus;

        if (attachments) {
            attachments.syncForEach(function(attachment) {
                // TODO: formatter.embedding
            });
        }

        var rlen = testResult.length - 1;
        testResult[rlen].elements[testResult[rlen].elements.length - 1].steps.push(stepOutput);

        callback();
    });

    // output testResult
    this.registerHandler('AfterFeatures', function(event, callback) {
        var xml = junit(JSON.stringify(testResult), { indent: '    ' });
        var file = fs.openSync(reportFilePath, 'w+');
        fs.writeSync(file, JSON.stringify(testResult));
        /*
        if (xml.nodeType == 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }
        // do children
        if (xml.hasChildNodes()) {
            for(var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof(obj[nodeName]) == 'undefined') {
                    obj[nodeName] = xmlToJson(item);
                } else {
                    if (typeof(obj[nodeName].push) == 'undefined') {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
        //return obj;   */
        callback();
    });

    //// On Error output testResult
    //this.registerHandler('onError', function(event, callback) {
    //    var xml = junit(JSON.stringify(testResult), { indent: '    ' });
    //    var file = fs.openSync(reportFilePath, 'w+');
    //    fs.writeSync(file, JSON.stringify(testResult));
    //    callback();
    //});
};

module.exports = reporterHooks;