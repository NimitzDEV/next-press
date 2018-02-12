const articleTypes = `
type Article {
  _id: ID!
  author: User!
  publishDate: Int
  lastModified: Int
  likes: Int
  title: String!
  content: [ArticleContent]!
}

type ArticleContent {
  processor: String!
  content: String!
}

type User {
  _id: ID!
  name: String!
  desc: String
  email: String
  website: String
}

type Auth {
  token: String
  status: Int!
  msg: String
}

type Mutation {
  postUpvote(id:ID!, likes:Int!): Article
  createToken(username: String!, password: String): Auth
}

type Query{
  articles(skip:Int, limit:Int): [Article]!
  article(id: ID!): Article!
  author(id: ID!): User!
}
`

module.exports = [articleTypes]
