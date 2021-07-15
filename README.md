# Lob Take-Home assignment

## Installation Procedure:
1. Clone a copy of the repository.
2. `npm install` to download dependencies.
3. `npm start` to run the server.
4. Use software to make requests to the localhost server @ `port` 3000.

## Usage and Endpoints:
**GET** `/api/` : Fetches all addresses in array format.
```js
{ No Data Field }
```
**POST** `/api/` : Creates a new address to be pushed into the address array.
Data field:

```
{
    line1: string,
    city: string,
    state: string,
    zip: string,
    id: string
} 
```
**PUT** `/api/:id` : Allows a specific resource to be updated by ID.
add a specific ID at the end of the PUT request to be updated.
Data field:
```js
{
    line1: string,
    city: string,
    state: string,
    zip: string,
    id: string
}
```
**DELETE** `/api/delete` : Allows a specific resource to be deleted by ID.
Data field:
```js
{
    id: string
}
```
Design Choices:
- I wanted to implement some simple id's without adding the id's to the database. Doing so made it easier to work with the data set.
- The data set could be implemented on a disk as opposed to in memory.
- If the data set were implemented on a disk/cloud, I'd use asynchronous functionality to handle database operations.
- Normally I'd build out a controllers folder to handle different actions as middleware, but that seems overkill for this particular assignment.
- Really basic error handling for inputs.
- Lodash was used as a quick fix to do deep object equality.
- I used Postman to make requests.
- I used nodemon for hot reloading.