# Girbil API
This is the backed api for girbil, which powers all client app. it runs on graphql

### RUN REQUIREMENTS
you need your env keys setup.
- Run `cp .env.example .env`
We also have a couple of npm scripts 
- migration `yarn migrate`
- clean db `yarn migrate:undo` this wipes the entire db use with care.
- seed `yarn seed` creates seed data
- running deb mode `yarn dev`


### RUN LOCALLY
Steps to run this project:
1. Setup postgres and redis on your local machine
2. make sure you have all env variables in your environment. (direnv)[https://direnv.net/] is a good tool for this
1. Run `yarn install` command
3. Run `npm dev` command

### RUN DOCKER
1. install and have docker up and running
2. run `docker-compose up`
3. to stop run `docker-compose down`