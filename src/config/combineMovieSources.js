const csv = require('fast-csv')
const _ = require('lodash')
const fs = require('fs').promises

const findDirector = (crew) => {
  const { name = 'Unknown' } = _.find(crew, {job: 'Director'}) || {}
  return name
}

const languageMap = {
  'en': 'English',
  'es': 'Spanish',
  'de': 'German',
  'fr': 'French',
  'ja': 'Japanese'
}

const mapLanguage = (languageCode) => languageMap[languageCode] || languageCode

const parseMoviesFile = () => {
  return new Promise((resolve, reject) => {
    const parsedMovies = {}

    csv
      .parseFile('src/config/tmdb_5000_movies.csv', { headers: true })
      .on('error', (error) => reject(error))
      .on('data', ({ id, original_title: movie_title, original_language: language }) => {
        parsedMovies[id] = {
          movie_title,
          language: mapLanguage(language)
        }
      })
      .on('end', () => resolve(parsedMovies))
  })
}

const parseCreditsFile = () => {
  return new Promise((resolve, reject) => {
    const parsedCredits = {}

    csv
      .parseFile('src/config/tmdb_5000_credits.csv', { headers: true })
      .on('error', (error) => reject(error))
      .on('data', ({ movie_id, title, cast, crew }) => {

        const parsedCrew = JSON.parse(crew)
        const director = findDirector(parsedCrew)

        const [ actor_1 = {}, actor_2 = {}, actor_3 = {} ] = JSON.parse(cast)

        parsedCredits[movie_id] = {
          movie_title: title,
          director_name: director,
          actors: [
            actor_1.name,
            actor_2.name,
            actor_3.name
          ]
        }
      })
      .on('end', () => resolve(parsedCredits))
  })
}

const parseFiles = async () => {
  try {
    const credits = await parseCreditsFile()
    const movies = await parseMoviesFile()
    const combined = _.merge(credits, movies)

    const mapped = Object.entries(combined).map(([ id, movie ]) => ({
      id,
      ...movie
    }))

    await fs.writeFile('src/config/movies.json', JSON.stringify(mapped, ' ', 2))
  } catch (err) {
    console.error(err)
  }
}

return parseFiles()
