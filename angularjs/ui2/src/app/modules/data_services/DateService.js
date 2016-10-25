/**
 * Created by wangg5 on 7/17/15.
 */

(function() {

    'use strict';
    angular.module('ctrp.module.dataservices')

        .service('DateService', DateService);

        DateService.$inject = ['$log'];

    function DateService($log) {

        var dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

        var monthsDict = {
          1 : 'Jan', 2 : 'Feb', 3 : 'Mar', 4 : 'Apr',
          5 : 'May', 6 : 'Jun', 7 : 'Jul', 8 : 'Aug', 9 : 'Sep',
          10 : 'Oct', 11 : 'Nov', 12 : 'Dec'
        };

        var reverseMonthsDict = {
            'Jan' : 1, 'Feb' : 2, 'Mar' : 3, 'Apr' : 4,
            'May' : 5, 'Jun' : 6, 'Jul' : 7, 'Aug' : 8, 'Sep' : 9,
            'Oct' : 10, 'Nov' : 11, 'Dec' : 12
        };

        //'MMMM dd, yyyy',
        var formats = ['MMMM dd, yyyy', 'dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

        this.getDateOptions = function() {
            return dateOptions;
        }; //getDateOptions


        this.getFormats = function() {
            return formats;
        }; //getFormats


        this.tomorrow = function() {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        };


        this.today = function() {
            return new Date();
        }; //today


        /**
         * Convert ISO Date format to Locale String (e.g. 20-Jan-2015)
         *
         * @param isoDate (e.g. '2011-06-02T09:34:29+02:00')
         */
        this.convertISODateToLocaleDateStr = function(isoDate) {
            var dateStr = '';

            if (!!isoDate) {
                if (moment(isoDate, 'DD-MMM-yyyy', true).isValid()) {
                    dateStr = isoDate;
                } else {
                    var date = moment(isoDate).toDate();
                    //adjust timezone offset * 600000 ms
                    date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
                    //dateStr = date.format("dd-MMM-yyyy");
                    // Add leading zero for single digit date
                    var day = ('0' + date.getDate()).slice(-2);
                    var year = date.getFullYear();
                    var monthNum = date.getMonth() + 1;
                    var month = monthsDict[monthNum];
                    dateStr = day + '-' + month + '-' + year;
                }
            }
            /*
            if (!!isoDate) {
                console.info('isoDate is: ', isoDate);
                // check if isoDate is a Date object
                if (typeof isoDate.getMonth === 'function') {
                    //adjust timezone offset * 600000 ms
                    isoDate = new Date(isoDate.getTime() + isoDate.getTimezoneOffset() * 60000);
                    isoDate = isoDate.toISOString(); // convert date to iso date format string
                }

                try {
                    var date = moment(isoDate); // 'YYYY-MM-DDTHH:mm:ss.SSSSZ'
                    date = date.toDate();
                    var day = ('0' + date.getDate()).slice(-2);
                    var year = date.getFullYear();
                    var monthNum = date.getMonth() + 1;
                    var month = monthsDict[monthNum];
                    dateStr = day + '-' + month + '-' + year;
                } catch (err) {
                    console.error('error parsing date: ', err);
                }
            }
            */

            return dateStr;
        }; //convertISODateToLocale

        /**
         * Convert Locale Date String to ISO Date String
         *
         * @param localeDate
         * @returns {string}
         */
        this.convertLocaleDateToISODateStr = function(localeDate) {
            var dateStr = '';
            if (!!localeDate) {
                var splits = localeDate.toString().split('-');
                var year = splits[2];
                var month = reverseMonthsDict[splits[1]];
                var day = splits[0];
                dateStr = year + '-' + month + '-' + day;
            }
            return dateStr;
        };

        /**
         *
         * Get the date range between two given dates of Date type
         *
         * @param startDate, Date
         * @param endDate, Date
         * @returns {Array}, String
         */
        this.getDateRange = function(startDate, endDate) {
            var dateRangeArray = []; //
            if (startDate && endDate &&
                typeof startDate.getMonth === 'function' &&
                    typeof endDate.getMonth === 'function') {
                //initialize the hours, minutes and seconds
                startDate.setHours(0);
                endDate.setHours(23);
                endDate.setMinutes(59);
                endDate.setSeconds(59);

                var startDateStr = moment(startDate).format('YYYY-MM-DD HH:mm:ss');
                var endDateStr = moment(endDate).format('YYYY-MM-DD HH:mm:ss');
                dateRangeArray[0] = startDateStr;
                dateRangeArray[1] = endDateStr;
            }

            return dateRangeArray;
        }; //getDateRange


        /**
         *
         * Returns an array after formatting date property to specified date format
         *
         * @param dateArray, Array
         * @param dateKey, String
         * @param formatString, String
         * @returns Array
         */
        this.formatDateArray = function (dateArray, dateKey, dateFormat) {
            if (!dateFormat) {
                return;
            }

            _.each(dateArray, function (item) {
                if (moment(item[dateKey], dateFormat, true).isValid()) {
                    item[dateKey] = moment(item[dateKey], dateFormat).format(dateFormat);
                } else {
                    item[dateKey] = moment(item[dateKey]).format('DD-MMM-YYYY')
                }
            });

            return dateArray;
        }
    }

})();
