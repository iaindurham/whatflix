const _ = require('lodash')
const moviesDB = require('../config/movies.json')

const filterForLanguage = (movies, languages) => movies.filter(movie => languages.includes(movie.language))
const filterForActorOrDirector = (movies, actors, directors) =>
  movies.filter(movie => {
    return directors.includes(movie.director_name) || _.intersection(actors, movie.actors).length
  })

const search = paramSearchTerms => {
  // Search terms may be null
  const searchTerms = paramSearchTerms || ''

  const terms = searchTerms.split(',')

  const searches = terms.map(term => {
    const compareRegExp = new RegExp(term, 'i')
    return _.filter(
      moviesDB,
      movie =>
        movie.movie_title.match(compareRegExp) ||
        movie.director_name.match(compareRegExp) ||
        movie.actors.some(actor => actor && actor.match(compareRegExp))
    )
  })

  return _.intersectionBy(...searches, 'id')
}

const filterForPreferences = (userPreferences, movies = moviesDB) => {
  const matchLanguage = filterForLanguage(movies, userPreferences.preferred_languages)
  return filterForActorOrDirector(matchLanguage, userPreferences.favourite_actors, userPreferences.favourite_directors)
}

module.exports = {
  filterForPreferences,
  search
}
