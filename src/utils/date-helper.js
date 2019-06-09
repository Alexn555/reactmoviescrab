
// Date format, parse utility helper 

export default class DateHelper {

   static parseReleaseDate(rowDate = '') {
	  if (rowDate === '') { return ''; }
	  const parts = rowDate.split('-');
	  return parts[2] + '.'+ parts[1]+'.'+parts[0];
  }
  

}