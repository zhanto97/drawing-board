# Real-time collaborative drawing board developed using [Django channels](https://channels.readthedocs.io/en/latest/) and [WebSockets](https://en.wikipedia.org/wiki/WebSocket)

To run the project in dev, you will need `docker`. Run the following commands
```
docker-compose build
docker-compose run
```
and open `0.0.0.0:8000` in the browser. All connected clients will now see changes on drawing board in real time!