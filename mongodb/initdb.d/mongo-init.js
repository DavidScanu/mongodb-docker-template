// Create and switch to new database
db = db.getSiblingDB("main_db");

// Create a new user
db.createUser({
    user: "your_name",
    pwd: "your_password",
    roles: [
      {
        role: 'dbOwner', 
        db: 'main_db'
      },
    ],
  });

// Create collection
db.createCollection("test_collection");

// Insert dummy data into collection
db.test_collection.insertOne({'test' : 'data'})
