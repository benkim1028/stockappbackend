const yahoo = require('./apis/yahoo_finance');

const {GraphQLServer} = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
    Query: {
        companyByTicker: (root, args, context, info) => {
            let company = context.prisma.company({ticker: args.ticker});
            return company.then(data => {
                console.log(data);
                if(data == null) return resolvers.Mutation.getCompany(root, args, context);
                else return data;
            });
        },
    },
    Mutation: {
        getCompany: (root, args, context) => {
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
            // return context.prisma.createLink({
            //     url: args.url,
            //     description: args.description,
            // })
        },
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))