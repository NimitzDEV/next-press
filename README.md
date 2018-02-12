# NextPress?

practice project build with the following technologies:

- [NextJs](https://github.com/zeit/next.js) (Server-Side-Rendered React)
- [GraphQL](https://github.com/facebook/graphql) (With Server-Side-Rendered functionality too)
- [Apollo GraphQL](https://github.com/apollographql)
- [MongoDB](https://github.com/mongodb/mongo)
- [Mongoose](https://github.com/Automattic/mongoose)
- [Styled-Components](https://github.com/styled-components/styled-components)
- [Bulma](https://github.com/jgthms/bulma)
- [react-markdown](https://github.com/rexxars/react-markdown)
- [restify](https://github.com/restify/node-restify)
- [Json Web Token](https://github.com/auth0/node-jsonwebtoken)

Other

- Disqus support 

Majority of the functions haven't implemented yet. like admin control panel, and a lot of bugs.

## How to build

For production environment, build first by using `yarn build` or `npm run build`

## Dev Mode

Install nodemon first

`npm install nodemon --global`

then run

`yarn dev`

## Project Structure

Kind of messy right now

```
.
├── components	# components like page elements, apollo server render relative libs
├── pages		# blog pages
├── server		# server relative functions like graphql and mongodb schema, jwt auth libs
├── static		# static files
├── tools		# helpers
├── config.js
└── README.md
```