const userPreferencesModel = require('../models/userPreferences')
const { filterForPreferences } = require('../models/movies')
const { sortAlphabetically, mapNames, top3 } = require('../utils/utils')

const recommended = () => {
  const usersPreferences = userPreferencesModel.list()

  return Object.entries(usersPreferences).map(([id, userPreferences]) => {
    const preferredMovies = filterForPreferences(userPreferences)
    const sortedMovies = sortAlphabetically(preferredMovies)
    const recommendedMovieTitles = mapNames(sortedMovies)

    return {
      user: id,
      movies: top3(recommendedMovieTitles)
    }
  })
}

const results = recommended()

console.log(results)
