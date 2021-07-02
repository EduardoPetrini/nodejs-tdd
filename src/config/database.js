require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

console.log(process.env.DB_STORAGE)
module.exports = {
  database: process.env.DB_NAME,
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}