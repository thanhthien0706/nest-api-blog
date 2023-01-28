export default () => ({
  PORT_APP: process.env.PORT || 3000,
  DATABASE: {
    TYPE: process.env.DATABASE_TYPE || 'mysql',
    HOST: process.env.DATABASE_HOS || '127.0.0.1',
    PORT: process.env.DATABASE_PORT || '3308',
    USER: process.env.DATABASE_USER || 'root',
    PASSWORD: process.env.DATABASE_PASSWORD || '123456',
    NAME: process.env.DATABASE_NAME || 'db-nest-blog',
  },
  SECRET_KEY: process.env.SECRET_KEY,
});
