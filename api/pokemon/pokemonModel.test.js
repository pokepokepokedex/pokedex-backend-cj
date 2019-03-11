const poke = require('./pokemonModel');
const db = require('../../data/dbConfig');

describe('pokemon model', () => {
  describe('getAll', () => {
    it('should return all pokemon', () => {
      return poke.getAll().then(res => {
        expect(res.data.length).toBeGreaterThan(0);
      });
    });
  });
});
