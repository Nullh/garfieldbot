# Garfieldbot

Hi!

I'm a discord bot for REAL, HARDCORE fans of Garfield (read: people on my GC).

I'm still in development and don't do much right now :)

## Productionisation

On your server install pm2 with:

```bash
sudo npm install pm2 -g
pm2 startup
```

From the garfield folder run the node app as a daemon that auto restarts when changes are made:

```bash
pm2 start garfield.js --watch --ignore-watch="node_modules"
```