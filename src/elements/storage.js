import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

/**
 * Load any existing favourite talks from storage
 * @return {Array} any favourited talks
 */
export const loadFavouriteTalks = async () => {
  const existing = await Storage.get({ key: 'favourites' });
  if (existing.value && existing.value !== 'undefined') {
    return JSON.parse(existing.value);
  }
  return [];
};

/**
 * Save favourite talks to storage
 * @param {Array} favouriteTalks the list of favourited talks
 * @return {Promise} the pending save
 */
export const saveFavouriteTalks = async (favouriteTalks) => Storage.set({ key: 'favourites', value: JSON.stringify(favouriteTalks) });


/**
 * Clear favourited talks in storage
 * @return {Promise} the pending save
 */
export const clearFavouriteTalks = async () => Storage.remove({ key: 'favourites' });
