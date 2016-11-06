# Demo of RethinkDB-CMS

A demo of the [rethinkdb-cms](https://www.npmjs.com/package/rethinkdb-cms) NPM module; providing a live feed of updates to a client app

## Setup

```
$ sudo npm install -g rethinkdb 

$ sudo npm install -g chateau

$ git clone https://github.com/krisrandall/rethinkdb-cms-demo.git    

$ cd rethinkdb-cms-demo    

$ npm install    

```

## Run

```
$ rethinkdb &  # the "&" means run it in the background and give me a prompt 
               # (you could also open another terminal window)

$ chateau &

$ node server/index.js &

$ open client/index.html

$ open http://localhost:3000/

```

## Result

You should now have 2 browser windows open, whenever you make an update in [http://localhost:3000/](http://localhost:3000/), you should see the index.html window update.




