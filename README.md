# Unity Matchmaker

A matchmaking system for Unity projects.

## Testing
```sh
curl -X POST https://unity-matchmaker.onrender.com/api/games \
     -H "Content-Type: application/json" \
     -d "{\"code\":\"TEST1234\"}"
```

```sh
curl https://unity-matchmaker.onrender.com/api/games
```