const mutation = require('./Mutation');

async function getCompanyByTicker(root, args, context, info) {
    let company = await context.prisma.company({ticker: args.ticker});
    let updatedAt = company.updatedAt;
    if (company == null || _olderThanOneDay(updatedAt)) company = await mutation.getCompany(root, args, context);
    let watchlist = await context.prisma.updateWatchList({
        where: {name: args.watchlistName},
        data: {
            companies: {
                connect : {id: company.id}
            }
        }
    })
    return company;
}

function getWatchlistByName(root, args, context, info){
    return context.prisma.user({username: args.username}).watchLists();
}

function getUser(root, args, context, info) {
    let user = context.prisma.user({username: args.username});
    return user.then(data => {
        console.log(data)
        if(data == null) return mutation.createUser(root, args, context);
        else return data;
    })
}

async function getCompaniesByWatchlistName(root, args, context, info) {
    let companies = await context.prisma.watchList({name: args.name}).companies();
    for(let i = 0; i < companies.length; i++){
        let updatedAt = companies[i].updatedAt;
        if(_olderThanOneDay(updatedAt)){
            let company = await mutation.getCompany(root, {ticker: companies[i].ticker}, context, info);
            companies[i] = company;
        }
    }
    return companies;
}

function _olderThanOneDay(date){
    let newDate = new Date()
    let oldDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    return oldDate < newDate;
}

module.exports = {
    getCompanyByTicker,
    getWatchlistByName,
    getCompaniesByWatchlistName,
    getUser
}