const express = require('express');
const graphqlHTTP = require('express-graphql');

const PORT = process.env.PORT || 4000;
const schema = require('./schema');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, () => {
    console.log('Server started at port: ', PORT);
});