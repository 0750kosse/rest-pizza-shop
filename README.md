# rest-pizza-shop
API for Domino´s Pizza

## Description

Exercise consisting in creating an API to store, add, update and delete items, as well as to serve such data to the relevant UI. 

Data can be seen at : https://manolopizza.herokuapp.com/api/menu.

## Instructions

Clone repo & run 'npm start' to start the project.

Full endpoints list can be seen at : rest-pizza-shop/src/routes/index.js

Should you wish to use the login & signup routes, you will need: 
- a MongoAtlas account & edit the connection string format with your own details.
- edit the JWT_KEY env variable.

'npm test' to run tests.

## Technologies used

- Javascript
- Node & Express
- MongoDB & Mongoose
- Multer for image uploads & JWT/bcrypt for authorization, user login and signup.
- Mocha & Sinon for testing.
