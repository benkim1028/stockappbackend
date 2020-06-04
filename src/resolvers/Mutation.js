const yahoo = require('../apis/yahoo_finance');

function getCompany(root, args, context, info) {
    var promise_yahoo = yahoo.getQuote(args.ticker);
    return promise_yahoo.then(company => {
        console.log(company);
        let companyInfo = {
            ticker: args.ticker,
            marketCap: company["Valuation Measures"]["Market Cap (intraday) 5"],
            enterpriseVal: company["Valuation Measures"]["Enterprise Value 3"],
            trailingPE: company["Valuation Measures"]["Trailing P/E "],
            forwardPE: company["Valuation Measures"]["Forward P/E 1"],
            pegRatio: company["Valuation Measures"]["PEG Ratio (5 yr expected) 1"]
        }
        return context.prisma.upsertCompany({
            where:{ticker: args.ticker},
            update: companyInfo,
            create: companyInfo
        })
    });
}

function getCompanies(root, args, context, info) {
    var promises = [];
    args.tickers.map((ticker) => promises.push(yahoo.getQuote(ticker)));
    return Promise.all(promises).then(allCompany => {
        let companies = [];
        allCompany.map((company) =>{
            let companyInfo = {
                ticker: args.ticker,
                marketCap: company["Valuation Measures"]["Market Cap (intraday) 5"],
                enterpriseVal: company["Valuation Measures"]["Enterprise Value 3"],
                trailingPE: company["Valuation Measures"]["Trailing P/E "],
                forwardPE: company["Valuation Measures"]["Forward P/E 1"],
                pegRatio: company["Valuation Measures"]["PEG Ratio (5 yr expected) 1"]
            }
            companies.push(context.prisma.upsertCompany({
                where:{ticker: args.ticker},
                update: companyInfo,
                create: companyInfo
            }))
        })
        return companies;
    });
}

function deleteCompanyFromWatchList(root, args, context, info){
    let deleteTickers = [];
    args.tickers.map((ticker) => deleteTickers.push({ticker: ticker}));
    return context.prisma.updateWatchList({
        where: {name: args.name},
        data: {
            companies: {
                delete: deleteTickers
            }
        }
    });
}
//disconnect selected watchlists from the user.
//if disconnected watchlist is not connected to any user, it will be deleted.
function deleteWatchListFromUser(root, args, context, info){
    const watchList = context.prisma.deleteWatchList({
        name: args.watchlistName
    })
    return watchList;
    // context.prisma.updateUser({
    //     where: {username: args.username},
    //     data: {
    //         watchLists: {
    //             disconnect: {name: args.watchlistName}
    //         }
    //     }
    // })


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
    getCompanies,
    createWatchList,
    createUser,
    deleteCompanyFromWatchList,
    deleteWatchListFromUser
}