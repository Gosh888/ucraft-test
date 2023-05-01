## Description

Live chat application project with socket.io 

## How to run the project
#### first copy .env.example file to .env file and fill environment variables
#### run the command below

```bash
$ docker-compose up -d --build
```
 
## How to work with the project
#### Server is running on localhost:3000 
#### You can use postman to connect to the project https://www.postman.com/interstellar-moon-859752/workspace/ucraft-task/collection/3673196-748830bc-891a-4c72-824e-bac6e762b1f3?action=share&creator=3673196
#### For _rest requests_ and get informed _socket events_ use `Ucraft rest api`
#### For socket requests use `Ucraft socket`

## About socket events 
### Client side sending events
#### `room:join`
#### `room:message`
#### `poll:create`
#### `poll:vote`
#### event body you can find on postman

### Client side receiving events
#### `error`
#### `message`






