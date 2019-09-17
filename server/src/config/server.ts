export const serverInitialEnvironment = () => {
  return {
    PORT: process.env.PORT || 5000,
  }
}
