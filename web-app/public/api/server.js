const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'default', // Your PostgreSQL username
  host: 'ep-steep-paper-a5ee1vud-pooler.us-east-2.aws.neon.tech', // Your PostgreSQL host
  database: 'verceldb', // Your PostgreSQL database name
  password: 'X2eJq7prMbNS', // Your PostgreSQL password
  port: 5432, // Your PostgreSQL port (default is 5432)
  ssl: { rejectUnauthorized: false } // Disabling SSL certificate verification (use with caution)
});

// Define route to handle form submissions
app.use(express.json()); // Parse JSON request bodies

app.post('/submit-form', async (req, res) => {
  // Extract data from request body
  const formData = req.body;

  // Validate and sanitize form data (TODO: Implement validation and sanitization)

  // Insert form data into database using parameterized query
  const query = `INSERT INTO Responses 
              (Question1, Question2, Question3, Question4, Question5, Question6, Question7, Question8, Question9, Question10, 
              Question11, Question12, Question13, Question14, Question15, Question16, Question17, Question18, Question19, Question20, 
              Question21, Question22, Question23, Question24, Question25, Question26, Question27, Question28, Question29, Question30, UserID) 
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31)`;

  const values = [
    formData.Question1, formData.Question2, formData.Question3, formData.Question4, formData.Question5, formData.Question6,
    formData.Question7, formData.Question8, formData.Question9, formData.Question10, formData.Question11, formData.Question12, 
    formData.Question13, formData.Question14, formData.Question15, formData.Question16, formData.Question17, formData.Question18, 
    formData.Question19, formData.Question20, formData.Question21, formData.Question22, formData.Question23, formData.Question24, 
    formData.Question25, formData.Question26, formData.Question27, formData.Question28, formData.Question29, formData.Question30, 
    formData.UserID
  ];

  try {
    const result = await pool.query(query, values);
    console.log('Form data inserted into database successfully!');
    res.status(200).send('Form data submitted successfully');
  } catch (error) {
    console.error('Error inserting form data:', error);
    res.status(500).send('Error inserting form data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
