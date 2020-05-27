const mutation = require('./Mutation');

async function getCompanyByTicker(root, args, context, info) {
    let company = await context.prisma.company({ticker: args.ticker});
    if (company == null) company = await mutation.getCompany(root, args, context);
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

function getCompaniesByWatchlistName(root, args, context, info) {
    let companies = context.prisma.watchList({name: args.name}).companies();
    return companies;
}

module.exports = {
    getCompanyByTicker,
    getWatchlistByName,
    getCompaniesByWatchlistName,
    getUser
}