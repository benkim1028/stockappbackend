var express = require('express');
var puppeteer = require('puppeteer');
var router = express.Router();
var requests = require('../public/javascripts/finnhub');
var yahoo = require('../public/javascripts/yahoo_finance');
var axios = require('axios');
/* GET users listing. */
router.get('/:ticker', function (req, res, next) {
    var ticker = req.params.ticker;

    var promise_yahoo = yahoo.getQuote(ticker);
    promise_yahoo.then(data => res.send(JSON.stringify(data)));
    //
    // var promise = requests.getQuote(ticker);
    // var promise2 = requests.getPerShare(ticker);
    // var promise3 = requests.getGrowth(ticker);
    // var promise4 = requests.getProfile(ticker);
    // var promise5 = requests.getFinancialInfo(ticker);
    // axios.all([promise, promise2, promise3, promise4, promise5])
    //     .then(axios.spread((r1,r2,r3,r4, r5) => {
    //         var response = {};response.profile = r4.data; response.quote = r1.data; response.perShare = r2.data; response.growth = r3.data; response.financialInfo = r5.data;
    //         return response
    //     }))
    //     .then((data) => {
    //             data.pe_includeExtra = data.quote.c / data.perShare.metric.epsInclExtraItemsTTM;
    //             data.pe_excludeExtra = data.quote.c / data.perShare.metric.epsExclExtraItemsTTM;
    //             res.send(JSON.stringify(data, null, "\t"));
    //         }
    //     )
    //     .catch(err => console.log(err));

});

module.exports = router;
