const express = require("express");
const apiRouter = express.Router();
let db = require("../models/data.json");
const __ = require('lodash');

for(let i = 0; i < db.length; i += 1) { //assign simple ids
  const elem = db[i];
  elem.id = i;
}

const addressMatches = (address) => {
  return db.filter(elem => {
    return __.isEqual(elem, address);
   });
}

// const getIndex = (req) => {
//   return db.findIndex(elem => {
//     return elem.id === Number(req.params.id);
//   })
// }

apiRouter.get("/addresses/:pgNum", (req, res) => { //READ
  const pgNum = req.params.pgNum;
  try {
    //3 results per page
    //pg0 0 3
    //pg1 3 6
    //pg2 6 9
    const startIdx = Number(pgNum) * 3;
    const results = db.slice(startIdx,  startIdx + 3);
    res.status(200).send(results);
  } catch (e) {
    console.log(e);
  }
});

apiRouter.get("/addresses/:query", (req, res) => {

  try {
    // console.log("request is firing")
    const queryString = req.params.query,
          results = [];
    for(const address of db) {
      const allKeys = Object.keys(address);
      for(key of allKeys) {
        // console.log(address[key]);
        if(key !== "id" && address[key].includes(queryString)) {
          results.push(address);
          break;
        };
      }
    }
    const stringifiedResults = JSON.stringify(results);
    res.status(200).send(stringifiedResults);
  } catch(e) {
    console.log(e);
  }
})

apiRouter.get("/addresses/:id", (req, res) => { //Find a specific address
  try {
    // const index = db.findIndex(elem => {
    //   return elem.id === Number(req.params.id);
    // })
    const index = db.findIndex(elem => {
      return elem.id === Number(req.params.id);
    });
    res.status(200).send(db[index]);
  } catch(e) {
    console.log(e);
  }
})

apiRouter.post("/addresses", (req, res) => { //CREATE
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
    const items = addressMatches(newAddress);
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

apiRouter.put("/addresses/:id", (req, res) => { //UPDATE
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
    if(line2) {
      newAddress[line2] = line2;
    }
    const index = db.findIndex(elem => {
      return elem.id === Number(req.params.id);
    })
    db[index] = updatedAddress;
    console.log("db: ", db);
    const stringifiedDB = JSON.stringify(db);
    res.status(200).send(`Updated Item: \n ${stringifiedDB}`);
  } catch(e) {
    console.log(e);
  }
})

apiRouter.delete("/addresses/", (req, res) => { //DELETE
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