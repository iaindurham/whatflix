const _ = require('lodash')
const moviesDB = require('../config/movies.json')

const filterForLanguage = (movies, languages) => movies.filter(movie => languages.includes(movie.language))
const filterForActorOrDirector = (movies, actors, directors) =>
  movies.filter(movie => {
    return directors.includes(movie.director_name) || _.intersection(actors, movie.actors).length
  })

const search = (searchStrings = []) => {
  if (searchStrings.length === 0) {
    return moviesDB
  }

  const searches = searchStrings.map(searchString => {
    const compareRegExp = new RegExp(searchString, 'i')
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
