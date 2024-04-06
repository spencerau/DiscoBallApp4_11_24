// Global variables
let clonedSvg = null;
const selectedAnswers = {};

let dbAnswers = {};

// document.addEventListener('DOMContentLoaded', () => {
//     fetchQuestions(); // Start fetching questions
//     fetch('../assets/DiscoBallSilver.svg') // Adjust the path to the SVG file
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.text();
//         })
//         .then(svgData => {
//             const svgContainer = document.getElementById('svgContainer');
//             svgContainer.innerHTML = svgData;
//             // This is your original SVG now part of the DOM
//             const originalSvg = svgContainer.querySelector('svg');
            
//             // Assign a new ID to your original SVG if necessary
//             originalSvg.id = 'originalSvgId'; 

//             // Make a copy of the SVG for manipulation
//             clonedSvg = originalSvg.cloneNode(true);
//             // Assign a new ID to the cloned SVG to differentiate it
//             clonedSvg.id = 'clonedSvgId';

//             // Continue with any additional initialization...
//         })
//         .catch(error => console.error('Error loading SVG:', error));

// });

document.addEventListener('DOMContentLoaded', () => {
    fetchQuestions(); // Start fetching questions
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

            // Show the cloned SVG after it's initialized
            // showCurrentDiscoBall();

            // Continue with any additional initialization...
        })
        .catch(error => console.error('Error loading SVG:', error));
});

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

// function fetchQuestions() {
//     console.log('Attempting to fetch questions');
//     fetch('questions.json')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(questions => {
//         console.log('Questions fetched successfully', questions);
//         setupQuestionnaire(questions);
//       })
//       .catch(error => console.error('Error loading questions:', error));
//   }


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

        // Check if it's the last question
        // if (index === questions.length - 1) {
        //     const participantIdInput = document.createElement('input');
        //     participantIdInput.type = 'text';
        //     participantIdInput.id = 'participantIdInput';
        //     participantIdInput.placeholder = 'Enter Participant ID';
        //     answersDiv.appendChild(participantIdInput);
        // } 
        // if (index === questions.length - 1) {
        //     // Create a div to hold the multiple-choice options
        //     const participantIdOptionsDiv = document.createElement('div');
        //     participantIdOptionsDiv.classList.add('participant-id-options');
        
        //     // Create buttons for each option
        //     for (let i = 1; i <= 20; i++) {
        //         const optionButton = document.createElement('button');
        //         optionButton.classList.add('option-button');
        //         optionButton.textContent = i.toString(); // Option button text is the option number
        //         optionButton.dataset.value = i; // Store the option value in the dataset
        //         optionButton.addEventListener('click', handleOptionButtonClick); // Add event listener to handle option click
        //         participantIdOptionsDiv.appendChild(optionButton);
        //     }
        
        //     answersDiv.appendChild(participantIdOptionsDiv);
        // }
        // else {
        //     // Check if it's a text input question
            
        // }

        if (q.answers.length === 0) {
            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.id = `textInput${index + 1}`;
            textInput.placeholder = 'Your answer here...';
            answersDiv.appendChild(textInput);
        } else {
            // It's a multiple choice question
            q.answers.forEach(answerTuple => {
                const answerButton = document.createElement('button');
                answerButton.classList.add('answer-button');
                answerButton.textContent = answerTuple[0]; // Display the text part of the tuple
                answerButton.dataset.answer = answerTuple[0]; // Store the text part of the tuple in the dataset
                answerButton.dataset.value = answerTuple[1]; // Store the integer part of the tuple in the dataset
                answersDiv.appendChild(answerButton);
            });
        }

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
        startButton.addEventListener('click', () => {
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
        button.addEventListener('click', () => handleNextButtonClick(button, index, buttons));
    });

    document.querySelectorAll('.answer-button').forEach(button => {
        button.addEventListener('click', handleAnswerButtonClick);
    });
}

function handleOptionButtonClick() {
    // Remove 'selected' class from all buttons in the same group
    const optionButtons = this.parentElement.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
        button.classList.remove('selected');
    });

    // Add 'selected' class to the clicked button
    this.classList.add('selected');

    // Store the selected option value
    const questionIndex = this.closest('.question-section').id.replace('question', '');
    if (this.classList.contains('selected')) {
        // If the button is selected, store its value
        dbAnswers[questionIndex] = parseInt(this.dataset.value);
    } else {
        // If the button is deselected, remove its value from dbAnswers
        delete dbAnswers[questionIndex];
    }

    // // Store the selected option value
    // const questionIndex = this.closest('.question-section').id.replace('question', '');
    // dbAnswers[questionIndex] = parseInt(this.dataset.value);

}

function handleNextButtonClick(button, index, buttons) {
    const isLastQuestion = index + 1 === buttons.length;
    const selectedAnswerButton = button.parentElement.querySelector('.answer-button.selected');

    // Check if it's the last question
    // if (isLastQuestion) {
    //     const participantIdInput = document.getElementById('participantIdInput');
    //     if (participantIdInput.value.trim() === '') {
    //         alert('Please enter your Participant ID before proceeding.');
    //         return;
    //     } else {
    //         const questionIndex = button.closest('.question-section').id.replace('question', '');
    //         dbAnswers[questionIndex] = participantIdInput.value.trim();
    //     }
    // } else {
        
    // }

    // Proceed with the rest of the logic for handling multiple-choice questions
    if (!selectedAnswerButton) {
        alert('Please select an answer before proceeding to the next question.');
        return;
    }
    const selectedIntegerValue = selectedAnswerButton.dataset.value;
    const questionIndex = button.closest('.question-section').id.replace('question', '');
    dbAnswers[questionIndex] = parseInt(selectedIntegerValue);

    // Rest of the code remains unchanged
    const currentSection = button.parentElement;
    if (currentSection) {
        currentSection.classList.add('hidden');
    }

    const nextSection = currentSection.nextElementSibling;
    if (nextSection) {
        nextSection.classList.remove('hidden');
    } else if (isLastQuestion) {
        console.log('End of the questionnaire');
        submitForm();
    }
}


function handleAnswerButtonClick() {
    // Remove 'selected' from all buttons in this answer group
    this.parentElement.querySelectorAll('.answer-button').forEach(btn => {
        btn.classList.remove('selected');
    });
    this.classList.add('selected');

    // Store the selected answer
    const questionIndex = this.closest('.question-section').id.replace('question', '');
    selectedAnswers[questionIndex] = this.dataset.answer;

    // Show the current state of the disco ball
    // showCurrentDiscoBall();
}


document.addEventListener('DOMContentLoaded', () => {
    fetchQuestions();
    // fetchDBQuestions();
    const DBquestions = JSON.parse(fetchQuestions());

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

// function showCurrentDiscoBall() {
//     const svgDisplayContainer = document.getElementById('svgDisplayContainer'); // Replace with your actual container ID
//     svgDisplayContainer.innerHTML = ''; // Clear any existing content
//     // svgDisplayContainer.appendChild(clonedSvg); 

    
//     // Check if clonedSvg is null or undefined
//     if (clonedSvg) {
//         svgDisplayContainer.appendChild(clonedSvg); // Append the cloned SVG
//     } else {
//         console.error('clonedSvg is null or undefined');
//     }
// }

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
  
    // Display the response integers
    const responseDisplay = document.getElementById('response-display');
    responseDisplay.textContent = 'Response Integers: ' + answersArray.join(', ');
  
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
        database: mydatabase
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
        database: mydatabase
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
const database = 'mydatabase';
// Connect to MySQL server
const connection = connectToMySQL(host, user, password, database);
// Create a query cursor
const cursor = createCursor(connection);
// Close connection when done
connection.end();
