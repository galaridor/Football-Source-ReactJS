# React + Vite
# Football-Source-ReactJS

# Football Source App

Welcome to the Football Source App! This web application allows users to register, login, and explore real-time football data, including different competitions, standings, live scores, teams, matches, and players. The app integrates with the Football-Data API for football-related data and the OpenCageData API to retrieve geographic coordinates for displaying team locations on a map.

## Table of Contents

- [Features]
- [Getting Started]
  - [Prerequisites]
  - [Installation]
- [Configuration]
- [APIs Used]

## Features

- User Registration and Login
- Real-time Competitions Information
- Real-time Standings Information
- Real-time Live Score
- Teams, Players and Matches Details
- User comments under Teams and Matches
- Geographic Map Representation of Team Locations

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm (Node Package Manager): This is included with Node.js installation.

### Installation

1. Clone the repository:

    - git clone https://github.com/galaridor/Football-Source-ReactJS.git

2. Navigate to the project directory:

    - cd football-source-reactjs/

3. Install package dependencies:

    - npm install

## Configuration

1. Start proxy 

    - cd proxy
    - node proxy.cjs

2. Start SUPS

    - cd server
    - node server.cjs

3. Start the development server:

    - npm run dev

 ##  APIs Used

   - Football Data API: https://www.football-data.org
   - OpenCageData API: https://opencagedata.com