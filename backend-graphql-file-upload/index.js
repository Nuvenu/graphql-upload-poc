const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const {
  GraphQLUpload,
  graphqlUploadExpress,
} = require('graphql-upload');

const typeDefs = gql`
    scalar Upload

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
        caption: String!
    }

    type Query {
        otherFields: Boolean!
    }

    type Mutation {
        singleUpload(file: Upload!, caption: String!): File!
    }
`;

const resolvers = {
  Upload: GraphQLUpload,

  Mutation: {
    singleUpload: async (parent, { file, caption }) => {
      console.log('Caption: ', caption)
      console.log('File: ', file)
      const { filename, mimetype, encoding } = await file;
      console.log('Resolved file: ', filename, mimetype, encoding)
      return { filename, mimetype, encoding, caption };
    },
  },
};

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  const app = express();

  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise(r => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();
