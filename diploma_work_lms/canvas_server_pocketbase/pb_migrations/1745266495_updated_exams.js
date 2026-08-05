/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2725752259")

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3315464570",
    "hidden": false,
    "id": "relation2678318100",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "results",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2725752259")

  // remove field
  collection.fields.removeById("relation2678318100")

  return app.save(collection)
})
