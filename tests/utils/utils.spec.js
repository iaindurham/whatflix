const utils = require('../../src/utils/utils')
const mockMovies = require('../mocks/movies.mock.json')
const mockMoviesSorted = require('../mocks/moviesSorted.mock.json')

describe('Utils', () => {
  describe('sortAlphabetically', () => {
    describe('Given an unsorted array of movie objects', () => {
      const mockMoviesArray = [...mockMovies]
      describe('When the array is sorted', () => {
        it('should return the array with the movies in alphabetical order by title', () => {
          const result = utils.sortAlphabetically(mockMoviesArray)
          expect(result).toEqual(mockMoviesSorted)
        })
      })
    })
  })

  describe('mapNames', () => {
    describe('Given an array of movie objects', () => {
      describe('When mapped names are requested', () => {
        it('should return an array of movie titles', () => {
          const result = utils.mapNames(mockMovies)
          expect(result).toEqual([
            'A History of Violence',
            'Unforgiven',
            'The Simpsons Movie',
            'Eternal Sunshine of the Spotless Mind'
          ])
        })
      })
    })
  })

  describe('top3', () => {
    describe('Given an array of more than 3 items', () => {
      const lotsOfThings = ['a', 'b', 'c', 'd', 'e']
      describe('When top 3 are requested', () => {
        it('should return the first 3 items in the array', () => {
          const result = utils.top3(lotsOfThings)
          expect(result).toEqual([
            'a',
            'b',
            'c'
          ])
        })
      })
    })

    describe('Given an array of less than 3 items', () => {
      const lotsOfThings = ['a', 'b']
      describe('When top 3 are requested', () => {
        it('should return all the items in the array', () => {
          const result = utils.top3(lotsOfThings)
          expect(result).toEqual([
            'a',
            'b'
          ])
        })
      })
    })

    describe('Given an array with no items', () => {
      const lotsOfThings = ['a', 'b']
      describe('When top 3 are requested', () => {
        it('should return all the items in the array', () => {
          const result = utils.top3(lotsOfThings)
          expect(result).toEqual([
            'a',
            'b'
          ])
        })
      })
    })
  })
})
