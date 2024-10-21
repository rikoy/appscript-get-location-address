function doGet(e) {
  // Mendapatkan parameter lat dan long dari URL
  var lat = e.parameter.lat;
  var long = e.parameter.long;

  // Cek apakah parameter lat dan long ada
  if (!lat || !long) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Latitude dan Longitude harus disertakan.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Log data yang diterima (untuk keperluan debugging)
  Logger.log('Latitude: ' + lat);
  Logger.log('Longitude: ' + long);

  var geocoder = Maps.newGeocoder();
  var location = geocoder.reverseGeocode(lat, long);
  var address = location.results[0].formatted_address;
  
  // Buat response JSON dengan lat dan long yang diterima
  var response = {
    status: 'success',
    lat: lat,
    long: long,
    address: address
  };

  // Kembalikan response sebagai JSON
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
