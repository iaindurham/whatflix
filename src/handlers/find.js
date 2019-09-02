const userPreferencesModel = require('../models/userPreferences')
const { filterForPreferences, search: searchMovies } = require('../models/movies')
const { sortAlphabetically, mapNames, top3 } = require('../utils/utils')

const search = (searchString) => {
  // TODO - get id from URL params
  const userPreferences =  userPreferencesModel.get('100')

  if (!userPreferences) {
    // TODO: return 404
  }

  // TODO - get search string from URL params
  const matchingMovies = searchMovies(searchString)

  const sortedMovies = sortAlphabetically(matchingMovies)
  const preferredMovies = filterForPreferences(userPreferences, sortedMovies)

  const preferredMovieTitles = mapNames(preferredMovies)
  const matchingMovieTitles = mapNames(sortedMovies)

  const userTop3 = top3(preferredMovieTitles)
  const searchTop3 = top3(matchingMovieTitles)

  return [ ...userTop3, ...searchTop3 ]

}

const results = search('Ethan Hawke')

console.log(results)
