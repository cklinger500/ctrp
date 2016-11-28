/**
 * Created by singhs10 on 4/27/16.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage = require('../support/projectMethods');
var pg = require('pg');
var fs = require('fs');
var testConfiguration = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testConfig/';
var assert = require('assert');
var moment = require('moment');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var addTrialPage = require('../support/registerTrialPage');

var configurationFile;
configurationFile = '' + testConfiguration + '/testSettings.json';
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
);

var conStringQA = configuration.conStringQADB;
var conStringShilpiLocal = configuration.conStringShilpiLocalDB;
var conStringCI = configuration.conStringCIDB;
var self = this;

var clientQA = new pg.Client(conStringQA);
var clientCI = new pg.Client(conStringCI);
var clientLocal = new pg.Client(conStringShilpiLocal);

var dbConnection = function () {

    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var addTrial = new addTrialPage();
    var self = this;

    if (browser.baseUrl === configuration.baseMainUrlQA) {
        console.log('browser.baseUrl.current qa');
        console.log(browser.baseUrl);
        var client = clientQA;
    }

    if (browser.baseUrl === configuration.baseMainUrl) {
        console.log('browser.baseUrl.current. ci');
        console.log(browser.baseUrl);
        client = clientCI;
    }

    if (browser.baseUrl === configuration.baseMainUrlLocalHost) {
        console.log('browser.baseUrl.current local');
        console.log(browser.baseUrl);
        client = clientLocal;
    }


    this.dbConnectionImportTrial = function (NCTID, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from protocol_id_origins where code = 'NCT'", function (err, protocolIDOrigin) {
            if (err) {
                console.error('error running the Select query to find the protocol ID Origin', err);
                assert.fail(0, 1, 'error running Query.');
            }
            protocolOriginDBID = protocolIDOrigin.rows[0].id;
            client.query("select * from other_ids where protocol_id = '" + NCTID + "'" + " ORDER BY id DESC LIMIT 1", function (err, trialID) {
                if (err) {
                    console.error('error running the Select query to find the protocol ID', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                trialDBID = trialID.rows[0].trial_id;
                client.query("UPDATE other_ids SET protocol_id = 'NCT85' || " + projectFunctions.getRandomInt(1, 1000000) + " where protocol_id = '" + NCTID + "'", function (err) {
                    if (err) {
                        console.error('error running the UPDATE query', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    client.query("SELECT * FROM other_ids where trial_id = " + trialDBID + " and protocol_id_origin_id = " + protocolOriginDBID, function (err, result) {
                        if (err) {
                            console.error('error running the SELECT query', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        console.log('Value of Updated Row: ' + result.rows);
                        console.log('***** Updated NCT Protocol ID is ---- ' + result.rows[0].protocol_id + ' ---- For Trial ID :' + trialDBID + ' ******');
                        client.query("UPDATE trials SET lead_protocol_id = 'cukeScript' || " + projectFunctions.getRandomInt(1, 1000000) + " where id in (" + trialDBID + ")", function (err) {
                            if (err) {
                                console.error('error running the UPDATE query', err);
                                assert.fail(0, 1, 'error running Query.');
                            }
                            client.query("SELECT * FROM trials where id = " + trialDBID, function (err, result) {
                                if (err) {
                                    console.error('error running the SELECT query', err);
                                    assert.fail(0, 1, 'error running Query.');
                                }
                                console.log('Value of Updated Row: ' + result.rows);
                                console.log('***** Updated Lead Protocol ID is ---- ' + result.rows[0].lead_protocol_id + ' ---- For Trial ID :' + trialDBID + ' ******');
                                client.on('end', function () {
                                    console.log("Client was disconnected.")
                                });
                            });
                        });
                    });
                });
            });
        });
    };

    this.dbConnectionImportTrialUpdateNCTId = function (NCTID, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from other_ids where protocol_id = '" + NCTID + "'" + " ORDER BY id DESC LIMIT 1", function (err, trialID) {
            if (err) {
                console.error('error running the Select query to find the protocol ID', err);
                assert.fail(0, 1, 'error running Query.');
            }
            trialDBID = trialID.rows[0].trial_id;
            client.query("UPDATE other_ids SET protocol_id = 'NCT85' || " + projectFunctions.getRandomInt(1, 1000000) + " where protocol_id = '" + NCTID + "'", function (err) {
                if (err) {
                    console.error('error running the UPDATE query', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                client.query("SELECT * FROM other_ids where trial_id = " + trialDBID, function (err, result) {
                    if (err) {
                        console.error('error running the SELECT query', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    console.log('Value of Updated Row: ' + result.rows);
                    console.log('***** Updated NCT Protocol ID is ---- ' + result.rows[0].protocol_id + ' ---- For Trial ID :' + trialDBID + ' ******');
                    client.on('end', function () {
                        console.log("Client was disconnected.")
                    });
                });
            });
        });
    };

    this.dbConnectionImportTrialUpdateLeadID = function (leadProtocolID, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("SELECT * FROM trials where lead_protocol_id = '" + leadProtocolID + "'", function (err, trialID) {
            if (err) {
                console.error('error running the SELECT query', err);
                assert.fail(0, 1, 'error running Query.');
            }
            trialDBID = trialID.rows[0].id;
            client.query("UPDATE trials SET lead_protocol_id = 'cukeScript' || " + projectFunctions.getRandomInt(1, 1000000) + " where lead_protocol_id = '" + leadProtocolID + "'", function (err) {
                if (err) {
                    console.error('error running the UPDATE query to update the lead Protocol ID', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                client.query("SELECT * FROM trials where id = " + trialDBID, function (err, result) {
                    if (err) {
                        console.error('error running the SELECT query', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    console.log('***** Updated Lead Protocol ID is ---- ' + result.rows[0].lead_protocol_id + ' ---- For Trial ID :' + trialDBID + ' ******');
                    client.on('end', function () {
                        console.log("Client was disconnected.")
                    });
                });
            });
        });
    };

    //this.dbConnectionVerifyMyTrialCount = function (countOfMyTrialFromUI, userWhoCreatedTrial, err) {
    //    //  client.connect(function(err) {
    //    if (err) {
    //        return console.error('could not connect to postgres', err);
    //    }
    //    client.query("select count(*) from trials where created_by = '" + userWhoCreatedTrial + "' and is_draft IS NOT TRUE", function (err, result) {
    //        if (err) {
    //            console.error('error running the Select query', err);
    //            assert.fail(0, 1, 'error running Query.');
    //        }
    //        console.log('Value of Row: ' + result.rows);
    //        expect(countOfMyTrialFromUI).to.equal(result.rows[0].count);
    //        client.on('end', function () {
    //            console.log("Client was disconnected.")
    //        });
    //    });
    //};

    this.dbConnectionVerifyMyTrialCount = function (countOfMyTrialFromUI, userWhoCreatedTrial, err) {
        //  client.connect(function(err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from users where username = '" + userWhoCreatedTrial + "'", function (err, result) {
            if (err) {
                console.error('error running the Select query', err);
                assert.fail(0, 1, 'error running Query.');
            }
            console.log('ID Of User : ' + result.rows[0].id + 'For the User :' + userWhoCreatedTrial);
            client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id where t2.user_id = " + result.rows[0].id + "and t1.is_draft IS NOT TRUE and t1.is_rejected = 'false'", function (err, countOfTrialsDB) {
                if (err) {
                    console.error('error running the Select query', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                expect(countOfMyTrialFromUI).to.equal(countOfTrialsDB.rows[0].count);
                client.on('end', function () {
                    console.log("Client was disconnected.")
                });
            });
        });
        // });
    };

    this.dbConnectionVerifyAllTrialCount = function (countOfAllTrialFromUI, err) {
        // client.connect(function(err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select count(*) from trials where is_draft IS NOT TRUE ", function (err, countOfTrialsDB) {
            if (err) {
                console.error('error running the Select query', err);
                assert.fail(0, 1, 'error running Query.');
            }
            console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);

            expect(countOfAllTrialFromUI).to.equal(countOfTrialsDB.rows[0].count);
            client.on('end', function () {
                console.log("Client was disconnected.")
            });
        });
    };

    this.dbConnectionVerifySavedDraftCount = function (countOfAllTrialFromUI, userWhoCreatedTrial, err) {
        //  client.connect(function(err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select count(*) from trials where created_by = '" + userWhoCreatedTrial + "'and is_draft IS TRUE ", function (err, countOfTrialsDB) {
            if (err) {
                console.error('error running the Select query', err);
                assert.fail(0, 1, 'error running Query.');
            }
            console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);

            expect(countOfAllTrialFromUI).to.equal(countOfTrialsDB.rows[0].count);
            client.on('end', function () {
                console.log("Client was disconnected.")
            });
        });
        //  });
    };


    this.buildDBConnection = function () {
        client.connect(function (value) {
            return value;
        });
    };

    this.closeDBConnection = function () {
        client.end();
        //client.on('end', function(){console.log("Client was disconnected.")});
    };

    this.dbConnectionVerifyCountQueryWithID = function (elementTableName, elementColumnName, elementTableValue, userWhoCreatedTrial, elementColumnNameInTrialTable, whichSearchOption, countFromUI, err) {
        //client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from " + elementTableName + " where " + elementColumnName + " = '" + elementTableValue + "'", function (err, elementID) {
            if (err) {
                console.error('error running the 1st Select query', err);
                assert.fail(0, 1, 'error running 1st Query.');
            }
            elementDBID = elementID.rows[0].id;
            console.log('DB ID Of element : ' + elementDBID);
            client.query("select * from users where username = '" + userWhoCreatedTrial + "'", function (err, userID) {
                if (err) {
                    console.error('error running the 2nd Select query', err);
                    assert.fail(0, 1, 'error running 2nd Query.');
                }
                userDBID = userID.rows[0].id;
                console.log('DB ID Of user : ' + userDBID);
                if (whichSearchOption.toUpperCase() === 'MY TRIALS') {
                    client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id where t2.user_id = " + userDBID + " and t1." + elementColumnNameInTrialTable + "= " + elementDBID + "and t1.internal_source_Id = 2 and t1.is_draft is not true", function (err, countOfTrialsDB) {
                        if (err) {
                            console.error('error running the 3rd Select query', err);
                            assert.fail(0, 1, 'error running 3rd Query.');
                        }
                        console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);
                        expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementTableName + ' -- and value provided -- ' + elementTableValue + ' -- with the My Trials search option does not match.');
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                }
                else if (whichSearchOption.toUpperCase() === 'ALL TRIALS') {
                    client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id where t1." + elementColumnNameInTrialTable + "= " + elementDBID + "and t1.is_draft is not true", function (err, countOfTrialsDB) {
                        if (err) {
                            console.error('error running the Select query', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);

                        expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementTableName + ' -- and value provided -- ' + elementTableValue + ' -- with the All Trials search option does not match.');
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                }
                else if (whichSearchOption.toUpperCase() === 'SAVED DRAFTS') {
                    client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id where t2.user_id = " + userDBID + " and t1. " + elementColumnNameInTrialTable + "=" + elementDBID + "and t1.internal_source_Id = 2 and t1.is_draft is true", function (err, countOfTrialsDB) {
                        if (err) {
                            console.error('error running the Select query', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);
                        expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementTableName + ' -- and value provided -- ' + elementTableValue + ' -- with the Saved Drafts search option does not match.');
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                }
                else {
                    assert.fail(0, 1, 'Given option --> ' + whichSearchOption + ' <-- does not exist. Either the option should be --My Trials-- OR --All Trials-- OR --Saved Drafts--.');
                    client.on('end', function () {
                        console.log("Client was disconnected.")
                    });
                }
            });
        });
    };

    this.dbConnectionVerifyCountQueryWithThreeSelection = function (elementTableName, elementColumnName, elementTableValue1, elementTableValue2, elementTableValue3, userWhoCreatedTrial, elementColumnNameInTrialTable, whichSearchOption, countFromUI, err) {
        //client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from " + elementTableName + " where " + elementColumnName + " = '" + elementTableValue1 + "'" + " OR " + elementColumnName + " = '" + elementTableValue2 + "'" + " OR " + elementColumnName + " = '" + elementTableValue3 + "'", function (err, elementID) {
            if (err) {
                console.error('error running the 1st Select query', err);
                assert.fail(0, 1, 'error running 1st Query.');
            }
            elementDBID1 = elementID.rows[0].id;
            elementDBID2 = elementID.rows[1].id;
            elementDBID3 = elementID.rows[2].id;
            console.log('DB ID Of 1st element : ' + elementDBID1);
            console.log('DB ID Of 2nd element : ' + elementDBID2);
            console.log('DB ID Of 3rd element : ' + elementDBID3);
            client.query("select * from users where username = '" + userWhoCreatedTrial + "'", function (err, userID) {
                if (err) {
                    console.error('error running the 2nd Select query', err);
                    assert.fail(0, 1, 'error running 2nd Query.');
                }
                userDBID = userID.rows[0].id;
                console.log('DB ID Of user : ' + userDBID);
                if (whichSearchOption.toUpperCase() === 'MY TRIALS') {
                    client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id " +
                    "where t2.user_id = " + userDBID +
                    " and (t1." + elementColumnNameInTrialTable + "= " + elementDBID1 + "OR t1." + elementColumnNameInTrialTable + "= " + elementDBID2 + "OR t1." + elementColumnNameInTrialTable + "= " + elementDBID3 +
                    ") and t1.internal_source_Id = 2 and t1.is_draft is not true", function (err, countOfTrialsDB) {
                        if (err) {
                            console.error('error running the 3rd Select query', err);
                            assert.fail(0, 1, 'error running 3rd Query.');
                        }
                        console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);
                        expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementTableName + ' -- and values provided -- ' + elementTableValue1 + '; ' + elementTableValue2 + '; ' + elementTableValue3 + ' -- with the My Trials search option does not match.');
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                }
                else if (whichSearchOption.toUpperCase() === 'ALL TRIALS') {
                    client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id " +
                    "where (t1." + elementColumnNameInTrialTable + "= " + elementDBID1 + "OR t1." + elementColumnNameInTrialTable + "= " + elementDBID2 + "OR t1." + elementColumnNameInTrialTable + "= " + elementDBID3 +
                    ") and t1.is_draft is not true", function (err, countOfTrialsDB) {
                        if (err) {
                            console.error('error running the Select query', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);

                        expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementTableName + ' -- and values provided -- ' + elementTableValue1 + '; ' + elementTableValue2 + '; ' + elementTableValue3 + ' -- with the All Trials search option does not match.');
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                }
                else if (whichSearchOption.toUpperCase() === 'SAVED DRAFTS') {
                    client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id " +
                    "where t2.user_id = " + userDBID +
                    " and (t1." + elementColumnNameInTrialTable + "= " + elementDBID1 + "OR t1." + elementColumnNameInTrialTable + "= " + elementDBID2 + "OR t1." + elementColumnNameInTrialTable + "= " + elementDBID3 +
                    ") and t1.internal_source_Id = 2 and t1.is_draft is true", function (err, countOfTrialsDB) {
                        if (err) {
                            console.error('error running the Select query', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);
                        expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementTableName + ' -- and values provided -- ' + elementTableValue1 + '; ' + elementTableValue2 + '; ' + elementTableValue3 + ' -- with the Saved Drafts search option does not match.');
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                }
                else {
                    assert.fail(0, 1, 'Given option --> ' + whichSearchOption + ' <-- does not exist. Either the option should be --My Trials-- OR --All Trials-- OR --Saved Drafts--.');
                    client.on('end', function () {
                        console.log("Client was disconnected.")
                    });
                }
            });
        });
    };

    this.dbConnVerifyCntTrialTbWithOneClm = function (elementColumnNameInTrialTable, elementColumnValue, userWhoCreatedTrial, whichSearchOption, countFromUI, err) {
        //client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from users where username = '" + userWhoCreatedTrial + "'", function (err, userID) {
            if (err) {
                console.error('error running the 1st Select query', err);
                assert.fail(0, 1, 'error running 1st Query.');
            }
            userDBID = userID.rows[0].id;
            console.log('DB ID Of user : ' + userDBID);
            if (whichSearchOption.toUpperCase() === 'MY TRIALS') {
                client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id where t2.user_id = " + userDBID + " and t1." + elementColumnNameInTrialTable + "= '" + elementColumnValue + "' and t1.internal_source_Id = 2 and t1.is_draft is not true", function (err, countOfTrialsDB) {
                    if (err) {
                        console.error('error running the 2nd Select query', err);
                        assert.fail(0, 1, 'error running 2nd Query.');
                    }
                    console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);
                    expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementColumnNameInTrialTable + ' -- with My Trials search option does not match.');
                    client.on('end', function () {
                        console.log("Client was disconnected.")
                    });
                });
            }
            else if (whichSearchOption.toUpperCase() === 'ALL TRIALS') {
                client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id where t1." + elementColumnNameInTrialTable + "= '" + elementColumnValue + "' and t1.is_draft is not true", function (err, countOfTrialsDB) {
                    if (err) {
                        console.error('error running the 2nd Select query', err);
                        assert.fail(0, 1, 'error running 2nd Query.');
                    }
                    console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);

                    expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementColumnNameInTrialTable + ' -- with All Trials search option does not match.');
                    client.on('end', function () {
                        console.log("Client was disconnected.")
                    });
                });
            }
            else if (whichSearchOption.toUpperCase() === 'SAVED DRAFTS') {
                client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id where t2.user_id = " + userDBID + " and t1. " + elementColumnNameInTrialTable + "= '" + elementColumnValue + "' and t1.internal_source_Id = 2 and t1.is_draft is true", function (err, countOfTrialsDB) {
                    if (err) {
                        console.error('error running the 2nd Select query', err);
                        assert.fail(0, 1, 'error running 2nd Query.');
                    }
                    console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);
                    expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementColumnNameInTrialTable + ' -- with Saved Drafts search option does not match.');
                    client.on('end', function () {
                        console.log("Client was disconnected.")
                    });
                });
            }
            else {
                assert.fail(0, 1, 'Given option --> ' + whichSearchOption + ' <-- does not exist. Either the option should be --My Trials-- OR --All Trials-- OR --Saved Drafts--.');
                client.on('end', function () {
                    console.log("Client was disconnected.")
                });
            }
        });
    };

    this.dbConnVerifyDocumentImpTrial = function (nciIDOfTrial, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from trials where nci_id = '" + nciIDOfTrial + "'", function (err, trialID) {
            if (err) {
                console.error('error running the Select query to find the Trial', err);
                assert.fail(0, 1, 'error running Query.');
            }
            var trialDBID = trialID.rows[0].id;
            client.query("Select * from trial_documents where trial_id = " + trialDBID, function (err, document) {
                if (err) {
                    console.error('error running the Select query', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                console.log('***** Trial Document Name is ---- ' + document.rows[0].file_name + ' ---- For NCI Trial ID :' + nciIDOfTrial + ' ******');
                expect(NCTIDWithNoOfficialTitle + '.xml').to.equal(document.rows[0].file_name, 'Verify the XML document name');
                expect('Other').to.equal(document.rows[0].document_type, 'Verify the XML document Type');
                expect('CtGov').to.equal(document.rows[0].source_document, 'Verify the XML document Source');
                client.on('end', function () {
                    console.log("Client was disconnected.")
                });
            });
        });
    };

    this.dbConnVerifyMilestoneImpTrial = function (nciIDOfTrial, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from trials where nci_id = '" + nciIDOfTrial + "'", function (err, trialID) {
            if (err) {
                console.error('error running the Select query to find the Trial', err);
                assert.fail(0, 1, 'error running Query.');
            }
            var trialDBID = trialID.rows[0].id;
            client.query("select * from milestones where name = 'Submission Received Date'", function (err, milestoneID) {
                if (err) {
                    console.error('error running the Select query to find the Trial', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                var milestoneDBID = milestoneID.rows[0].id;
                client.query("Select * from milestone_types where name = 'General'", function (err, milestoneTypeID) {
                    if (err) {
                        console.error('error running the Select query to find the Trial', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    var milestoneTypeDBID = milestoneTypeID.rows[0].id;
                    client.query("Select * from milestone_wrappers where trial_id = " + trialDBID, function (err, milestones) {
                        if (err) {
                            console.error('error running the Select query', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        console.log('create Date Time in DB is:');
                        console.log(moment(milestones.rows[0].milestone_date).isValid());
                        console.log(moment.utc(milestones.rows[0].milestone_date).format('YYYY-MM-DD'));
                        expect(milestoneDBID).to.equal(milestones.rows[0].milestone_id, 'Verify the Milestone ID matches to \'Submission Received date\'');
                        expect(milestoneTypeDBID).to.equal(milestones.rows[0].milestone_type_id, 'Verify the Milestone Type matches');
                        expect(moment().format('YYYY-MM-DD')).to.equal((moment.utc(milestones.rows[0].milestone_date).format('YYYY-MM-DD')), 'Verify the Created Date');
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                });
            });
        });
    };

    this.dbConnVerifyTrialRejectedORSubmissionTerminated = function (NCTID, wantREJ, wantSTR, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select count(*) from other_ids where protocol_id = '" + NCTID + "'", function (err, trialCntOtherIDTbl) {
            if (err) {
                console.error('error running the Select query to find the TrialID from Other_ids table', err);
                assert.fail(0, 1, 'error running Query.');
            }
            console.log('Count of Rows : ' + trialCntOtherIDTbl.rows[0].count);
            if (trialCntOtherIDTbl.rows[0].count === '1') {
                client.query("select * from other_ids where protocol_id = '" + NCTID + "'" + " ORDER BY id DESC LIMIT 1", function (err, trialIDOtherIDTbl) {
                    if (err) {
                        console.error('error running the Select query to find the TrialID from Other_ids table', err);
                        assert.fail(0, 1, 'error running Query.');
                    }

                    trialDBID = trialIDOtherIDTbl.rows[0].trial_id;
                    console.log('Trial DB Id' + trialDBID);
                });
            }
            else {
                projectFunctionsRegistry.parseXMLFromCtGov(NCTID);
                ctGovElement.then(function (value) {
                    var ctGovLeadProtocolID = value.clinical_study.id_info.org_study_id;
                    var ctGovLeadOrg = value.clinical_study.sponsors.lead_sponsor.agency;
                    client.query("select * from trials where lead_protocol_id = '" + ctGovLeadProtocolID + "' and study_source_id = 4 ORDER BY id DESC LIMIT 1", function (err, trialIDTrialTbl) {
                        if (err) {
                            console.error('error running the Select query to find the TrialID from trial table', err);
                            assert.fail(0, 1, 'error running Query.');
                        }

                        trialDBID = trialIDTrialTbl.rows[0].id;
                        console.log('Trial DB Id' + trialDBID);
                    });
                });
            }

            client.query("select * from processing_statuses where name = 'Submission Terminated' OR name = 'Rejected' OR name = 'Submission Reactivated' order by name desc", function (err, processingStatusID) {
                if (err) {
                    console.error('error running the Select query to find the ID of Processing Status', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                var STRDBID = processingStatusID.rows[0].id;
                var SREDBID = processingStatusID.rows[1].id;
                var REJDBID = processingStatusID.rows[2].id;
                client.query("select * from processing_status_wrappers where trial_id = " + trialDBID + " ORDER BY id DESC LIMIT 1", function (err, processingStatusWrapperID) {
                    if (err) {
                        console.error('error running the Select query to find the latest processing status', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    var processingStatusDBID = processingStatusWrapperID.rows[0].processing_status_id;
                    client.query("select * from milestones where name = 'Submission Reactivated Date' OR name = 'Submission Terminated Date' " +
                    "OR name = 'Submission Rejection Date' OR name = 'Late Rejection Date' order by name", function (err, milestoneID) {
                        if (err) {
                            console.error('error running the Select query to find the ID of Milestone', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        var milestoneLRDDBID = milestoneID.rows[0].id;
                        var milestoneSREDBID = milestoneID.rows[1].id;
                        var milestoneSRJDBID = milestoneID.rows[2].id;
                        var milestoneSTRDBID = milestoneID.rows[3].id;
                        client.query("select * from submissions where trial_id = " + trialDBID + "ORDER BY id DESC LIMIT 1", function (err, submissionID) {
                            if (err) {
                                console.error('error running the Select query to find the ID of Submission', err);
                                assert.fail(0, 1, 'error running Query.');
                            }
                            var submissionDBID = submissionID.rows[0].id;


                            if (processingStatusDBID === STRDBID && wantSTR.toUpperCase() === 'NO') {
                                console.log('Trial Processing Status is Submission Terminated');
                                client.query("insert into milestone_wrappers values(DEFAULT , CURRENT_DATE ,  " + milestoneSREDBID + ", " + trialDBID + ", current_timestamp, current_timestamp, uuid_generate_v4(), 0, " + submissionDBID + ", '', 3, 'Lathiramalaynathan, Frederick' )", function (err) {
                                    if (err) {
                                        console.error('error running the Insert query to Milestone Wrappers to Reactivate a submission Terminated Trial', err);
                                        assert.fail(0, 1, 'error running Query.');
                                    }
                                });
                                client.query("insert into processing_status_wrappers values(DEFAULT , CURRENT_DATE ,  " + SREDBID + ", " + trialDBID + ", current_timestamp, current_timestamp, uuid_generate_v4(), 0, " + submissionDBID + " )", function (err) {
                                    if (err) {
                                        console.error('error running the Insert query to Processing Status Wrappers to Reactivate a submission Terminated Trial', err);
                                        assert.fail(0, 1, 'error running Query.');
                                    }
                                });
                            }

                            if (processingStatusDBID !== STRDBID && wantSTR.toUpperCase() === 'YES') {
                                console.log('Trial Processing Status is Not Submission Terminated');
                                client.query("insert into milestone_wrappers values(DEFAULT , CURRENT_DATE ,  " + milestoneSTRDBID + ", " + trialDBID + ", current_timestamp, current_timestamp, uuid_generate_v4(), 0, " + submissionDBID + ", '', 3, 'Lathiramalaynathan, Frederick' )", function (err) {
                                    if (err) {
                                        console.error('error running the Insert query to Milestone Wrappers to Terminated a submission ', err);
                                        assert.fail(0, 1, 'error running Query.');
                                    }
                                });
                                client.query("insert into processing_status_wrappers values(DEFAULT , CURRENT_DATE ,  " + STRDBID + ", " + trialDBID + ", current_timestamp, current_timestamp, uuid_generate_v4(), 0, " + submissionDBID + " )", function (err) {
                                    if (err) {
                                        console.error('error running the Insert query to Processing Status Wrappers to Terminated a submission', err);
                                        assert.fail(0, 1, 'error running Query.');
                                    }
                                });
                            }

                            if (processingStatusDBID === REJDBID && wantREJ.toUpperCase() === 'NO') {
                                assert.fail(0, 1, 'Unrejecting a trial not implemented Now');
                                console.log('Trial Processing Status is Rejected');
                            }
                            if (processingStatusDBID !== REJDBID && wantREJ.toUpperCase() === 'YES') {
                                console.log('Trial Processing Status is NOT Rejected');
                                client.query("insert into milestone_wrappers values(DEFAULT , CURRENT_DATE ,  " + milestoneSRJDBID + ", " + trialDBID + ", current_timestamp, current_timestamp, uuid_generate_v4(), 0, " + submissionDBID + ", '', 3, 'Lathiramalaynathan, Frederick' )", function (err) {
                                    if (err) {
                                        console.error('error running the Insert query to Milestone Wrappers to Reject a submission ', err);
                                        assert.fail(0, 1, 'error running Query.');
                                    }
                                });
                                client.query("insert into processing_status_wrappers values(DEFAULT , CURRENT_DATE ,  " + REJDBID + ", " + trialDBID + ", current_timestamp, current_timestamp, uuid_generate_v4(), 0, " + submissionDBID + " )", function (err) {
                                    if (err) {
                                        console.error('error running the Insert query to Processing Status Wrappers to Reject a submission', err);
                                        assert.fail(0, 1, 'error running Query.');
                                    }
                                });
                            }
                            else {
                                console.log('Trial Processing Status is neither Rejected nor Submission Terminated.');
                            }
                            client.on('end', function () {
                                console.log("Client was disconnected.")
                            });
                        });
                    });
                });
            });
        });
    };

    this.dbConnRejectProtocolTrial = function (nciIDOfTrial, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from trials where nci_id = '" + nciIDOfTrial + "'", function (err, trialID) {
            if (err) {
                console.error('error running the Select query to find the TrialID from Trials table', err);
                assert.fail(0, 1, 'error running Query.');
            }
            var trialDBID = trialID.rows[0].id;
            console.log('Trial DB Id' + trialDBID);
            client.query("select * from processing_statuses where name = 'Rejected'", function (err, processingStatusID) {
                if (err) {
                    console.error('error running the Select query to find the ID of Processing Status', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                var REJDBID = processingStatusID.rows[0].id;
                client.query("select * from milestones where name = 'Submission Rejection Date' ", function (err, milestoneID) {
                    if (err) {
                        console.error('error running the Select query to find the ID of Milestone', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    var milestoneSRJDBID = milestoneID.rows[0].id;
                    client.query("select * from submissions where trial_id = " + trialDBID + "ORDER BY id DESC LIMIT 1", function (err, submissionID) {
                        if (err) {
                            console.error('error running the Select query to find the ID of Submission', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        var submissionDBID = submissionID.rows[0].id;
                        client.query("insert into milestone_wrappers values(DEFAULT , CURRENT_DATE ,  " + milestoneSRJDBID + ", " + trialDBID + ", current_timestamp, current_timestamp, uuid_in(md5(random()::text || now()::text)::cstring), 0, " + submissionDBID + ", 'Out of Scope: Cuke DB Rejected', 3, 'Lathiramalaynathan, Frederick' )", function (err) {
                            if (err) {
                                console.error('error running the Insert query to Milestone Wrappers to Reject a submission ', err);
                                assert.fail(0, 1, 'error running Query.');
                            }
                        });
                        client.query("insert into processing_status_wrappers values(DEFAULT , CURRENT_DATE ,  " + REJDBID + ", " + trialDBID + ", current_timestamp, current_timestamp, uuid_in(md5(random()::text || now()::text)::cstring), 0, " + submissionDBID + " )", function (err) {
                            if (err) {
                                console.error('error running the Insert query to Processing Status Wrappers to Reject a submission', err);
                                assert.fail(0, 1, 'error running Query.');
                            }
                        });
                        client.query("update trials set is_rejected = true where id = " + trialDBID, function (err) {
                            if (err) {
                                console.error('error running the Update query to set the Trial Status to Rejected for Trials table', err);
                                assert.fail(0, 1, 'error running Query.');
                            }
                        });
                        client.query("update submissions set status = 'Rejected' where id = " + trialDBID, function (err) {
                            if (err) {
                                console.error('error running the Update query to set the Status to Rejected for Submissions table', err);
                                assert.fail(0, 1, 'error running Query.');
                            }
                        });
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                });
            });
            //  });
        });
    };

    this.dbConnectionMailVerification = function (typeOfIDNCIORLeadProtocol, identifier, emailTO, emailSubject, emailBody, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        if(typeOfIDNCIORLeadProtocol.toUpperCase() === 'NCI')
        {
        client.query("SELECT * FROM trials where nci_id = '" + identifier + "'", function (err, trialID) {
            if (err) {
              //  console.error('error running the SELECT query', err);
                assert.fail(0, 1, 'error running Query.');
            }
            trialDBID = trialID.rows[0].id;
            client.query("SELECT * FROM mail_logs where trial_id = " + trialDBID , function (err, mailID) {
                if (err) {
                  //  console.error('error running the Select query to find the email', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                if(emailTO !== '') {
                    expect(mailID.rows[0].to).to.equal(emailTO, 'Verification of Email TO');
                }
                if(emailSubject !== '') {
                    expect(mailID.rows[0].subject).to.equal(emailSubject, 'Verification of Email Subject');
                }
                if(emailBody !== '') {
                    expect(mailID.rows[0].body).to.equal(emailBody, 'Verification of Email Body');
                }
                expect(mailID.rows[0].result).to.equal('Success', 'Verify Email Result is Success');
                client.on('end', function () {
                    console.log("Client was disconnected.")
                });
            });
        });
        }
        //    else
        if (typeOfIDNCIORLeadProtocol.toUpperCase().replace(/ /g, '') === 'LEADPROTOCOLID') {
            client.query("SELECT * FROM trials where lead_protocol_id = '" + identifier + "'", function (err, trialID) {
                if (err) {
                    // console.error('error running the SELECT query', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                trialDBID = trialID.rows[0].id;
                client.query("SELECT * FROM mail_logs where trial_id = " + trialDBID, function (err, mailID) {
                    if (err) {
                        // console.error('error running the Select query to find the email', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    console.log('mailI/d from db');
                    console.log(mailID.rows[0]);
                    //  return mailID.rows[0];
                    mailTOFromDB = mailID.rows[0].to;
                    mailBodyFromDB = mailID.rows[0].body;
                    if (emailTO !== '') {
                        expect(mailID.rows[0].to).to.equal(emailTO, 'Verification of Email TO');
                    }
                    if (emailSubject !== '') {
                        expect(mailID.rows[0].subject).to.equal(emailSubject, 'Verification of Email Subject');
                    }
                    if (emailBody !== '') {
                        expect(mailID.rows[0].body).to.equal(emailBody, 'Verification of Email Body');//.and.notify(err);
                    }
                    expect(mailID.rows[0].result).to.equal('Success', 'Verify Email Result is Success');
                    client.on('end', function (result) {
                        client.end();
                        res.writeHead(200, {'Content-Type': 'text/plain'});
                        res.write(JSON.stringify(result.rows, null, "    ") + "\n");
                        console.log('**********' + result.rows[0].body);
                        res.end();
                        // console.log('**********'+result.rows[0].to);
                        // mailTOFromDB = result.rows[0].to;
                        // mailBodyFromDB = result.rows[0].body;
                        console.log("Client was disconnected.")
                    });
                });
            });
        }
        //else {
        //    assert.fail(0, 1, 'Please select the correct Criteria for selection of Trial. Type should be either "NCI" OR "LEADPROTOCOLID". ' +
        //    'Current provided type is: ' + typeOfIDNCIORLeadProtocol + 'which does not match with existing types.');
        //}


    };


    this.dbConnectionPSViewTable = function (userWhoImportedTrial, PSTableValues, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from users where username = '" + userWhoImportedTrial + "'", function (err, userTable) {
            if (err) {
                console.error('error running the Select query to find the userName from Users table', err);
                assert.fail(0, 1, 'error running Query.');
            }
            userTableDBOrgID = userTable.rows[0].organization_id;
            viewPSWithOrgID = userTableDBOrgID + ' ' + PSTableValues;
            addTrial.getViewTrialParticipatingSites(viewPSWithOrgID.split());
            client.on('end', function () {
                console.log("Client was disconnected.")
            });
        });
    };

//This method will add a Milestone if it does not exist
    this.dbConnAddMilestone = function (milestoneDBID, trialDBID, submissionDBID) {
        client.query("select count(*) from milestone_wrappers where trial_id = " + trialDBID + " and milestone_id = " + milestoneDBID, function (err, milestoneCnt) {
            if (err) {
                console.error('error running the Select query to find the Count of Milestone from milestone_wrappers table', err);
                assert.fail(0, 1, 'error running Query.');
            }
          //  console.log('Count of Rows : ' + milestoneCnt.rows[0].count);
            if (milestoneCnt.rows[0].count === '0') {
                client.query("insert into milestone_wrappers values(DEFAULT , CURRENT_DATE ,  " + milestoneDBID + ", " + trialDBID + ", current_timestamp, current_timestamp, uuid_in(md5(random()::text || now()::text)::cstring), 0, " + submissionDBID + ", '', 3, 'Lathiramalaynathan, Frederick' )", function (err) {
                    if (err) {
                        console.error('error running the Insert query to insert the milestone in milestone_wrappers table', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                });
            }
        });
    };


    //This method will add a Processing Status if it does not exist
    this.dbConnAddProcessingStatus = function (processingStatusDBID, trialDBID, submissionDBID) {
        client.query("select count(*) from processing_status_wrappers where trial_id = " + trialDBID + " and processing_status_id = " + processingStatusDBID, function (err, processingStatusCnt) {
            if (err) {
                console.error('error running the Select query to find the Count of processing status from processing_status_wrappers table', err);
                assert.fail(0, 1, 'error running Query.');
            }
          //  console.log('Count of Rows : ' + processingStatusCnt.rows[0].count);
            if (processingStatusCnt.rows[0].count === '0') {
                client.query("insert into processing_status_wrappers values(DEFAULT , CURRENT_DATE ,  " + processingStatusDBID + ", " + trialDBID + ", current_timestamp, current_timestamp, uuid_in(md5(random()::text || now()::text)::cstring), 0, " + submissionDBID + " )", function (err) {
                    if (err) {
                        console.error('error running the Insert query to insert the processing Status in processing_status_wrappers table', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                });
            }
        });
    };

    this.dbConnAddAllMilestoneProcessingStatus = function (NCIID, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from trials where nci_id = '" + NCIID + "'", function (err, trialIDTrialTbl) {
            if (err) {
                console.error('error running the Select query to find the TrialID from trial table', err);
                assert.fail(0, 1, 'error running Query.');
            }
            var trialDBID = trialIDTrialTbl.rows[0].id;
            console.log('Trial DB Id' + trialDBID);
            // });
            client.query("select * from submissions where trial_id = " + trialDBID + "ORDER BY id DESC LIMIT 1", function (err, submissionID) {
                if (err) {
                    console.error('error running the Select query to find the ID of Submission', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                var submissionDBID = submissionID.rows[0].id;
                // });

                client.query("select * from milestones where name in ('Administrative Processing Completed Date'," +
                "'Administrative Processing Start Date'," +
                "'Administrative QC Completed Date'," +
                "'Administrative QC Start Date'," +
                "'Initial Abstraction Verified Date'," +
                "'On-going Abstraction Verified Date'," +
                "'Ready for Administrative QC Date'," +
                "'Ready for Scientific QC Date'," +
                "'Ready for Trial Summary Report Date'," +
                "'Scientific Processing Completed Date'," +
                "'Scientific Processing Start Date'," +
                "'Scientific QC Completed Date'," +
                "'Scientific QC Start Date'," +
                "'Submission Acceptance Date'," +
                "'Submitter Trial Summary Report Feedback Date'," +
                "'Trial Summary Report Date'," +
                "'Validation Processing Completed Date'," +
                "'Validation Processing Start Date') order by name", function (err, milestoneID) {
                    if (err) {
                        console.error('error running the Select query to find the ID of Milestone', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    var milestoneAPCDBID = milestoneID.rows[0].id;
                    var milestoneAPSDBID = milestoneID.rows[1].id;
                    var milestoneAQCDBID = milestoneID.rows[2].id;
                    var milestoneAQSDBID = milestoneID.rows[3].id;
                    var milestoneIAVDBID = milestoneID.rows[4].id;
                    var milestoneONGDBID = milestoneID.rows[5].id;
                    var milestoneRAQDBID = milestoneID.rows[6].id;
                    var milestoneRSQDBID = milestoneID.rows[7].id;
                    var milestoneRTSDBID = milestoneID.rows[8].id;
                    var milestoneSPCDBID = milestoneID.rows[9].id;
                    var milestoneSPSDBID = milestoneID.rows[10].id;
                    var milestoneSQCDBID = milestoneID.rows[11].id;
                    var milestoneSQSDBID = milestoneID.rows[12].id;
                    var milestoneSACDBID = milestoneID.rows[13].id;
                    var milestoneSTSDBID = milestoneID.rows[14].id;
                    var milestoneTSRDBID = milestoneID.rows[15].id;
                    var milestoneVPCDBID = milestoneID.rows[16].id;
                    var milestoneVPSDBID = milestoneID.rows[17].id;
                    self.dbConnAddMilestone(milestoneVPSDBID, trialDBID, submissionDBID);
                    self.dbConnAddMilestone(milestoneVPCDBID, trialDBID, submissionDBID);
                    self.dbConnAddMilestone(milestoneSACDBID, trialDBID, submissionDBID);
                    self.dbConnAddMilestone(milestoneAPSDBID, trialDBID, submissionDBID);
                    self.dbConnAddMilestone(milestoneAPCDBID, trialDBID, submissionDBID);
                    self.dbConnAddMilestone(milestoneRAQDBID, trialDBID, submissionDBID);
                    self.dbConnAddMilestone(milestoneAQSDBID, trialDBID, submissionDBID);
                    self.dbConnAddMilestone(milestoneAQCDBID, trialDBID, submissionDBID);
                    self.dbConnAddMilestone(milestoneSPSDBID, trialDBID, submissionDBID);
                    self.dbConnAddMilestone(milestoneSPCDBID, trialDBID, submissionDBID);
                    self.dbConnAddMilestone(milestoneRSQDBID, trialDBID, submissionDBID);
                    self.dbConnAddMilestone(milestoneSQSDBID, trialDBID, submissionDBID);
                    self.dbConnAddMilestone(milestoneSQCDBID, trialDBID, submissionDBID);
                    self.dbConnAddMilestone(milestoneRTSDBID, trialDBID, submissionDBID);
                    self.dbConnAddMilestone(milestoneTSRDBID, trialDBID, submissionDBID);
                    self.dbConnAddMilestone(milestoneSTSDBID, trialDBID, submissionDBID);
                    self.dbConnAddMilestone(milestoneIAVDBID, trialDBID, submissionDBID);
                    self.dbConnAddMilestone(milestoneONGDBID, trialDBID, submissionDBID);

                    client.query("select * from processing_statuses where name in ('Abstracted'," +
                    "'Abstraction Verified No Response'," +
                    "'Abstraction Verified Response'," +
                    "'Accepted'," +
                    "'Verification Pending'" +
                    ") order by name", function (err, processingStatusID) {
                        if (err) {
                            console.error('error running the Select query to find the ID of Processing Status', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        var processingStatusABSDBID = processingStatusID.rows[0].id;
                        var processingStatusVNRDBID = processingStatusID.rows[1].id;
                        var processingStatusAVRDBID = processingStatusID.rows[2].id;
                        var processingStatusACCDBID = processingStatusID.rows[3].id;
                        var processingStatusVFPDBID = processingStatusID.rows[4].id;
                        self.dbConnAddProcessingStatus(processingStatusACCDBID, trialDBID, submissionDBID);
                        self.dbConnAddProcessingStatus(processingStatusABSDBID, trialDBID, submissionDBID);
                        self.dbConnAddProcessingStatus(processingStatusVFPDBID, trialDBID, submissionDBID);
                        self.dbConnAddProcessingStatus(processingStatusAVRDBID, trialDBID, submissionDBID);
                        self.dbConnAddProcessingStatus(processingStatusVNRDBID, trialDBID, submissionDBID);
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                });
            });
        });
    };


    this.dbConnVerifySubmissionSource = function (NCIID,submissionSource, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from trials where nci_id = '" + NCIID + "'", function (err, trialIDTrialTbl) {
            if (err) {
                console.error('error running the Select query to find the TrialID from trial table', err);
                assert.fail(0, 1, 'error running Query.');
            }
            var trialDBID = trialIDTrialTbl.rows[0].id;
            console.log('Trial DB Id' + trialDBID);
            client.query("select * from submission_sources where name = '" + submissionSource + "'", function (err, subSrcID) {
                if (err) {
                    console.error('error running the Select query to find the Submission source ID from submission_sources table', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                var subSrcIDDBID = subSrcID.rows[0].id;
                console.log('submission_sources Id' + subSrcIDDBID);
                client.query("select * from submissions where trial_id = " + trialDBID + "ORDER BY id DESC LIMIT 1", function (err, submissionID) {
                    if (err) {
                        console.error('error running the Select query to find the ID of Submission', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    expect(submissionID.rows[0].submission_source_id).to.equal(subSrcIDDBID, 'Verification of Submission Source is: ' + submissionSource);
                    client.on('end', function () {
                        console.log("Client was disconnected.")
                    });
                });
            });
        });
    };

    this.dbConnVerifySubmissionMethod = function (NCIID, submissionMethod, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from trials where nci_id = '" + NCIID + "'", function (err, trialIDTrialTbl) {
            if (err) {
                console.error('error running the Select query to find the TrialID from trial table', err);
                assert.fail(0, 1, 'error running Query.');
            }
            var trialDBID = trialIDTrialTbl.rows[0].id;
            console.log('Trial DB Id' + trialDBID);
            client.query("select * from submission_methods where name = '" + submissionMethod + "'", function (err, subMethodID) {
                if (err) {
                    console.error('error running the Select query to find the Submission method ID from submission_methods table', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                var subMethodDBID = subMethodID.rows[0].id;
                console.log('submission_methods Id' + subMethodDBID);
                client.query("select * from submissions where trial_id = " + trialDBID + "ORDER BY id DESC LIMIT 1", function (err, submissionID) {
                    if (err) {
                        console.error('error running the Select query to find the ID of Submission', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    expect(submissionID.rows[0].submission_method_id).to.equal(subMethodDBID, 'Verification of Submission Method is: ' + submissionMethod);
                    client.on('end', function () {
                        console.log("Client was disconnected.")
                    });
                });
            });
        });
    };

    this.dbConnVerifySubmissionType = function (NCIID, submissionType, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from trials where nci_id = '" + NCIID + "'", function (err, trialIDTrialTbl) {
            if (err) {
                console.error('error running the Select query to find the TrialID from trial table', err);
                assert.fail(0, 1, 'error running Query.');
            }
            var trialDBID = trialIDTrialTbl.rows[0].id;
            console.log('Trial DB Id' + trialDBID);
            client.query("select * from submission_types where name = '" + submissionType + "'", function (err, subTypeID) {
                if (err) {
                    console.error('error running the Select query to find the Submission type ID from submission_types table', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                var subTypeDBID = subTypeID.rows[0].id;
                console.log('submission_types Id' + subTypeDBID);
                client.query("select * from submissions where trial_id = " + trialDBID + "ORDER BY id DESC LIMIT 1", function (err, submissionID) {
                    if (err) {
                        console.error('error running the Select query to find the ID of Submission', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    expect(submissionID.rows[0].submission_type_id).to.equal(subTypeDBID, 'Verification of Submission Source is: '+ submissionType);
                    client.on('end', function () {
                        console.log("Client was disconnected.")
                    });
                });
            });
        });
    };

    this.dbConnAddParticipatingSiteGeneralType = function (NCIID, userWhoCreatedTrial, localTrialID, programCode, contactName, contactPhone, contactEmail, phoneExtension, sitePIID, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from trials where nci_id = '" + NCIID + "'", function (err, trialIDTrialTbl) {
            if (err) {
                console.error('error running the Select query to find the TrialID from trial table', err);
                assert.fail(0, 1, 'error running Query.');
            }
            var trialDBID = trialIDTrialTbl.rows[0].id;
            console.log('Trial DB Id' + trialDBID);
            client.query("select * from users where username = '" + userWhoCreatedTrial + "'", function (err, userTable) {
                if (err) {
                    console.error('error running the Select query to find the userName from Users table', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                userTableDBOrgID = userTable.rows[0].organization_id;
                client.query("select * from organizations where id = '" + userTableDBOrgID + "'", function (err, orgTable) {
                    if (err) {
                        console.error('error running the Select query to find the userName from Users table', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    userTableDBOrgName = orgTable.rows[0].name;
                    client.query("select count(*) from participating_sites where trial_id = " + trialDBID + " and organization_id = " + userTableDBOrgID, function (err, PSCnt) {
                        if (err) {
                            console.error('error running the Select query to find the Count of participating_sites from participating_sites table', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        //  console.log('Count of Rows : ' + processingStatusCnt.rows[0].count);
                        if (PSCnt.rows[0].count === '0') {
                            console.log('****** Participating Site does not exist, so Inserting the PS.');
                            client.query('insert into participating_sites VALUES (' +
                            'DEFAULT,' +
                            '\'' + localTrialID + '\',' +
                            '\'' + programCode + '\',' +
                            '\'' + contactName + '\',' +
                            '\'' + contactPhone + '\',' +
                            '\'' + contactEmail + '\',' +
                            trialDBID + ',' +
                            userTableDBOrgID + ',' +
                            'NULL,' +
                            'current_timestamp,' +
                            'current_timestamp,' +
                            'uuid_in(md5(random()::text || now()::text)::cstring),' +
                            '0,' +
                            '\'' + phoneExtension + '\',' +
                            '\'' + 'General' + '\',' +
                            'NULL,' +
                            'NULL)', function (err) {
                                if (err) {
                                    console.error('error running the Insert query to insert the participating Site in participating_sites table', err);
                                    assert.fail(0, 1, 'error running Query.');
                                }
                                client.query("select * from participating_sites where trial_id = " + trialDBID + " and organization_id = " + userTableDBOrgID, function (err, insertedPS) {
                                    if (err) {
                                        console.error('error running the Select query to find the participating Site from participating_sites table', err);
                                        assert.fail(0, 1, 'error running Query.');
                                    }
                                    var insertedPSDBID = insertedPS.rows[0].id;
                                    client.query("select * from site_recruitment_statuses where name = 'In Review'", function (err, siteStatus) {
                                        if (err) {
                                            console.error('error running the Select query to find the Site Status from site_recruitment_statuses table', err);
                                            assert.fail(0, 1, 'error running Query.');
                                        }
                                        var siteStatusDBID = siteStatus.rows[0].id;
                                        var currentDate = moment().format('YYYY-MM-DD');
                                        console.log('current Date');
                                        console.log(currentDate);
                                        client.query('insert into site_rec_status_wrappers VALUES (' +
                                        'DEFAULT,' +
                                        '\'' + currentDate + '\',' +
                                        siteStatusDBID + ',' +
                                        insertedPSDBID + ',' +
                                        'current_timestamp,' +
                                        'current_timestamp,' +
                                        'uuid_in(md5(random()::text || now()::text)::cstring),' +
                                        '0,' +
                                        '\'' + 'PS Status added from DB cuke Script SS' + '\'' + ')', function (err) {
                                            if (err) {
                                                console.error('error running the Insert query to insert the Site Status in site_rec_status_wrappers table', err);
                                                assert.fail(0, 1, 'error running Query.');
                                            }
                                            client.query('insert into participating_site_investigators VALUES (' +
                                            'DEFAULT,' +
                                            insertedPSDBID + ',' +
                                            sitePIID + ',' +
                                            'NULL,' +
                                            '\'' + 'Principal Investigator' + '\',' +
                                            'current_timestamp,' +
                                            'current_timestamp,' +
                                            'uuid_in(md5(random()::text || now()::text)::cstring),' +
                                            '0)', function (err) {
                                                if (err) {
                                                    console.error('error running the Insert query to insert the participating Site Investigator in participating_site_investigators table', err);
                                                    assert.fail(0, 1, 'error running Query.');
                                                }
                                            });
                                        });
                                    });
                                });
                            });
                        }
                        if (PSCnt.rows[0].count > '0') {
                            console.log('****** Participating Site exist, so updating the PS.');
                            client.query('UPDATE participating_sites set ' +
                            'protocol_id = \'' + localTrialID + '\','  +
                            'program_code = \'' + programCode + '\',' +
                            'contact_name = \'' + contactName + '\',' +
                            'contact_phone = \'' + contactPhone + '\',' +
                            'contact_email = \'' + contactEmail + '\',' +
                            'extension = \'' + phoneExtension + '\',' +
                            'contact_type = \'General\''  +
                            ' where trial_id = ' + trialDBID + ' and organization_id = ' + userTableDBOrgID, function (err) {
                                if (err) {
                                    console.error('error running the Update query to update the participating Site in participating_sites table', err);
                                    assert.fail(0, 1, 'error running Query.');
                                }
                                client.query("select * from participating_sites where trial_id = " + trialDBID + " and organization_id = " + userTableDBOrgID, function (err, updatedPS) {
                                    if (err) {
                                        console.error('error running the Select query to find the participating Site from participating_sites table', err);
                                        assert.fail(0, 1, 'error running Query.');
                                    }
                                    var updatedPSDBID = updatedPS.rows[0].id;
                                    client.query("select * from site_recruitment_statuses where name = 'In Review'", function (err, siteStatus) {
                                        if (err) {
                                            console.error('error running the Select query to find the Site Status from site_recruitment_statuses table', err);
                                            assert.fail(0, 1, 'error running Query.');
                                        }
                                        var siteStatusDBID = siteStatus.rows[0].id;
                                        var currentDate = moment().format('YYYY-MM-DD');
                                        client.query("DELETE from site_rec_status_wrappers where participating_site_id = " + updatedPSDBID, function (err) {
                                            if (err) {
                                                console.error('error running the Delete query to delete all the Site Status from site_rec_status_wrappers table', err);
                                                assert.fail(0, 1, 'error running Query.');
                                            }
                                            client.query('insert into site_rec_status_wrappers VALUES (' +
                                            'DEFAULT,' +
                                            '\'' + currentDate + '\',' +
                                            siteStatusDBID + ',' +
                                            updatedPSDBID + ',' +
                                            'current_timestamp,' +
                                            'current_timestamp,' +
                                            'uuid_in(md5(random()::text || now()::text)::cstring),' +
                                            '0,' +
                                            '\'' + 'PS Status added from DB cuke Script SS' + '\'' + ')', function (err) {
                                                if (err) {
                                                    console.error('error running the Insert query to insert the Site Status in site_rec_status_wrappers table', err);
                                                    assert.fail(0, 1, 'error running Query.');
                                                }
                                                client.query('UPDATE participating_site_investigators SET ' +
                                                'person_id = ' + sitePIID + ',' +
                                                'investigator_type = ' + '\'' + 'Principal Investigator' + '\'' +
                                                'where participating_site_id = ' + updatedPSDBID , function (err) {
                                                    if (err) {
                                                        console.error('error running the Update query to update the Principal Investigator in participating_site_investigators table', err);
                                                        assert.fail(0, 1, 'error running Query.');
                                                    }
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        }
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                });
            });
        });
    };

    this.dbConnAddPersonWithOrg = function (userWhoCreated, sourceContext, personPrefix, personSuffix, personEmail, personPhone, personSourceStatus, personFirstName, personMiddleName, personLastName, personPhoneExtension, personProcessingStatus,
                                            organizationName, orgAddress, orgAddress2, orgCity, orgState, orgPostalCode, orgCountry, orgEmail, orgPhone, orgPhoneExtension, orgProcessingStatus, POAffiliationStatus, err) {
        var personDBID = '';
        var orgDBID = '';

        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from source_contexts where lower(name) = lower('" + sourceContext + "')", function (err, srcContextTbl) {
            if (err) {
                console.error('error running the Select query to find the source_contexts from source_contexts table', err);
                assert.fail(0, 1, 'error running Query.');
            }
            var srcContextDBID = srcContextTbl.rows[0].id;
            client.query("select * from source_statuses where lower(name) = lower('" + personSourceStatus + "') and source_context_id = " + srcContextDBID, function (err, srcStatusTbl) {
                if (err) {
                    console.error('error running the Select query to find the source_statuses from source_statuses table', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                var srcStatusDBID = srcStatusTbl.rows[0].id;
                client.query("select count(*) from people where fname = '" + personFirstName + "'", function (err, personTblCnt) {
                    if (err) {
                        console.error('error running the Select query to find the Person from people table', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    if (personTblCnt.rows[0].count === '0') {
                        console.log('****** Person does not exist, so Inserting the Person.');
                        client.query('insert into people VALUES (' +
                        'nextval(\'seq_persons_id\'),' +
                        'currval(\'seq_persons_id\'),' +
                        '\'' + personPrefix + '\',' +
                        '\'' + personSuffix + '\',' +
                        '\'' + personEmail + '\',' +
                        '\'' + personPhone + '\',' +
                        srcStatusDBID + ',' +
                        srcContextDBID + ',' +
                        'current_timestamp,' +
                        'current_timestamp,' +
                        'uuid_in(md5(random()::text || now()::text)::cstring),' +
                        '1,' +
                        '\'' + personFirstName + '\',' +
                        '\'' + personMiddleName + '\',' +
                        '\'' + personLastName + '\',' +
                        'currval(\'seq_persons_id\'),' +
                        '\'' + userWhoCreated + '\',' +
                        '\'' + userWhoCreated + '\',' +
                        '\'' + personPhoneExtension + '\',' +
                        '\'' + personProcessingStatus + '\',' +
                        'NULL,' +
                        'NULL,' +
                        'NULL)', function (err) {
                            if (err) {
                                console.error('error running the Insert query to insert the person in people table', err);
                                assert.fail(0, 1, 'error running Query.');
                            }
                        });
                    }
                            client.query("select * from people where fname = '" + personFirstName + "'", function (err, peopleTable) {
                                if (err) {
                                    console.error('error running the Select query to find the first name from people table', err);
                                    assert.fail(0, 1, 'error running Query.');
                                }
                                personDBID = peopleTable.rows[0].id;
                                personDBFirstName = peopleTable.rows[0].fname;
                                console.log('Person DB Id' + personDBID);
                            });
                    client.query("select count(*) from organizations where name = '" + organizationName + "'", function (err, orgTblCnt) {
                        if (err) {
                            console.error('error running the Select query to find the organizations from organizations table', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        if (orgTblCnt.rows[0].count === '0') {
                            console.log('****** Organization does not exist, so Inserting the Organization.');
                            client.query('insert into organizations VALUES (' +
                            'nextval(\'seq_organizations_id\'),' +
                            'currval(\'seq_organizations_id\'),' +
                            '\'' + organizationName + '\',' +
                            '\'' + orgAddress + '\',' +
                            '\'' + orgAddress2 + '\',' +
                            '\'' + orgCity + '\',' +
                            '\'' + orgState + '\',' +
                            '\'' + orgPostalCode + '\',' +
                            '\'' + orgCountry + '\',' +
                            '\'' + orgEmail + '\',' +
                            '\'' + orgPhone + '\',' +
                            srcStatusDBID + ',' +
                            srcContextDBID + ',' +
                            'current_timestamp,' +
                            'current_timestamp,' +
                            'uuid_in(md5(random()::text || now()::text)::cstring),' +
                            '1,' +
                            'currval(\'seq_organizations_id\'),' +
                            '\'' + userWhoCreated + '\',' +
                            '\'' + userWhoCreated + '\',' +
                            '\'' + orgPhoneExtension + '\',' +
                            '\'' + orgProcessingStatus + '\',' +
                            'NULL,' +
                            'NULL,' +
                            'NULL,' +
                            'NULL,' +
                            'NULL)', function (err) {
                                if (err) {
                                    console.error('error running the Insert query to insert the organization in organization table', err);
                                    assert.fail(0, 1, 'error running Query.');
                                }
                            });
                        }
                                client.query("select * from organizations where name = '" + organizationName + "'", function (err, organizationTable) {
                                    if (err) {
                                        console.error('error running the Select query to find the name from organizations table', err);
                                        assert.fail(0, 1, 'error running Query.');
                                    }
                                    orgDBID = organizationTable.rows[0].id;
                                    orgDBName = organizationTable.rows[0].name;
                                    console.log('Org DB Id' + orgDBID);
                                });

                        client.query("select * from po_affiliation_statuses where lower(name) = lower('" + POAffiliationStatus + "')", function (err, POAffStatusTbl) {
                            if (err) {
                                console.error('error running the Select query to find the source_contexts from source_contexts table', err);
                                assert.fail(0, 1, 'error running Query.');
                            }
                            var POAffStatusDBID = POAffStatusTbl.rows[0].id;
                         //   console.log("SELECT count(*) from po_affiliations where person_id = " + personDBID + " and organization_id = " + orgDBID);
                            client.query("SELECT count(*) from po_affiliations where person_id = " + personDBID + " and organization_id = " + orgDBID, function (err, personOrgCnt) {
                                    if (err) {
                                        console.error('error running the Select query to find the po_affiliations from po_affiliations table', err);
                                        assert.fail(0, 1, 'error running Query.');
                                    }
                                    if (personOrgCnt.rows[0].count === '0') {
                                        console.log('******  Person Organization affiliation does not exist, so Inserting it.');
                                        client.query('insert into po_affiliations VALUES (' +
                                        'DEFAULT,' +
                                        personDBID + ',' +
                                        orgDBID + ',' +
                                        POAffStatusDBID + ',' +
                                        'current_timestamp,' +
                                        'current_timestamp,' +
                                        'uuid_in(md5(random()::text || now()::text)::cstring),' +
                                        '0,' +
                                        'current_timestamp,' +
                                        'NULL)', function (err) {
                                            if (err) {
                                                console.error('error running the Insert query to insert the Person Organization affiliation in po_affiliations table', err);
                                                assert.fail(0, 1, 'error running Query.');
                                            }
                                        });
                                    }

                                    client.on('end', function () {
                                        console.log("Client was disconnected.")
                                    });
                                });
                        });
                    });
                });
            });
        });
    };


    this.dbConnVerifyTrialTblSingleItem = function (NCIID, trialTblColumn,valueToVerify,  err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select " + trialTblColumn + " as columnvalue from trials where nci_id = '" + NCIID + "'", function (err, trialIDTrialTbl) {
            if (err) {
                console.error('error running the Select query to find the TrialID from trial table', err);
                assert.fail(0, 1, 'error running Query.');
            }
            var trialColValue = trialIDTrialTbl.rows[0].columnvalue;
            console.log('Trial Column value for Selected column: ' + trialTblColumn + ' is: ' + trialColValue);
            if(moment(trialColValue).isValid()) {
                console.log('Column value is a Date Type');
                expect(moment(trialColValue).format('YYYY-MM-DD')).to.equal(valueToVerify, 'Verification of Trial Column value for Selected column: ' + trialTblColumn);
            }
            else {
                expect(trialColValue).to.equal(valueToVerify, 'Verification of Trial Column value for Selected column: ' + trialTblColumn);
            }
                    client.on('end', function () {
                        console.log("Client was disconnected.")
                    });
                });
    };

};
module.exports = dbConnection;