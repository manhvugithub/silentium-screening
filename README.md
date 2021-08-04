# Game Screening

## For running in development mode

### Prerequisites

- Install Node, Yarn
- Check your IP and modify your IP at ./client/.env.development

### Start project

- We have 2 main services, run each others by openning 2 terminals at dir of client and server, then run:
`yarn install`
`yarn start`

## For deployment

.... This is not ready yet
### Deploy Prerequisites

- Setup for docker and docker-compose
- Modify env variable by your IP at: ./env.development

### Prepare Docker Image

- Build 2 images named: game_client, game_server first.

### Run service

`./start.sh start`