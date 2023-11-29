$(document).ready(function() {
    // Function to get sunrise and sunset data
    function getSunriseSunsetData(latitude, longitude) {
        const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`
        
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
            document.querySelector('#dash').innerHTML = 'Sunrise and Sunset Time Details for '+data.results.timezone
            //document.querySelector('#sunset').innerHTML = data.results.sunset
            //document.querySelector('#raw-output').innerHTML = JSON.stringify(data)
            //updateDashboard(data.results)
            $('#dashboard').html(`
            <h2>Today</h2>
            <p>Sunrise: ${data.results.sunrise}</p>
            <p>Sunset: ${data.results.sunset}</p>
            <p>Dawn: ${data.results.dawn}</p>
            <p>Dusk: ${data.results.dusk}</p>
            <p>Day Length: ${data.results.day_length}</p>
            <p>Solar Noon: ${data.results.solar_noon}</p>
            <p>Time Zone: ${data.results.timezone}</p>

        `);
            })
        .catch(error => console.error('Error:', error))
        

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 2);
        const formattedDate = `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`;

        const tmr_url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${formattedDate}`
        fetch(tmr_url)
            .then(response => response.json())
            .then(data => {
            //document.querySelector('#sunrise').innerHTML = data.results.sunrise
            //document.querySelector('#sunset').innerHTML = data.results.sunset
            //document.querySelector('#raw-output').innerHTML = JSON.stringify(data)
            //updateDashboard(data.results)
            $('#tmr_dashboard').html(`
            <h2>Tomorrow</h2>
            <p>Sunrise: ${data.results.sunrise}</p>
            <p>Sunset: ${data.results.sunset}</p>
            <p>Dawn: ${data.results.dawn}</p>
            <p>Dusk: ${data.results.dusk}</p>
            <p>Day Length: ${data.results.day_length}</p>
            <p>Solar Noon: ${data.results.solar_noon}</p>
            <p>Time Zone: ${data.results.timezone}</p>
        `);
            })
        .catch(error => console.error('Error:', error))

    }

    

    // Function to handle Geolocation
    document.getElementById('geolocationBtn').addEventListener('click', function() {
        if(document.getElementById('searchLocation').value !=""){
            document.getElementById('searchLocation').value="";
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                getSunriseSunsetData(latitude, longitude);
            });
        } else {
            displayErrorMessage('Geolocation is not supported by this browser.');
        }
    });


    // Function to handle location search 
    document.getElementById('searchLocationBtn').addEventListener('click', function() {
        const searchLocation = document.getElementById('searchLocation').value;
        
        const url = `https://geocode.maps.co/search?q=${searchLocation}`

        fetch(url)
            .then(response => response.json())
            .then(data => {
                //document.querySelector('#raw-output').innerHTML = JSON.stringify(data)
                if(JSON.stringify(data) == '[]'){
                    document.getElementById('searchLocation').value="";
                    alert('Insert The Correct Location Name');
                }
                const latitude = data[0].lat;
                const longitude = data[0].lon;
                getSunriseSunsetData(latitude, longitude)
            
            })
        .catch(error => console.error('Error:', error))
    });

    // Function to display error messages
    function displayErrorMessage(message) {
        $('#error-message').text(message).removeClass('hidden');
    }
});
