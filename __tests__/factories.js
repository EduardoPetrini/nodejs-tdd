const { factory } = require('factory-girl');
const { User } = require('../src/app/models');

factory.define('User', User, {
  name: 'Dudu Test',
  email: 'test@petrini.com',
  password: '123456'
});

module.exports = factory;