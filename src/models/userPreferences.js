const preferences = require('../config/userPreferences')

const get = (userId) => preferences[userId]
const list = () => preferences

module.exports = {
  get,
  list
}
