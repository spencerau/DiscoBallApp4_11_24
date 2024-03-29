// Global variables
let clonedSvg = null;
const selectedAnswers = {};

let dbAnswers = {};


function fetchQuestions() {
    console.log('Attempting to fetch questions');
    fetch('questions.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(questions => {
        console.log('Questions fetched successfully', questions);
        setupQuestionnaire(questions);
      })
      .catch(error => console.error('Error loading questions:', error));
  }
  

function fetchDBQuestions() {
  console.log('Attempting to fetch questions');
  fetch('questions_db.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(questions => {
      console.log('Questions fetched successfully', questions);
      setupQuestionnaire(questions);
    })
    .catch(error => console.error('Error loading questions:', error));
}

function setupQuestionnaire(questions) {
const container = document.getElementById('questions-container');

questions.forEach((q, index) => {
    const questionSection = document.createElement('div');
    questionSection.classList.add('question-section', 'hidden');
    questionSection.id = `question${index + 1}`;

    const questionText = document.createElement('p');
    questionText.classList.add('question');
    questionText.textContent = q.question;

    const answersDiv = document.createElement('div');
    answersDiv.classList.add('answers');

    q.answers.forEach(answer => {
    const answerButton = document.createElement('button');
    answerButton.classList.add('answer-button');
    answerButton.textContent = answer;
    answerButton.dataset.answer = answer;
    answersDiv.appendChild(answerButton);
    });

    const nextButton = document.createElement('button');
    nextButton.classList.add('next-button');
    nextButton.textContent = 'Next';

    questionSection.appendChild(questionText);
    questionSection.appendChild(answersDiv);
    questionSection.appendChild(nextButton);

    container.appendChild(questionSection);
});

addEventListeners();
}

function addEventListeners() {
const startButton = document.getElementById('start-button');
if (startButton) {
    startButton.addEventListener('click', function() {
    document.getElementById('welcome-section').classList.add('hidden');
    const firstQuestion = document.getElementById('question1');
    if (firstQuestion) {
        firstQuestion.classList.remove('hidden');
    } else {
        console.error('First question section not found');
    }
    });
} else {
    console.error('Start button not found');
}

document.querySelectorAll('.next-button').forEach((button, index, buttons) => {
    button.addEventListener('click', function() {
    const currentSection = document.getElementById(`question${index + 1}`);
    const nextSection = document.getElementById(`question${index + 2}`);
    if (currentSection) {
        currentSection.classList.add('hidden');
    }
    if (nextSection) {
        nextSection.classList.remove('hidden');
    } else if (index + 1 === buttons.length) {
        console.log('End of the questionnaire');
        submitForm();
    }
    });
});

document.querySelectorAll('.answer-button').forEach(button => {
    button.addEventListener('click', function() {
      // Remove 'selected' from all buttons in this answer group
      this.parentElement.querySelectorAll('.answer-button').forEach(btn => {
        btn.classList.remove('selected');
      });
      this.classList.add('selected');
  
      // Store the selected answer
      const questionIndex = this.closest('.question-section').id.replace('question', '');
      selectedAnswers[questionIndex] = this.dataset.answer;
      // dbAnswers[questionIndex] = this.DBquestions
  
      // Update the cloned SVG with the selected answer's color
      // const selectedAnswer = this.dataset.answer;
      // const mapping = answerMapping[selectedAnswer];
      // if (mapping && clonedSvg) {
      //   colorSegment(mapping.elementId, mapping.color);
      // } else {
      //   console.warn(`No color mapping found for answer: ${selectedAnswer}`);
      // }
  
      // Show the current state of the disco ball
      showCurrentDiscoBall();
    });
  });
  
}

document.addEventListener('DOMContentLoaded', () => {
    fetchQuestions();
    // fetchDBQuestions();
    const DBquestions = JSON.parse(fetchDBQuestions());

    fetch('../assets/DiscoBallSilver.svg') // Adjust the path to the SVG file
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(svgData => {
            const svgContainer = document.getElementById('svgContainer');
            svgContainer.innerHTML = svgData;
            // This is your original SVG now part of the DOM
            const originalSvg = svgContainer.querySelector('svg');
            
            // Assign a new ID to your original SVG if necessary
            originalSvg.id = 'originalSvgId'; 

            // Make a copy of the SVG for manipulation
            clonedSvg = originalSvg.cloneNode(true);
            // Assign a new ID to the cloned SVG to differentiate it
            clonedSvg.id = 'clonedSvgId';

            // Append the cloned SVG to the DOM if needed, or keep it off-DOM until needed
            // document.body.appendChild(clonedSvg); // Uncomment if you want to append it immediately

            // Continue with any additional initialization...
        })
        .catch(error => console.error('Error loading SVG:', error));
});


/**
 * Colors an SVG segment with the provided color.
 * @param {string} elementId - The ID of the SVG element to color.
 * @param {string} color - The color to apply to the element.
 */
function colorSegment(elementId, color) {
    const svgElement = clonedSvg.getElementById(elementId); // Use getElementById on the cloned SVG
    if (svgElement) {
      svgElement.style.fill = color;
    } else {
      console.warn(`Element with ID ${elementId} not found in the cloned SVG.`);
    }
  }
  // Example usage:
  // colorSegment('visualSegmentId', '#FF0000');

function showCurrentDiscoBall() {
    const svgDisplayContainer = document.getElementById('svgDisplayContainer'); // Replace with your actual container ID
    svgDisplayContainer.innerHTML = ''; // Clear any existing content
    svgDisplayContainer.appendChild(clonedSvg); // Append the cloned SVG
}

// ... call showCurrentDiscoBall() whenever you want to display the updated disco ball
// (e.g. after each question is answered)  
  














// // function to put into the database (FIX)
// app.put("/registro", jsonParser, function (req, res) {
//   var email = req.body.email;
//   // llamar a la funcion encriptar para encriptar la contrasena 
//   var password = (0, encriptacion_1.encriptar)(req.body.password);
//   var puntos = req.body.puntos;
//   connection.query("INSERT INTO Usuario (email,password,puntos) VALUES (?,?,?)", [email, password, puntos], function (error, results, fields) {
//       if (error)
//           throw error;
//       res.send(JSON.stringify({ "mensaje": true, "resultado": results }));
//   });
// });



// formValues = {
//   Usuario_email: this.signInService.signInData.email,
//   gusto1: 0,
//   gusto2: 0,
//   gusto3: 0,
//   gusto4: 0,
//   gusto5: 0
// };

// // make a funcion for each radio button 
// public pregunta1(): void {
//   this.formValues.gusto1 = 1;
// }

// public pregunta2(): void {
//   this.formValues.gusto2 = 1;
// }

// public pregunta3(): void {
//   this.formValues.gusto3 = 1;
// }

// public pregunta4(): void {
//   this.formValues.gusto4 = 1;
// }

// public pregunta5(): void {
//   this.formValues.gusto5 = 1;
// }


// public ingresarDatos(): void {
    
//   const apiUrl = 'http://localhost:3000';
//   const url = `${apiUrl}/formulario`; 
//   this.http.post<ApiResponse>(url, this.formValues).subscribe(
//     () => {
//       // Handle success
//       console.log('Form data saved successfully!');
//       console.log("form values");
//       console.log(this.formValues);
//     },
//     (error) => {
//       // Handle error
//       console.error('Error saving form data:', error);
//     }
//   );

// }


// Assuming this function is called when all questions are answered
function submitForm() {
  // Convert selectedAnswers object to an array
  const answersArray = Object.values(dbAnswers);
  
  // Send data to server-side script
  fetch('/save-form-data', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answers: answersArray })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      console.log('Form data saved successfully:', data);
      // Optionally, perform any actions based on the server's response
  })
  .catch(error => console.error('Error saving form data:', error));
}



// Assuming you're using Node.js with Express
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Route handler to save form data
app.post('/save-form-data', (req, res) => {
    const formData = req.body.answers;

    // Connect to MySQL server
    const connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });

    connection.connect(err => {
        if (err) {
            console.error('Error connecting to MySQL server:', err);
            res.status(500).send('Error connecting to database');
            return;
        }

        // Insert form data into database
        const sql = 'INSERT INTO responses (answers) VALUES (?)';
        connection.query(sql, [JSON.stringify(formData)], (err, result) => {
            if (err) {
                console.error('Error inserting form data:', err);
                res.status(500).send('Error inserting form data');
                return;
            }

            console.log('Form data saved to database');
            res.status(200).json({ message: 'Form data saved successfully' });
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// database connection 
// const mysql = require('mysql');
// Function to create a connection to the MySQL server
function connectToMySQL(host, user, password, database) {
    const connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL server: ' + err.stack);
            return;
        }
        console.log('Connected to MySQL server successfully!');
    });
    return connection;
}
// Function to create a query cursor
function createCursor(connection) {
    const cursor = connection.query();
    console.log('Cursor created successfully!');
    return cursor;
}
// Example usage
const host = '35.185.219.33';
const user = 'root';
const password = 'myname';
const database = 'celebratory-tech';
// Connect to MySQL server
const connection = connectToMySQL(host, user, password, database);
// Create a query cursor
const cursor = createCursor(connection);
// Close connection when done
connection.end();
