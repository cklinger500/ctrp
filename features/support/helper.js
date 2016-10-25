/**
 * Created by singhs10 on 7/31/15.
 * Updated by Shamim Ahmed
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var util = require('util');
var fs = require('fs');
var junit = require('cucumberjs-junitxml');
var assert = require('assert');


/**
 * Usage: wait(element, label)
 * element : It will wait for this element to come into view
 * label : just used for the error message
 */
var helper = function() {

    this.verifyLoginName = element(by.binding('headerView.username'));

    var exp_del_bttn_pg_hdr = 'Delete button on Organization page';
    var header_Page_Text = 'Clinical Trials Reporting Program';
    var retTextAndSelectedValue = '';
    var retListCurrentValue = '';
    var retTextCurrentValue = '';
    this.header_Page = element(by.css('.sub-title')); //element(by.css('span[style="font-size:large;font-weight:bold;"]'));
    var self = this;

    this.wait = function (element, label) {
        browser.wait(function () {
            return element.isPresent().then(function (state) {
                if (state === true) {
                    return element.isDisplayed().then(function (state2) {
                        return state2 === true;
                    });
                } else {
                    return false;
                }
            });
        }, 10000, label + " did not appear");
        browser.sleep(250);
    };

    this.setValue = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        fieldName.clear();
        fieldName.sendKeys(fieldValue);
        if(fieldValue == '[object Object]'){    //Shilpi: This has been added here to resolve the promise return by dynamic creation of value
        var store = fieldName.getAttribute('value');
        fieldValue.then(function(value){
            console.log(errorMessage + ' ' + value + " Value entered");
            expect(store).to.eventually.equal(value);});
        }
        else {
            console.log(errorMessage + ' ' + fieldValue + " Value entered");
            expect(fieldName.getAttribute('value')).to.eventually.equal(fieldValue, errorMessage);
        }
    };

/*
    this.selectValue = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        fieldName.$('[value="' + fieldValue + '"]').click();
        console.log(errorMessage + ' ' + fieldValue + " Value selected");
        expect(fieldName.getAttribute('value')).to.eventually.equal(fieldValue);
      //  element(by.model('orgDetailView.curOrg.country')).$('option:checked').getText()
     //   expect(fieldName.$('option:checked').getText()).to.eventually.equal(fieldValue);

    }; */

    this.selectValueFromList = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        fieldName.element(by.cssContainingText('option', fieldValue)).click();
        console.log(errorMessage + ' ' + fieldValue + " Value selected");
        fieldName.$('option:checked').getText().then(function (value){
            console.log('Value of item selected in list : ' + value.trim());
            expect(value.trim()).to.equal(fieldValue, errorMessage);
        });
    };

    this.selectDisableValueFromList = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        fieldName.element(by.cssContainingText('option', fieldValue)).click();
        console.log(errorMessage + ' ' + fieldValue + " Value selected");
    };

    this.selectValue = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        fieldName.click();
        console.log(errorMessage + ' ' + fieldValue + " Value selected");
        expect(fieldName.getText()).to.eventually.equal(fieldValue, errorMessage);
    };

    this.clickLink = function (link, errorMessage){
        this.wait(link, errorMessage);
        link.click();
        console.log(errorMessage + " was clicked");
        self.alertDialog('OK', '');
        expect(this.header_Page.getText()).to.eventually.equal(header_Page_Text);
    };

    this.clickLinkByIndex = function (link, index, errorMessage){
        this.wait(link.get(index), errorMessage);
        link.get(index).click();
        console.log(errorMessage + " was clicked");
        self.alertDialog('OK', '');
        expect(this.header_Page.getText()).to.eventually.equal(header_Page_Text);
    };

    this.clickButton = function (button, errorMessage){
        this.wait(button, errorMessage);
        button.click();
        console.log(errorMessage + " was clicked");
        if (errorMessage === exp_del_bttn_pg_hdr){
            console.log("Page header does not exists on the popup dialog box");
        } else {
          //  expect(this.header_Page.getText()).to.eventually.equal(header_Page_Text);
            //expect(this.verifyLoginName.getText()).to.eventually.equal(browser.params.login.user_admin);
        }
    };

    this.clickButtonByIndex = function (button, index, errorMessage){
        this.wait(button.get(index), errorMessage);
        button.get(index).click();
        console.log(errorMessage + " was clicked");
    };

    this.clickButtonNoHeader = function (button, errorMessage){
        this.wait(button, errorMessage);
        button.click();
        console.log(errorMessage + " was clicked");
    };

    this.clickButtonNoHeaderIndex = function (button, index, errorMessage){
       // this.wait(button, errorMessage);
        button.get(index).click();
        console.log(errorMessage + " was clicked");
    };

    this.clickRadioButton = function (button, value, errorMessage){
        if (value === '0') {
            button.get(0).click();
            console.log(errorMessage + " was clicked");
            expect(button.get(0).isSelected()).to.eventually.equal(true, errorMessage);
        }
        else if (value === '1') {
            button.get(1).click();
            console.log(errorMessage + " was clicked");
            expect(button.get(1).isSelected()).to.eventually.equal(true, errorMessage);
        }
        else if (value === '2') {
            button.get(2).click();
            console.log(errorMessage + " was clicked");
            expect(button.get(2).isSelected()).to.eventually.equal(true, errorMessage);
        }
        else {
            assert.fail(value, '0 OR 1 OR 2 OR Yes OR No OR Actual OR Anticipated', 'Value -- ' + value + ' --' + ' not found as Radio option button');
        }
    };

    this.setUploadedFile = function (fieldName, fieldValue, getFileNm, errorMessage) {
        this.wait(fieldName, errorMessage);
        //fieldName.clear();
        fieldName.sendKeys(fieldValue);
        if(fieldValue == '[object Object]'){
            var store = fieldName.getAttribute('value');
            getFileNm.then(function(value){
                console.log(errorMessage + ' ' + value + " Value entered");
                expect(store).to.eventually.equal(value);});
        }
        else {
            console.log(errorMessage + ' ' + fieldValue + " Value entered");
            expect(fieldName.getAttribute('value')).to.eventually.equal((getFileNm));
        }
    };

    this.setCommentValue = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        fieldName.clear();
        fieldName.sendKeys(fieldValue);
    };

    this.setReadOnlyFieldValue = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        fieldName.sendKeys(fieldValue);
    };


    this.getValue = function (fieldName, errorMessage) {
        this.wait(fieldName, errorMessage);
        fieldName.getAttribute('value');
        console.log(errorMessage + " - Got value");
    };

    this.getVerifyValue = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        expect(fieldName.getAttribute('value')).to.eventually.equal(fieldValue, errorMessage);
        console.log(errorMessage + " - Got value");
    };

    this.getVerifyListValue = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        expect(fieldName.$('option:checked').getText()).to.eventually.equal(fieldValue, errorMessage);
        console.log(errorMessage + " - Got value");
    };

    this.getVerifyRadioSelection = function(button, fieldValue, errorMessage){
        this.wait(button, errorMessage);
        expect(button.get(fieldValue).isSelected()).to.eventually.equal(true, errorMessage);
        console.log(errorMessage + " - Got value");
    }

    this.getVerifyheader = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        expect(fieldName.getText()).to.eventually.equal(fieldValue, errorMessage);
        console.log(errorMessage + " - header value");
    };

    this.getVerifyRequired = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        expect(fieldName.getText()).to.eventually.equal(fieldValue, errorMessage);
        console.log(errorMessage + " - Required field value");
    };

    this.getVerifyLabel= function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        expect(fieldName.getText()).to.eventually.equal(fieldValue,errorMessage );
        console.log(errorMessage + " - field value");
    };

    this.getVerifyLabelUP= function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        fieldName.getText().then(function(value){
        expect(value.toUpperCase()).to.equal(fieldValue.toUpperCase(), errorMessage);
        console.log(errorMessage + " - field value");
        });
    };

    this.verifyElementPresents =function (fieldName, fieldValueTrueOrFalse) {
        expect(fieldName.isPresent()).to.eventually.equal(fieldValueTrueOrFalse);
    };

    this.verifyElementDisplayed =function (fieldName, fieldValueTrueOrFalse) {
        expect(fieldName.isDisplayed()).to.eventually.equal(fieldValueTrueOrFalse);
        //expect(fieldName.isDisplayed()).to.become(fieldValueTrueOrFalse);
    };

    this.verifyElementDisplayedByIndex =function (fieldName, index, fieldValueTrueOrFalse) {
        expect(fieldName.get(index).isDisplayed()).to.eventually.equal(fieldValueTrueOrFalse);
    };


    this.verifyTableRowText = function (tbleRowIdentifier, expectedTblRwVal, errorMessage) {
        this.wait(tbleRowIdentifier, errorMessage);
        expect(tbleRowIdentifier.getText()).to.eventually.equal(expectedTblRwVal);
        console.log(errorMessage + " - Table Row value(s)");
    };

    this.getListOptionsValue = function(listName){
        var j = 0;
        var textList = [];
        var text = '';
        var myLists = listName;
        myLists.count().then(function(count){
            console.log('List Options Count: '+count);
            myLists.each(function(element, index){
                element.getText().then(function(text){
                    textList[j++] = text
                    return text;
                });
            });
        });
    };

    this.pageRefresh = function () {
        browser.refresh();
    };

    this.wait_for = function (enterTm){
        browser.sleep(enterTm);
    };

    this.objToStringAll = function (obj) {
        var str = '';
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str += p + '::' + obj[p] + '\n';
            }
        }
        return str;
    };

    this.objToString = function (obj) {
        var j=''+obj+'';
        JSON.stringify(j);
        return j;
    };

    this.alertDialog= function(action, textToVerify){
        var alertDialog = browser.switchTo().alert();
            alertDialog.then(
                function(){
                    if(textToVerify !== '') {
                        alertDialog.getText().then(function (value) {
                            console.log('value of alert dialog' + value);
                            expect(value).to.equal(textToVerify);
                        });
                    }
                    if (action.toUpperCase() === 'ACCEPT') {
                        alertDialog.accept();
                    }
                    else if (action.toUpperCase() === 'OK') {
                        alertDialog.accept();
                    }
                    else if (action.toUpperCase() === 'DISMISS') {
                        alertDialog.dismiss();
                    }
                    else   {
                        assert.fail(0,1,'Option not found');
                    }
            },
                function (err) {
                 //   console.log('Alert box' + err);
                }
            );
    };

    this.listTextValue = function (obj) {
        var propList = "";
        for(var propName in obj) {
            if(typeof(obj[propName]) != "undefined") {
                propList += (propName + ", ");
            }
        }
        obj.$('option:checked').getText().then (function(text){
            var pasTxtValue = ''+text+'';
            console.log('Object['+ obj +'] current value:['+ pasTxtValue +']');
            function retTxtVal(){
                return pasTxtValue;
            }
            retListCurrentValue = retTxtVal();
            console.log('retTextAndSelectedValue['+ retListCurrentValue +']');
            return retListCurrentValue;
        });
    };

    this.objTextValue = function (obj) {
        var propList = "";
        for(var propName in obj) {
            if(typeof(obj[propName]) != "undefined") {
                propList += (propName + ", ");
            }
        }
        obj.getText().then (function(text){
            var pasTxtValue = ''+text+'';
            console.log('Object['+ obj +'] current value:['+ pasTxtValue +']');
            function retTxtVal(){
                return pasTxtValue;
            }
            retTextCurrentValue = retTxtVal();
            console.log('retTextAndSelectedValue['+ retTextCurrentValue +']');
            return retTextCurrentValue;
        });
    };

    this.retValVerification = function (objt, objtType, expectedValue){
        try {
            console.log("You see", this.retValVerificationM(objt, objtType, expectedValue));
        } catch (error) {
            console.log("Something went wrong: " + error);
        }
    }


    this.retValVerificationM = function(obj, objType, expectedVal){
        var actualVal;
        if (objType === 'list'){
            var propList = "";
            for(var propName in obj) {
                if(typeof(obj[propName]) != "undefined") {
                    propList += (propName + ", ");
                }
            }
            obj.$('option:checked').getText().then (function(text){
                var pasTxtValue = ''+text+'';
                console.log('Object['+ obj +'] current value:['+ pasTxtValue +']');
                function retTxtVal(){
                    return pasTxtValue;
                }
                retTextAndSelectedValue = retTxtVal();
                console.log('retTextAndSelectedValue['+ retTextAndSelectedValue +']');
                actualVal = ''+ retTextAndSelectedValue +'';
                if (expectedVal === retTextAndSelectedValue){
                    expect(obj.$('option:checked').getText()).to.eventually.equal(expectedVal);
                    console.log('Successfully verified the expected value:['+ expectedVal +'] with the actual value:['+ retTextAndSelectedValue +'], Test steps PASSED');
                    return true;
                } else {
                    try{
                        console.error('Unable to verify the expected value:['+ expectedVal +'] with the actual value:['+ retTextAndSelectedValue +'], Test steps FAILED');
                        expectedVal === retTextAndSelectedValue ? callback() : callback.fail();
                        return false;
                    } catch (error){
                        console.error('Test steps FAILED, ' + error);
                    }
                };
            });
        };
        if (objType === 'text'){
            var propList = "";
            for(var propName in obj) {
                if(typeof(obj[propName]) != "undefined") {
                    propList += (propName + ", ");
                }
            }
            obj.getText().then (function(text){
                var pasTxtValue = ''+text+'';
                console.log('Object['+ obj +'] current value:['+ pasTxtValue +']');
                function retTxtVal(){
                    return pasTxtValue;
                }
                retTextAndSelectedValue = retTxtVal();
                console.log('retTextAndSelectedValue['+ retTextAndSelectedValue +']');
                actualVal = ''+ retTextAndSelectedValue +'';
                if (expectedVal === retTextAndSelectedValue){
                    expect(obj.$('option:checked').getText()).to.eventually.equal(expectedVal);
                    console.log('Successfully verified the expected value:['+ expectedVal +'] with the actual value:['+ retTextAndSelectedValue +'], Test steps PASSED');
                    return true;
                } else {
                    try{
                        console.error('Unable to verify the expected value:['+ expectedVal +'] with the actual value:['+ retTextAndSelectedValue +'], Test steps FAILED');
                        expectedVal === retTextAndSelectedValue ? callback() : callback.fail();
                        return false;
                    } catch (error){
                        console.error('Test steps FAILED, ' + error);
                    }
                };
            });
        };
    };

    this.waitNonAngularPage = function (element, label) {
        browser.driver.wait(function () {
            return browser.driver.isElementPresent(element).then(function (state) {
                if (state === true) {
                    return  browser.driver.findElement(element).isDisplayed().then(function (state2) {
                        return state2 === true;
                    });
                } else {
                    return false;
                }
            });
        }, 10000, label + " did not appear");
        browser.sleep(250);
    };

    this.setValueNonAngularPage = function (fieldName, fieldValue, errorMessage) {
        this.waitNonAngularPage(fieldName, errorMessage);
        browser.driver.findElement(fieldName).clear();
        browser.driver.findElement(fieldName).sendKeys(fieldValue);
        console.log(errorMessage + ' ' + fieldValue + " Value entered");
        expect(browser.driver.findElement(fieldName).getAttribute('value')).to.eventually.equal((fieldValue));
    };

    this.clickButtonNonAngularPage = function (button, errorMessage) {
        this.waitNonAngularPage(button, errorMessage);
        browser.driver.findElement(button).click();
        console.log(errorMessage + " was clicked");
    };

    this.writeScreenShot = function (data, filename) {
        var stream = fs.createWriteStream(filename);

        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }

};
module.exports = helper;
