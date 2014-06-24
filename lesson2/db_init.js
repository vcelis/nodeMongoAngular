// Tor run:
// $ mongo db_init.js

// Create and populate database
var mongo = new Mongo('localhost');
var db = mongo.getDB('myDB');
var coll = mongo.getCollection('myDB.myCollection');

coll.drop(); // If you want to clear befor einserting if exists
coll.insert({name: 'Vincent', score: 9});
coll.insert({name: 'Freddy', score: 7});
coll.insert({name: 'Jan', score: 4});

var cursor = coll.find();
print('Items inserted: ' + cursor.count());
printjson(cursor.next());