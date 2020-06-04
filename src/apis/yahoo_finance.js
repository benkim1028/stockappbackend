var puppeteer = require('puppeteer');

module.exports = {
    getQuote: async function(ticker){
        console.log("Yahoo_Finance - Getting information of " + ticker);
        const browser = await puppeteer.launch({
            headless:true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        let url = `https://ca.finance.yahoo.com/quote/${ticker}/key-statistics?p=${ticker}`;
        await page.goto(url);

        await page.waitFor('#quote-market-notice', {timeout: 1000});

        var response = await page.evaluate(() => {
            let element = document.querySelector("#Col1-0-KeyStatistics-Proxy > section > div.Mstart\\(a\\).Mend\\(a\\)").childNodes;
            let dataJson = {};


            function extractFinanceData(parent){
                let dataArray = Array.from(parent.querySelectorAll('td'), children => {
                    return children.textContent;
                });
                let dataJson = {};
                let count = 0;
                while(count <= dataArray.length - 1){
                    dataJson[dataArray[count]] = dataArray[count + 1];
                    count = count + 2;
                }
                return dataJson;
            }
            dataJson[element[0].firstChild.textContent] = extractFinanceData(element[0]);
            dataJson[element[1].firstChild.textContent] = extractFinanceData(element[1]);
            dataJson[element[2].firstChild.textContent] = extractFinanceData(element[2]);
            return dataJson;
        });
        await browser.close();
        response["ticker"] = ticker;
        return response;
    }
}
