# express_sweater_weather

# Production

`https://express-swtr-wthr.herokuapp.com`

## Setup and Installation

`npm install`
to install dependancies

`npx sequelize db:create`
`npx sequelize db:migrate`
to create the database

### API Keys
An API key from Google Maps and DarkSky will be required to complete setup

link to Google Maps: `https://developers.google.com/maps/documentation/javascript/get-api-key`
link to DarkSky: `https://darksky.net/dev/register`

a `.env` file will be needed to store the API Keys:
`GEOCODE_KEY`
`DARKSKY_KEY`

## Using the application

### Account Creation

Request

```POST /api/v1/users
Content-Type: application/json
Accept: application/json

{
  "email": "user@email.com",
  "password": "password",
  "passwordConfirmation": "password"
}```

Response

```status: 201
body:

{
  "apiKey": "974fa09a-59e0-40f6-a4da-5692b6a61a92",
}```

### Login

Request

```POST /api/v1/sessions
Content-Type: application/json
Accept: application/json

{
  "email": "user@email.com",
  "password": "password"
}```

Response

```status: 200
body:

{
  "apiKey": "974fa09a-59e0-40f6-a4da-5692b6a61a92",
}```

### Forecast for a City

Request

```GET /api/v1/forecast?location=austin,tx
Content-Type: application/json
Accept: application/json

{
  "apiKey": "974fa09a-59e0-40f6-a4da-5692b6a61a92"
}```

Response

```{
    "city": "Portland, OR, United States",
    "currently": {
        "time": 1557116147,
        "summary": "Clear",
        "icon": "clear-night",
        "nearestStormDistance": 310,
        "nearestStormBearing": 179,
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 67.9,
        "apparentTemperature": 67.9,
        "dewPoint": 47.17,
        "humidity": 0.47,
        "pressure": 1010.59,
        "windSpeed": 3.86,
        "windGust": 5.99,
        "windBearing": 313,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 8.8,
        "ozone": 346.8
    },
    "hourly": {
        "summary": "Partly cloudy tomorrow evening.",
        "icon": "partly-cloudy-day",
        "data": [
            {...},
            {...},
            {...}   
        ]
    },
    "daily": {
        "summary": "No precipitation throughout the week, with high temperatures rising to 95°F on Friday.",
        "icon": "clear-day",
        "data": [
            {...},
            {...},
            {...}
        ]
    }
}```

### Adding A Favorite

Request

```POST /api/v1/favorites
Content-Type: application/json
Accept: application/json

{
  "apiKey": "974fa09a-59e0-40f6-a4da-5692b6a61a92",
  "location": "Portland, OR, United States"
}```

Response

```{
    "message": "Portland, OR, United States has been added to your favorites."
}```

### Listing Favorites

Request

GET /api/v1/favorites
Content-Type: application/json
Accept: application/json

{
  "apiKey": "974fa09a-59e0-40f6-a4da-5692b6a61a92"
}

Response

```{
    "favorites": [
        {
            "id": 4,
            "name": "Portland",
            "state": "OR",
            "country": "United States",
            "lat": 45.5154586,
            "long": -122.6793461,
            "currentForecast": {
                "time": 1557154584,
                "summary": "Clear",
                "icon": "clear-day",
                "nearestStormDistance": 139,
                "nearestStormBearing": 171,
                "precipIntensity": 0,
                "precipProbability": 0,
                "temperature": 53.61,
                "apparentTemperature": 53.61,
                "dewPoint": 47.54,
                "humidity": 0.8,
                "pressure": 1014.56,
                "windSpeed": 1.96,
                "windGust": 4.98,
                "windBearing": 26,
                "cloudCover": 0.03,
                "uvIndex": 1,
                "visibility": 9.97,
                "ozone": 349.83
            }
        }
    ]
}```

### Removing Favorites

Request

```DELETE /api/v1/favorites
Content-Type: application/json
Accept: application/json

{
  "apiKey": "974fa09a-59e0-40f6-a4da-5692b6a61a92",
  "location": "Portland, OR, United States"
}```

Response

```{
    "message": "Portland, OR, United States has been removed from your favorites."
}```
