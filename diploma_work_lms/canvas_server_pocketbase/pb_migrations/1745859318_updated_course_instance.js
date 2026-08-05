/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2244489498")

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "number3578592097",
    "max": null,
    "min": null,
    "name": "max_students",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2244489498")

  // remove field
  collection.fields.removeById("number3578592097")

  return app.save(collection)
})
