
# appscript-get-location-address

This project provides a simple API to retrieve addresses using Google Apps Script. The API allows users to input coordinates and receive formatted addresses in return. Ideal for applications requiring geolocation features.


## Features

- **Coordinate Input**: Users can input latitude and longitude.
- **Formatted Address**: Receive a structured address as a response.
- **Google Maps Integration**: Leverages Google Maps' Geocoding API for accurate address retrieval.
- **Easy Integration**: Simple HTTP requests to interact with the API.

## Installation

1. Open a new Google Apps Script project:
- Navigate to Google Apps Script and create a new project.
- Alternatively, open any Google Sheet, go to Extensions > Apps Script, and start scripting.
2. Copy the code into your Apps Script editor:

```javascript
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
```
    
## Usage/Examples

Send a GET request to the deployed API endpoint with the required parameters to receive the address.

GET Request Example:

```javascript
https://your-deployed-api-endpoint?lat=40.7128&long=-74.0060
```
Example response:

```json
{"status":"success","lat":"-6.218731","long":"106.830980","address":"Plaza 89, Jl. H. R. Rasuna Said No.X-7, RT.6/RW.7, Kuningan, Karet Kuningan, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12940, Indonesia"}
```



