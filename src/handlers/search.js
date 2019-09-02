const userPreferencesModel = require('../models/userPreferences')
const { filterForPreferences, search: searchMovies } = require('../models/movies')
const { sortAlphabetically, mapNames, top3 } = require('../utils/utils')

const search = async ({ pathParameters: { userId }, queryStringParameters: { text: searchString } }) => {
  const userPreferences = userPreferencesModel.get(userId)

  if (!userPreferences) {
    return {
      statusCode: 404,
      body: 'User not found'
    }
  }

  const searchStrings = searchString.split(',')
  const matchingMovies = searchMovies(searchStrings)

  const sortedMovies = sortAlphabetically(matchingMovies)
  const preferredMovies = filterForPreferences(userPreferences, sortedMovies)

  const preferredMovieTitles = mapNames(preferredMovies)
  const matchingMovieTitles = mapNames(sortedMovies)

  const userTop3 = top3(preferredMovieTitles)
  const searchTop3 = top3(matchingMovieTitles)

  return {
    statusCode: 200,
    body: JSON.stringify([...userTop3, ...searchTop3])
  }
}

module.exports = {
  search
}