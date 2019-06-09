
// Date format, parse utility helper 

import DateHelpers from '../date-helper';

it('should get correct date', () => {
  const res = '15.10.2017';
  expect(DateHelpers.parseReleaseDate('2017-10-15')).toEqual(res);
});

it('should get empty date if no date passed', () => {
  const res = '';
  expect(DateHelpers.parseReleaseDate('')).toEqual(res);
})