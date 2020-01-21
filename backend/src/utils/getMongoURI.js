module.exports = function getMongoURI() {
  const { DB_USER, DB_PASS, DB_CLUSTER, DB_NAME } = process.env;
  return `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
};
