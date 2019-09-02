const handler = require('../../src/handlers/search')

describe('Handlers: search', () => {
  describe('When search is invoked for an existing user', () => {
    const userId = '101'

    describe('And a single search term', () => {
      const searchString = 'Tom'
      const expectedResults = ['A League of Their Own', 'Angels & Demons', 'Apollo 13', '1982', '8 Heads in a Duffel Bag', 'A Cock and Bull Story']

      it('should return 200 response and an array of movies matching the search term and user preferences', async () => {
        const response = await handler.search({ pathParameters: { userId }, queryStringParameters: { text: searchString } })

        expect(response).toEqual({
          statusCode: 200,
          body: JSON.stringify(expectedResults)
        })
      })
    })

    describe('And a multiple search terms', () => {
      const searchString = 'Tom,story'
      const expectedResults = ['Toy Story', 'Toy Story 2', 'Toy Story 3', 'A Cock and Bull Story', 'Perfume: The Story of a Murderer', 'Toy Story']

      it('should return 200 response and an array of movies matching both of the search terms and user preferences', async () => {
        const response = await handler.search({ pathParameters: { userId }, queryStringParameters: { text: searchString } })

        expect(response).toEqual({
          statusCode: 200,
          body: JSON.stringify(expectedResults)
        })
      })
    })

    describe('And no search term', () => {
      const expectedResults = ['2 Guns', 'A League of Their Own', 'Alice in Wonderland', '#Horror', '$upercapitalist', '(500) Days of Summer']

      it('should return 200 response and an array of movies matching the users preferences', async () => {
        const response = await handler.search({ pathParameters: { userId } })

        expect(response).toEqual({
          statusCode: 200,
          body: JSON.stringify(expectedResults)
        })
      })
    })
  })

  describe('When search is invoked for a user that does not exist', () => {
    it('should return a 404 response', async () => {
      const userId = 'notFound'
      const searchString = 'Tom'
      const response = await handler.search({ pathParameters: { userId }, queryStringParameters: { text: searchString } })

      expect(response).toEqual({
        statusCode: 404,
        body: 'User not found'
      })
    })
  })
})
