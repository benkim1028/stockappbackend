module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateCompany {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Company {
  id: ID!
  createdAt: DateTime!
  ticker: String!
  marketCap: String!
  enterpriseVal: String!
  trailingPE: String!
  forwardPE: String!
  pegRatio: String!
}

type CompanyConnection {
  pageInfo: PageInfo!
  edges: [CompanyEdge]!
  aggregate: AggregateCompany!
}

input CompanyCreateInput {
  id: ID
  ticker: String!
  marketCap: String!
  enterpriseVal: String!
  trailingPE: String!
  forwardPE: String!
  pegRatio: String!
}

type CompanyEdge {
  node: Company!
  cursor: String!
}

enum CompanyOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  ticker_ASC
  ticker_DESC
  marketCap_ASC
  marketCap_DESC
  enterpriseVal_ASC
  enterpriseVal_DESC
  trailingPE_ASC
  trailingPE_DESC
  forwardPE_ASC
  forwardPE_DESC
  pegRatio_ASC
  pegRatio_DESC
}

type CompanyPreviousValues {
  id: ID!
  createdAt: DateTime!
  ticker: String!
  marketCap: String!
  enterpriseVal: String!
  trailingPE: String!
  forwardPE: String!
  pegRatio: String!
}

type CompanySubscriptionPayload {
  mutation: MutationType!
  node: Company
  updatedFields: [String!]
  previousValues: CompanyPreviousValues
}

input CompanySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CompanyWhereInput
  AND: [CompanySubscriptionWhereInput!]
  OR: [CompanySubscriptionWhereInput!]
  NOT: [CompanySubscriptionWhereInput!]
}

input CompanyUpdateInput {
  ticker: String
  marketCap: String
  enterpriseVal: String
  trailingPE: String
  forwardPE: String
  pegRatio: String
}

input CompanyUpdateManyMutationInput {
  ticker: String
  marketCap: String
  enterpriseVal: String
  trailingPE: String
  forwardPE: String
  pegRatio: String
}

input CompanyWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  ticker: String
  ticker_not: String
  ticker_in: [String!]
  ticker_not_in: [String!]
  ticker_lt: String
  ticker_lte: String
  ticker_gt: String
  ticker_gte: String
  ticker_contains: String
  ticker_not_contains: String
  ticker_starts_with: String
  ticker_not_starts_with: String
  ticker_ends_with: String
  ticker_not_ends_with: String
  marketCap: String
  marketCap_not: String
  marketCap_in: [String!]
  marketCap_not_in: [String!]
  marketCap_lt: String
  marketCap_lte: String
  marketCap_gt: String
  marketCap_gte: String
  marketCap_contains: String
  marketCap_not_contains: String
  marketCap_starts_with: String
  marketCap_not_starts_with: String
  marketCap_ends_with: String
  marketCap_not_ends_with: String
  enterpriseVal: String
  enterpriseVal_not: String
  enterpriseVal_in: [String!]
  enterpriseVal_not_in: [String!]
  enterpriseVal_lt: String
  enterpriseVal_lte: String
  enterpriseVal_gt: String
  enterpriseVal_gte: String
  enterpriseVal_contains: String
  enterpriseVal_not_contains: String
  enterpriseVal_starts_with: String
  enterpriseVal_not_starts_with: String
  enterpriseVal_ends_with: String
  enterpriseVal_not_ends_with: String
  trailingPE: String
  trailingPE_not: String
  trailingPE_in: [String!]
  trailingPE_not_in: [String!]
  trailingPE_lt: String
  trailingPE_lte: String
  trailingPE_gt: String
  trailingPE_gte: String
  trailingPE_contains: String
  trailingPE_not_contains: String
  trailingPE_starts_with: String
  trailingPE_not_starts_with: String
  trailingPE_ends_with: String
  trailingPE_not_ends_with: String
  forwardPE: String
  forwardPE_not: String
  forwardPE_in: [String!]
  forwardPE_not_in: [String!]
  forwardPE_lt: String
  forwardPE_lte: String
  forwardPE_gt: String
  forwardPE_gte: String
  forwardPE_contains: String
  forwardPE_not_contains: String
  forwardPE_starts_with: String
  forwardPE_not_starts_with: String
  forwardPE_ends_with: String
  forwardPE_not_ends_with: String
  pegRatio: String
  pegRatio_not: String
  pegRatio_in: [String!]
  pegRatio_not_in: [String!]
  pegRatio_lt: String
  pegRatio_lte: String
  pegRatio_gt: String
  pegRatio_gte: String
  pegRatio_contains: String
  pegRatio_not_contains: String
  pegRatio_starts_with: String
  pegRatio_not_starts_with: String
  pegRatio_ends_with: String
  pegRatio_not_ends_with: String
  AND: [CompanyWhereInput!]
  OR: [CompanyWhereInput!]
  NOT: [CompanyWhereInput!]
}

input CompanyWhereUniqueInput {
  id: ID
  ticker: String
}

scalar DateTime

scalar Long

type Mutation {
  createCompany(data: CompanyCreateInput!): Company!
  updateCompany(data: CompanyUpdateInput!, where: CompanyWhereUniqueInput!): Company
  updateManyCompanies(data: CompanyUpdateManyMutationInput!, where: CompanyWhereInput): BatchPayload!
  upsertCompany(where: CompanyWhereUniqueInput!, create: CompanyCreateInput!, update: CompanyUpdateInput!): Company!
  deleteCompany(where: CompanyWhereUniqueInput!): Company
  deleteManyCompanies(where: CompanyWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  company(where: CompanyWhereUniqueInput!): Company
  companies(where: CompanyWhereInput, orderBy: CompanyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Company]!
  companiesConnection(where: CompanyWhereInput, orderBy: CompanyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CompanyConnection!
  node(id: ID!): Node
}

type Subscription {
  company(where: CompanySubscriptionWhereInput): CompanySubscriptionPayload
}
`
      }
    