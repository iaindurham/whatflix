const userPreferencesModel = require('../models/userPreferences')
const { filterForPreferences } = require('../models/movies')
const { sortAlphabetically, mapNames, top3 } = require('../utils/utils')

const recommend = async () => {
  const usersPreferences = userPreferencesModel.list()

  const recommendations = Object.entries(usersPreferences).map(([id, userPreferences]) => {
    const preferredMovies = filterForPreferences(userPreferences)
    const sortedMovies = sortAlphabetically(preferredMovies)
    const recommendedMovieTitles = mapNames(sortedMovies)

    return {
      user: id,
      movies: top3(recommendedMovieTitles)
    }
  })

  return {
    statusCode: 200,
    body: JSON.stringify(recommendations)
  }
}

module.exports = {
  recommend
}
