const handler = require('../../src/handlers/recommend')
const userPreferencesModel = require('../../src/models/userPreferences')
const mockUserPreferences = require('../mocks/userPreferences.mock')

describe('Handlers: recommend', () => {
  describe('Given users with preferences', () => {
    beforeEach(() => {
      jest.spyOn(userPreferencesModel, 'list').mockReturnValue(mockUserPreferences)
    })

    describe('When recommendations are requested', () => {
      const expectedRecommendations = [
        { user: '101', movies: ['2 Guns', 'A League of Their Own', 'Alice in Wonderland'] },
        { user: '102', movies: ['15 Minutes', 'A Civil Action', 'A Million Ways to Die in the West'] }
      ]

      it('should return an array of users with 3 top suggestions for users', async () => {
        const response = await handler.recommend()

        expect(response).toEqual({
          statusCode: 200,
          body: JSON.stringify(expectedRecommendations)
        })
      })
    })
  })
})
