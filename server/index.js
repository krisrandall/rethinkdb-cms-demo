
var Cms    = require('rethinkdb-cms');
var rdbcms = new Cms();
var r      = require('rethinkdb');



// connect to rethink, then create the table if it doesn't exist, and also the table, 
// then use the rethinkdb-cms feed 

r.connect(function(err, conn) {

	if (err) { console.error('failed to connect, is rethinkdb running?', err); throw(err); }

	// create DB "my_rethinkdb" if not exists
	var db_exists = r.dbList().contains('my_rethinkdb')
	.do(function(databaseExists) {
		return r.branch(
		  databaseExists,
		  { dbs_created: 0 },
		  r.dbCreate('my_rethinkdb')
		);
	}).run(conn).then( function () {


		// create table "news" if not exits
		r.db('my_rethinkdb').tableList().run(conn).then(function(tables) {

			console.log(tables);
			if (tables.includes('news')) {
				createTheFeed(conn);
			} else {

				// create the table 'news'
				r.db('my_rethinkdb').tableCreate('news').run(conn)
               	.then(function() {
					createTheFeed(conn);
				});

			}


		});

	});

});


function createTheFeed(conn) {


	r.connect({ db: 'my_rethinkdb' }).then(function(conn) {
	 
	    rdbcms.setDb(conn);
	    rdbcms.setCollections([ 'news' ]);
	    
	    rdbcms.activateFeed({ port: 4000 });
	    console.log('Publishing changes to the "news" table on port 4000 ...');
	    
	    console.log('Doing a manual create of a new news record..');
	    r.table('news').insert({ 'content': 'Here is some NEW news!', 'updatedDts' : new Date() }).run(conn);
	 
	    // rdbcms.stopFeed(); 
	    
	});

}