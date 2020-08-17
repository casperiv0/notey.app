# Installation

## Requirements

- [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [NPM v12+](https://nodejs.org/en/download/)
- [Mongodb](https://www.mongodb.com/)

## getting started

1. Clone the repo to your machine: `git clone https://github.com/Dev-CasperTheGhost/notey.app`
2. Locate to the server folder
3. Copy and rename `.env.example` to `.env` and open it
4. Edit `.env` where needed
   - `JWT_SECRET`: Your token secret, can be anything
   - `MONGO_URI`: The URL to your mongodb cluster
   - `CLIENT_URL`: The URL to the client
5. Install the dependencies in the server folder using `npm install`

