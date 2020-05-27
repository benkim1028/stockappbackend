const yahoo = require('../apis/yahoo_finance');

function getCompany(root, args, context, info) {
    var promise_yahoo = yahoo.getQuote(args.ticker);
    return promise_yahoo.then(company => {
        return context.prisma.createCompany({
            ticker: args.ticker,
            marketCap: company["Valuation Measures"]["Market Cap (intraday) 5"],
            enterpriseVal: company["Valuation Measures"]["Enterprise Value 3"],
            trailingPE: company["Valuation Measures"]["Trailing P/E "],
            forwardPE: company["Valuation Measures"]["Forward P/E 1"],
            pegRatio: company["Valuation Measures"]["PEG Ratio (5 yr expected) 1"]
        })
    });
}

async function createWatchList(root, args, context, info) {
    let watchlist = await context.prisma.createWatchList({
        name: args.name,
        companies: {create:[]},
        user: {connect: {username: args.username}}
    })
    let user = await context.prisma.updateUser({
        where: {username: args.username},
        data: {watchLists: {connect: {name: watchlist.name}}}
    })
    console.log(watchlist);
    console.log(user);
    return watchlist;
}

function createUser(root, args, context, info) {
    return context.prisma.createUser({
        username: args.username,
        companies: {create: []},
        watchLists: {create: []}
    })
}


module.exports = {
    getCompany,
    createWatchList,
    createUser
}