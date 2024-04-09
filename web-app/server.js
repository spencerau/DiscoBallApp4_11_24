const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Connect to the MySQL database
const connection = mysql.createConnection({
  host: '35.185.219.33',
  user: 'root',
  password: 'myname',
  database: 'Responses'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    // Stop the server from starting if the connection fails
    process.exit(1);
  }
  console.log('Connected to database successfully!');
});

// Define route to handle form submissions
app.use(express.json()); // Parse JSON request bodies

app.post('/submit-form', (req, res) => {
  // Extract data from request body
  const formData = req.body;

  // Validate and sanitize form data (TODO: Implement validation and sanitization)

  // Insert form data into database using parameterized query
  const sql = `INSERT INTO Responses 
              (Question1, Question2, Question3, Question4, Question5, Question6, Question7, Question8, Question9, Question10, 
              Question11, Question12, Question13, Question14, Question15, Question16, Question17, Question18, Question19, Question20, 
              Question21, Question22, Question23, Question24, Question25, Question26, Question27, Question28, Question29, Question30, UserID) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    formData.Question1, formData.Question2, formData.Question3, formData.Question4, formData.Question5, formData.Question6,
    formData.Question7, formData.Question8, formData.Question9, formData.Question10, formData.Question11, formData.Question12, 
    formData.Question13, formData.Question14, formData.Question15, formData.Question16, formData.Question17, formData.Question18, 
    formData.Question19, formData.Question20, formData.Question21, formData.Question22, formData.Question23, formData.Question24, 
    formData.Question25, formData.Question26, formData.Question27, formData.Question28, formData.Question29, formData.Question30, 
    formData.UserID
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting form data:', err);
      return res.status(500).send('Error inserting form data');
    }
    console.log('Form data inserted into database successfully!');
    res.status(200).send('Form data submitted successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});