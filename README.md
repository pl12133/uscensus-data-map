# uscensus-data-map
An interactive map of the USA with US Census data. Built on React, Bootstrap, and D3.

###### [Demo](http://pl12133.com/map)

# Boilerplate Features

To view the boilerplate used to create this Application, see [pl12133/babel-plate](https://github.com/pl12133/babel-plate/tree/react-bootstrap-router) on the `react-bootstrap-router` branch.

# CitySDK

CitySDK is a project by the US Census Bureau to create a JavaScript library to interface with the US Census Data API. It is very powerful for querying US Census data by location, whether it be a zip code or a street address. This library uses CitySDK to aggregate information at the state level and display population, median income, and median rent for a state.

# Install

Clone:

    git clone http://github.com/pl12133/uscensus-data-map.git
    cd uscensus-data-map

Install:

    npm install

Run local server. If you need to change `PORT` or `HOST` settings you may do so through environment variables:

		export PORT=8080
		export HOST=localhost
		npm start

The Application will now be listening on `http://localhost:8080` in development mode. 
