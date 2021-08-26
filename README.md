# EmpDir-Server
### This is the server for the EmpDir application

#### Instructions
To install dependencies run 'npm install' in root folder. Then run 'node index.js'.

You need a .env file in ./server with DB_CONNECT_URL variable for a postgres database.

#### Features
Sending an API call on 'localhost:3100/_insert-mock-employee?number=[int]' creates a set number of employees in the database.
