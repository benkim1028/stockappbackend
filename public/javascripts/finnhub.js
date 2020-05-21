var request = require('request');
var axios = require('axios');

var tradierURL = "https://sandbox.tradier.com/v1/";
var tradierToken = "gPMu8jLSKfWDNXYCSHAmHVyKgwOO";

module.exports = {
    getFinancialInfo : function (ticker) {
      return axios.get('https://finnhub.io/api/v1/stock/financials-reported?symbol='+ ticker +'&token=bqq822frh5re9mjl1gm0') ;
    },
    getQuote: function (ticker) {
        return axios.get('https://finnhub.io/api/v1/quote?symbol=' + ticker + '&token=bqq822frh5re9mjl1gm0');
    },
    getGrowth: function (ticker) {
        return axios.get('https://finnhub.io/api/v1/stock/metric?symbol=' + ticker + '&metric=growth&token=bqq822frh5re9mjl1gm0');
    },
    getPriceMetric: function (ticker) {
        request('https://finnhub.io/api/v1/stock/metric?symbol=' + ticker + '&metric=price&token=bqq822frh5re9mjl1gm0', {json: true}, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(res.body);
        });
    },
    getPerShare: function (ticker) {
        return axios.get('https://finnhub.io/api/v1/stock/metric?symbol=' + ticker + '&metric=perShare&token=bqq822frh5re9mjl1gm0');
    },
    getFinancialStrength: function (ticker) {
        request('https://finnhub.io/api/v1/stock/metric?symbol=' + ticker + '&metric=financialStrength&token=bqq822frh5re9mjl1gm0', {json: true}, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(res.body);
        });
    },
    getPE: function (ticker) {
        request('https://finnhub.io/api/v1/stock/earnings?symbol=' + ticker + '&token=bqq822frh5re9mjl1gm0', {json: true}, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(res.body);
        });
    },
    getProfile: function (ticker) {
        return axios.get('https://finnhub.io/api/v1/stock/profile2?symbol=' + ticker + '&token=bqq822frh5re9mjl1gm0')
    },
    getEarningCalander: function (ticker) {
        request('https://finnhub.io/api/v1/calendar/earnings?symbol=' + ticker + '&from=2019-05-07&to=2020-05-07&token=bqq822frh5re9mjl1gm0', {json: true}, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(res.body);
        });
    },
    getEarningEstimate: function (ticker) {
        request('https://finnhub.io/api/v1/stock/eps-estimate?freq=annual&symbol=' + ticker + '&token=bqq822frh5re9mjl1gm0', {json: true}, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(res.body);
        });
    },
}
