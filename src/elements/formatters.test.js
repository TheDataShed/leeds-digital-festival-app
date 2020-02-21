import { expect } from 'chai';
import { formatDate, formatNumber } from './formatters';

describe('formatter tests', () => {
  describe('format date', () => {
    it('should format a date', () => {
      const date = '2019-02-01T01:10:00.000Z';
      const result = formatDate(date);
      const expected = new Intl.DateTimeFormat('default', {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'long',
        hour12: true,
      }).format(new Date(date));
      expect(result).to.equal(expected);
    });
    it('should not format unknown date', () => {
      const date = null;
      const result = formatDate(date);
      expect(result).to.be.null;
    });
  });

  describe('format number', () => {
    it('should format a number', () => {
      const number = '10000';
      const result = formatNumber(number);
      expect(result).to.equal('10,000');
    });
    it('should not format unknown number', () => {
      const number = null;
      const result = formatDate(number);
      expect(result).to.be.null;
    });
  });
});
