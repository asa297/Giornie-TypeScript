export const databaseCredential = () => {
  return {
    MONGO_URL: process.env.MONGO_URL,
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  }
}
