const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Import the cors middleware
const mysql = require('mysql');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "35.185.219.33", // Your MySQL host
  user: 'root', // Your MySQL username
  password: 'myname', // Your MySQL password
  database: 'celebratory-tech' // Your MySQL database name
});

// Define route to handle form submissions
app.use(express.json()); // Parse JSON request bodies

app.post('/api/server', (req, res) => {
  console.log('Received POST request at /api/server');
  console.log('Received form data from client:', req.body);

  // Extract data from request body
  const formData = req.body;

  console.log('Received form data from client:', formData);

  // Validate and sanitize form data (TODO: Implement validation and sanitization)

  // Insert form data into database using parameterized query
  const sql = `INSERT INTO Responses 
              (Question1, Question2, Question3, Question4, Question5, Question6, Question7, Question8, Question9, Question10, 
              Question11, Question12, Question13, Question14, Question15, Question16, Question17, Question18, Question19, Question20, 
              Question21, Question22, Question23, Question24, Question25, Question26, Question27, Question28, Question29, Question30, UserID) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    formData['answers']['1'], formData['answers']['2'], formData['answers']['3'], formData['answers']['4'], formData['answers']['5'],
    formData['answers']['6'], formData['answers']['7'], formData['answers']['8'], formData['answers']['9'], formData['answers']['10'],
    formData['answers']['11'], formData['answers']['12'], formData['answers']['13'], formData['answers']['14'], formData['answers']['15'],
    formData['answers']['16'], formData['answers']['17'], formData['answers']['18'], formData['answers']['19'], formData['answers']['20'],
    formData['answers']['21'], formData['answers']['22'], formData['answers']['23'], formData['answers']['24'], formData['answers']['25'],
    formData['answers']['26'], formData['answers']['27'], formData['answers']['28'], formData['answers']['29'], formData['answers']['30'],
    formData['answers']['31'] // Assuming this is the UserID
];

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).send('Error getting MySQL connection');
    }

    connection.query(sql, values, (err, result) => {
      connection.release(); // Release the connection

      if (err) {
        console.error('Error inserting form data into MySQL:', err);
        return res.status(500).send('Error inserting form data into MySQL');
      }
      
      console.log('Form data inserted into MySQL database successfully!');
      res.status(200).send('Form data submitted successfully');
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
