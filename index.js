document.getElementById('emergencyButton').addEventListener('click', function() {
    getLocation((locationLink) => {
      alert(`Sending emergency alert with location: ${locationLink}`);
  
      // Send location data to the backend
      fetch('/send_alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locationLink: locationLink, // Send location link to the backend
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Alert sent successfully:', data);
      })
      .catch(error => {
        console.error('Error sending alert:', error);
      });
    });
  });
  
  function getLocation(callback) {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const latitude = position.coords.latitude;
                  const longitude = position.coords.longitude;
                  const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
                  callback(locationLink, latitude, longitude);
              },
              (error) => {
                  alert('Unable to fetch location. Please enable location services.');
                  console.error('Geolocation error:', error);
              }
          );
      } else {
          alert('Geolocation is not supported by your browser.');
      }
  }