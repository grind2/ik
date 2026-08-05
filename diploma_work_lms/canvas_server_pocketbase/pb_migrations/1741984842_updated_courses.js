/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_955655590")

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "select1149012527",
    "maxSelect": 1,
    "name": "course_type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "mat",
      "szám",
      "inf"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_955655590")

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "select1149012527",
    "maxSelect": 1,
    "name": "course_type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "math",
      "compsci",
      "inf"
    ]
  }))

  return app.save(collection)
})
