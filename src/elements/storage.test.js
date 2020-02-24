import { expect } from 'chai';
import { loadFavouriteTalks, saveFavouriteTalks, clearFavouriteTalks } from './storage';

describe('storage tests', () => {
  describe('clear favourite talks', () => {
    it('should remove any favourite talks', async () => {
      await saveFavouriteTalks(['1', '3']);
      await clearFavouriteTalks();
      const result = await loadFavouriteTalks();
      expect(result).to.deep.equal([]);
    });
  });

  describe('load favourite talks', () => {
    afterEach(async () => {
      await clearFavouriteTalks();
    });

    it('should parse any existing talks in storage', async () => {
      await saveFavouriteTalks(['1', '2']);
      const result = await loadFavouriteTalks();
      expect(result).to.deep.equal(['1', '2']);
    });

    it('should handle no existing talks', async () => {
      const result = await loadFavouriteTalks();
      expect(result).to.deep.equal([]);
    });

    it('should handle undefined saved value', async () => {
      await saveFavouriteTalks(undefined);
      const result = await loadFavouriteTalks();
      expect(result).to.deep.equal([]);
    });
  });

  describe('save favourite talks', () => {
    afterEach(async () => {
      await clearFavouriteTalks();
    });

    it('should save the list of talks', async () => {
      await saveFavouriteTalks(['1', '3']);
      const result = await loadFavouriteTalks();
      expect(result).to.deep.equal(['1', '3']);
    });
  });
});
