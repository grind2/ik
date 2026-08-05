/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2244489498")

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3330794401",
    "hidden": false,
    "id": "relation814371037",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "assignments",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2109765098",
    "hidden": false,
    "id": "relation2497486773",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "quizzes",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2244489498")

  // remove field
  collection.fields.removeById("relation814371037")

  // remove field
  collection.fields.removeById("relation2497486773")

  return app.save(collection)
})
