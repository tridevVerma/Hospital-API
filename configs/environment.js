// constants for production environment
const production = {
  name: "development",
  mongodb_URI: `mongodb+srv://${process.env.HOSPITAL_API_USERNAME}:${process.env.HOSPITAL_API_PASSWORD}@cluster0.1jzw8q5.mongodb.net/${process.env.HOSPITAL_API_DB_NAME}?retryWrites=true&w=majority`,
  db_name: process.env.HOSPITAL_API_DB_NAME,
  server_port: 8000,
  mongodb_port: 27017,
  jwt_key: process.env.HOSPITAL_API_JWT_KEY,
};

module.exports = production;
