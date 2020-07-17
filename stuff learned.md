# Stuff learned

In relational database, we have a databse, which can have several tables inside of them and tables have rows and columns.
Tables are equivalent to collections and individual rows are equivalent to documents in NoSQL databases.

some basic mongo shell commands

    show dbs - shows the dbs

    when a db has no collections i.e. its empty it will not show up in the list of databases

    db - shows which db you are connected to

    show collections

    use <database_name>
    this will switch over to the other databse or create it if it does not exist already

    db.createCollection(<name-of-collection>) - creates a collection

    db.stats() - show stats like number of collections in the database

    db.<collection_name>.drop()

    cls - to clear the screen in the mongo terminal

    when you insert your first document it will create the collection automaically
    db.<collection_name>.insert(<documents here>)
    
    example -

    db.movies.insert({
        "title": "The matrix",
        "released": "1999"
    }, {
        "title": "Titanic",
        "released": "2000"
    })

    db.<collection_name>.find() - to get all documents in a collection
    db.<collection_name>.find().pretty()

    _id gets auto generated for all the documents that you insert

    updating a document in a collection
    db.<collection_name>.update(
        {selector - update all where we match these queries},
        {$set: {"language": "english"}})
    - updating will insert a field if it does not exist already
    - we use $unset to delete a field

    db.<collection-name>.count() - get the number of documents in a collection
    db.<collection-name>.count({condition_here})
    