const express = require("express");
const apiRouter = express.Router();
let db = require("../models/data.json");
const __ = require('lodash');

for(let i = 0; i < db.length; i += 1) { //assign simple ids
  const elem = db[i];
  elem.id = i;
}

const findAddress = (address) => {
  return db.filter(elem => {
    return __.isEqual(elem, address);
   });
}

apiRouter.get("/", (req, res) => { //READ
  try {
    console.log(db)
    res.status(200).send(db);
  } catch (e) {
    console.log(e);
  }
});

apiRouter.post("/", (req, res) => { //CREATE
  try {
    const { line1, line2, city, state, zip } = req.body;
    if(typeof line1 !== "string" || typeof city !== "string" || typeof state !== "string"|| typeof zip !== "string") {
      throw new Error("All inputs must be strings.");
    }
    const id = db.length;
    const newAddress = {
      line1,
      city,
      state,
      zip,
      id
    };
    if(line2) {
      newAddress[line2] = line2;
    }
    const items = findAddress(newAddress);
    db.push(newAddress);
    if(items.length > 0) {
      res.sendStatus(200);
    } else {
      res.status(200).send(newAddress);
    }
  } catch (e) {
    console.log(e);
  }
});

apiRouter.put("/:id", (req, res) => { //UPDATE
  try {
    const { line1, line2, city, state, zip } = req.body;
    if(typeof line1 !== "string" || typeof city !== "string" || typeof state !== "string"|| typeof zip !== "string") {
      throw new Error("All inputs must be strings.");
    }
    const updatedAddress = {
      line1,
      city,
      state,
      zip,
      id: Number(req.params.id)
    };
    const index = db.findIndex(elem => {
      return elem.id === Number(req.params.id);
    })
    db[index] = updatedAddress;
    console.log("db: ", db);
    res.status(200).send(`Updated Item(s)`);
  } catch(e) {
    console.log(e);
  }
})

apiRouter.delete("/delete", (req, res) => { //DELETE
  try {
    const { id } = req.body;
    if(typeof id !== "string") {
      throw new Error("Input must be a string.");
    }
    db = db.filter(elem => {
      return elem.id !== Number(id);
    })
    console.log("db: ", db);
    res.status(200).send(`Deleted Item(s)`);
  } catch(e) {
    console.log(e);
  }
})

module.exports = apiRouter;