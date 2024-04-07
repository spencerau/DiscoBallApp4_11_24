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

// inside the setupQuestionnaire(questions) function
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

// function handleOptionButtonClick() {
  //     // Remove 'selected' class from all buttons in the same group
  //     const optionButtons = this.parentElement.querySelectorAll('.option-button');
  //     optionButtons.forEach(button => {
  //         button.classList.remove('selected');
  //     });
  
  //     // Add 'selected' class to the clicked button
  //     this.classList.add('selected');
  
  //     // Store the selected option value
  //     const questionIndex = this.closest('.question-section').id.replace('question', '');
  //     if (this.classList.contains('selected')) {
  //         // If the button is selected, store its value
  //         dbAnswers[questionIndex] = parseInt(this.dataset.value);
  //     } else {
  //         // If the button is deselected, remove its value from dbAnswers
  //         delete dbAnswers[questionIndex];
  //     }
  
  //     // // Store the selected option value
  //     // const questionIndex = this.closest('.question-section').id.replace('question', '');
  //     // dbAnswers[questionIndex] = parseInt(this.dataset.value);
  
  // }


  // const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3000;

// // Connect to the MySQL database
// const connection = mysql.createConnection({
//     host: '35.185.219.33',
//     user: 'root',
//     password: 'myname',
//     database: 'Responses'
// });

// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to database:', err);
//         // Stop the server from starting if the connection fails
//         process.exit(1);
//     }
//     console.log('Connected to database successfully!');
// });

// // Middleware to parse JSON request bodies
// app.use(bodyParser.json());

// // Serve static files (HTML, CSS, JS, etc.)
// app.use(express.static('public'));

// // Define route to handle form submissions
// app.post('/submit-form', (req, res) => {
//     // Extract data from request body
//     const formData = req.body;

//     // Validate and sanitize form data (TODO: Implement validation and sanitization)

//     // Insert form data into database using parameterized query
//     const sql = `INSERT INTO Responses 
//               (Question1, Question2, Question3, Question4, Question5, Question6, Question7, Question8, Question9, Question10, 
//               Question11, Question12, Question13, Question14, Question15, Question16, Question17, Question18, Question19, Question20, 
//               Question21, Question22, Question23, Question24, Question25, Question26, Question27, Question28, Question29, Question30, UserID) 
//               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//     const values = [
//         formData.Question1, formData.Question2, formData.Question3, formData.Question4, formData.Question5, formData.Question6,
//         formData.Question7, formData.Question8, formData.Question9, formData.Question10, formData.Question11, formData.Question12,
//         formData.Question13, formData.Question14, formData.Question15, formData.Question16, formData.Question17, formData.Question18,
//         formData.Question19, formData.Question20, formData.Question21, formData.Question22, formData.Question23, formData.Question24,
//         formData.Question25, formData.Question26, formData.Question27, formData.Question28, formData.Question29, formData.Question30,
//         formData.UserID
//     ];

//     connection.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error inserting form data:', err);
//             return res.status(500).send('Error inserting form data');
//         }
//         console.log('Form data inserted into database successfully!');
//         res.status(200).send('Form data submitted successfully');
//     });
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// database connection 
// const mysql = require('mysql');
// Function to create a connection to the MySQL server
// function connectToMySQL(host, user, password, database) {
//     const connection = mysql.createConnection({
//         host: host,
//         user: user,
//         password: password,
//         database: mydatabase
//     });
//     connection.connect((err) => {
//         if (err) {
//             console.error('Error connecting to MySQL server: ' + err.stack);
//             return;
//         }
//         console.log('Connected to MySQL server successfully!');
//     });
//     return connection;
// }
// // Function to create a query cursor
// function createCursor(connection) {
//     const cursor = connection.query();
//     console.log('Cursor created successfully!');
//     return cursor;
// }
// // Example usage
// const host = '35.185.219.33';
// const user = 'root';
// const password = 'myname';
// const database = 'mydatabase';
// // Connect to MySQL server
// const connection = connectToMySQL(host, user, password, database);
// // Create a query cursor
// const cursor = createCursor(connection);
// // Close connection when done
// connection.end();

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// Assuming you're using Node.js with Express

// // const express = require('express');
// const bodyParser = require('body-parser');
// // const mysql = require('mysql');

// // const app = express();
// // const port = 3000;

// // Middleware to parse JSON body
// app.use(bodyParser.json());

// // Route handler to save form data
// app.post('/save-form-data', (req, res) => {
//     const formData = req.body.answers;

//     // Connect to MySQL server
//     const connection = mysql.createConnection({
//         host: host,
//         user: user,
//         password: password,
//         database: mydatabase
//     });

//     connection.connect(err => {
//         if (err) {
//             console.error('Error connecting to MySQL server:', err);
//             res.status(500).send('Error connecting to database');
//             return;
//         }

//         // Insert form data into database
//         const sql = 'INSERT INTO responses (answers) VALUES (?)';
//         connection.query(sql, [JSON.stringify(formData)], (err, result) => {
//             if (err) {
//                 console.error('Error inserting form data:', err);
//                 res.status(500).send('Error inserting form data');
//                 return;
//             }

//             console.log('Form data saved to database');
//             res.status(200).json({ message: 'Form data saved successfully' });
//         });
//     });
// });


// within the submitForm function
//     // Create a connection to the MySQL server
//     const connection = mysql.createConnection({
//         host: '35.185.219.33',
//         user: 'root',
//         password: 'myname',
//         database: 'mydatabase'
//     });

//     // Connect to the MySQL server
//     connection.connect((err) => {
//         if (err) {
//             console.error('Error connecting to MySQL server:', err);
//             return;
//         }
//         console.log('Connected to MySQL server successfully!');

//         // Prepare the INSERT statement
//         const sql = `INSERT INTO Responses 
//                     (Question1, Question2, Question3, Question4, Question5, Question6, Question7, Question8, Question9, 
//                     Question10, Question11, Question12, Question13, Question14, Question15, Question16, Question17, 
//                     Question18, Question19, Question20, Question21, Question22, Question23, Question24, Question25, 
//                     Question26, Question27, Question28, Question29, Question30, UserID)
//                     VALUES
//                     (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//         // Execute the INSERT statement
//         connection.query(sql, [...answersArray], (err, result) => {
//             if (err) {
//                 console.error('Error inserting form data:', err);
//                 return;
//             }
//             console.log('Form data saved to database');

//             // Close the connection when done
//             connection.end();
//         });
//     });



// json file with questions
{
  //     "question": "What’s my primary superpower?",
  //     "answers": [
  //         ["I can detect people’s moods", 1],
  //         ["I work well under pressure", 2],
  //         ["I have high focus abilities", 3],
  //         ["I am good at streamlining tasks for simplicity", 4],
  //         ["I have a good attention to detail", 5]
  //     ]
  // },
  // {
  //     "question": "What is your current occupation?",
  //     "answers": [
  //         ["Education/student", 1],
  //         ["Self-employed", 2],
  //         ["Work at a company or in industry", 3],
  //         ["Not employed", 4],
  //         ["Other", 5]
  //     ]
  // },
  // {
  //     "question": "What is your level of exposure to adversity?",
  //     "answers": [
  //         ["I have not experienced adversity", 1],
  //         ["I have experienced minimal adversity", 2],
  //         ["I have experienced moderate adversity", 3],
  //         ["I have experienced extensive adversity", 4]
  //     ]
  // },
  // {
  //     "question": "What sounds like your ideal way to spend your free time?",
  //     "answers": [
  //         ["Traveling", 1],
  //         ["Spending time in the great outdoors", 2],
  //         ["Going out with friends", 3],
  //         ["Chilling at home", 4],
  //         ["I don’t have free time", 5]
  //     ]
  // },
  // {
  //     "question": "How diverse is your food palette?",
  //     "answers": [
  //         ["Not at all", 1],
  //         ["A little", 2],
  //         ["A lot", 3],
  //         ["Extremely", 4]
  //     ]
  // },
  // {
  //     "question": "Where do you grow up?",
  //     "answers": [
  //         ["Grew up in the Bay Area", 1],
  //         ["Enjoyed the SoCal lifestyle", 2],
  //         ["Originated from another US State", 3],
  //         ["Started life in a different country", 4],
  //         ["Other", 5]
  //     ]
  // },
  // {
  //     "question": "Are you more of an introvert or an extrovert?",
  //     "answers": [
  //         ["Introvert", 1],
  //         ["Semi-introverted", 2],
  //         ["Semi-extroverted", 3],
  //         ["Extrovert", 4]
  //     ]
  // },
  // {
  //     "question": "What’s your favorite genre for movies/books",
  //     "answers": [
  //         ["Fantasy/sci-Fi", 1],
  //         ["Thriller/mystery", 2],
  //         ["Nonfiction", 3],
  //         ["Action/adventure", 4],
  //         ["Comedy", 5]
  //     ]
  // },
  // {
  //     "question": "How would you describe your fashion style?",
  //     "answers": [
  //         ["Casual and comfortable", 1],
  //         ["Trendy and fashionable", 2],
  //         ["Vintage and retro", 3],
  //         ["Professional and polished", 4],
  //         ["Alternative Styles", 5]
  //     ]
  // },
  // {
  //     "question": "Are you more of an analytical or emotional thinker?",
  //     "answers": [
  //         ["Analytical", 1],
  //         ["Semi-analytical", 2],
  //         ["Semi-emotional", 3],
  //         ["Emotional", 4]
  //     ]
  // },
  // {
  //     "question": "If you hear something derogatory towards someone in your group. How do you react?",
  //     "answers": [
  //         ["Confront the person who said it", 1],
  //         ["Report it to someone", 2],
  //         ["Console the person in your group", 3],
  //         ["Let it slide", 4]
  //     ]
  // },
  // {
  //     "question": "How receptive are you to adapting to unexpected changes in life?",
  //     "answers": [
  //         ["Not open", 1],
  //         ["Somewhat open", 2],
  //         ["Frequently open", 3],
  //         ["Always open", 4]
  //     ]
  // },
  // {
  //     "question": "How much of your day do you plan out beforehand?",
  //     "answers": [
  //         ["I go with the flow", 1],
  //         ["I keep loose track of my daily plans", 2],
  //         ["I plan my schedule to the hour", 3],
  //         ["I will never stray from my strict plans", 4]
  //     ]
  // },
  // {
  //     "question": "How willing are you to take risks in forming new relationships?",
  //     "answers": [
  //         ["Never", 1],
  //         ["Occasionally", 2],
  //         ["Frequently", 3],
  //         ["Always", 4]
  //     ]
  // },
  // {
  //     "question": "How do you typically cope with challenging or adverse situations?",
  //     "answers": [
  //         ["Comforting yourself with experiences you enjoy", 1],
  //         ["Distracting yourself with outside media", 2],
  //         ["Practicing introspection and expressing your feelings", 3],
  //         ["Performing mindfulness techniques for grounding yourself in the present", 4],
  //         ["Reach out to your support system for help", 5]
  //     ]
  // },
  // {
  //     "question": "How do you react to comparing yourself to others?",
  //     "answers": [
  //         ["Use it as a source of inspiration", 1],
  //         ["Feel a sense of jealousy", 2],
  //         ["Gain feelings of gratitude for your situation", 3],
  //         ["Develop feelings of scorn and negativity towards that person", 4]
  //     ]
  // },
  // {
  //     "question": "How often do you like or comment on others’ social media?",
  //     "answers": [
  //         ["Never", 1],
  //         ["Once in a while", 2],
  //         ["Frequently", 3],
  //         ["All the time", 4]
  //     ]
  // },
  // {
  //     "question": "How likely are you to collaborate with someone different from you?",
  //     "answers": [
  //         ["Never", 1],
  //         ["Not a lot", 2],
  //         ["Frequently", 3],
  //         ["As often as I’m able to", 4]
  //     ]
  // },
  // {
  //     "question": "How often do you give in to peer pressure?",
  //     "answers": [
  //         ["Never", 1],
  //         ["Sometimes", 2],
  //         ["Frequently", 3],
  //         ["All the time", 4]
  //     ]
  // },
  // {
  //     "question": "Are you more likely to be motivated by internal factors (satisfaction) or external factors (prizes)?",
  //     "answers": [
  //         ["Internally", 1],
  //         ["Mostly internally", 2],
  //         ["Mostly externally", 3],
  //         ["Externally", 4]
  //     ]
  // },
  // {
  //     "question": "What best describes your sense of humor?",
  //     "answers": [
  //         ["Slapstick/physical", 1],
  //         ["Dad jokes/puns", 2],
  //         ["Self-deprecating", 3],
  //         ["Dark humor", 4]
  //     ]
  // },
  // {
  //     "question": "How do you react when getting praise/compliments in public?",
  //     "answers": [
  //         ["I take it as validation of my work, finding motivation in recognition.", 1],
  //         ["I don’t like it, preferring to work behind the scenes and stay humble.", 2],
  //         ["I get uncomfortable when it happens, seeing it as unnecessary attention", 3],
  //         ["I have mixed feelings; I appreciate the praise while worrying about increased expectations and pressure.", 4]
  //     ]
  // },
  // {
  //     "question": "How often do you interact with people who are different from you?",
  //     "answers": [
  //         ["Never", 1],
  //         ["Very infrequently", 2],
  //         ["Often", 3],
  //         ["Always", 4]
  //     ]
  // },
  // {
  //     "question": "How direct or open are you in your communication?",
  //     "answers": [
  //         ["Very indirect", 1],
  //         ["Somewhat indirect", 2],
  //         ["Somewhat direct", 3],
  //         ["Very direct", 4]
  //     ]
  // },
  // {
  //     "question": "Which type of organizational environment do you most thrive in?",
  //     "answers": [
  //         ["Very flexible", 1],
  //         ["Somewhat unstructured", 2],
  //         ["Somewhat structured", 3],
  //         ["Highly structured", 4]
  //     ]
  // },
  // {
  //     "question": "How do you react to feedback from others?",
  //     "answers": [
  //         ["I let it roll off my back with little to no thought to it", 1],
  //         ["I pay attention somewhat or select what parts to take away", 2],
  //         ["I review each aspect and consider why each comment was made", 3],
  //         ["I replay the information repeatedly until I feel I have resolved it within myself", 4]
  //     ]
  // },
  // {
  //     "question": "In the moment that I disagree with someone’s opinion, I am most likely to",
  //     "answers": [
  //         ["Ask direct questions to get clarification", 1],
  //         ["Use only my body language to express dissent", 2],
  //         ["Change my approach to the discussion", 3],
  //         ["Keep it to myself", 4]
  //     ]
  // },
  // {
  //     "question": "I would describe my primary expression of patience as:",
  //     "answers": [
  //         ["Endless patience for others", 1],
  //         ["Exercising patience with myself", 2],
  //         ["No time to be patient", 3],
  //         ["Sometimes patient", 4],
  //         ["No time left to be patient", 5]
  //     ]
  // },
  // {
  //     "question": "My public speaking skills are:",
  //     "answers": [
  //         ["Not so hot", 1],
  //         ["Ok", 2],
  //         ["Pretty good", 3],
  //         ["Really good", 4]
  //     ]
  // }
  // 