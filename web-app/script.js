
// Global variables
let clonedSvg = null;
const selectedAnswers = {};

let dbAnswers = {};

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

function handleNextButtonClick(button, index, buttons) {
    const isLastQuestion = index + 1 === buttons.length;
    const selectedAnswerButton = button.parentElement.querySelector('.answer-button.selected');

    // Proceed with the rest of the logic for handling multiple-choice questions
    if (!selectedAnswerButton) {
        alert('Please select an answer before proceeding to the next question.');
        return;
    }
    const selectedIntegerValue = selectedAnswerButton.dataset.value;
    const questionIndex = button.closest('.question-section').id.replace('question', '');
    dbAnswers[questionIndex] = parseInt(selectedIntegerValue);

    // Check if it's the last question
    if (isLastQuestion) {
        // Process the final question differently
        submitForm();
        window.location.href = 'end.html'; //sends to end.html
    }

    // Move to the next question
    const currentSection = button.parentElement;
    if (currentSection) {
        currentSection.classList.add('hidden');
    }

    const nextSection = currentSection.nextElementSibling;
    if (nextSection) {
        nextSection.classList.remove('hidden');
    } else {
        console.error('Next question section not found');
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
   
// Assuming this function is called when all questions are answered
function submitForm() {
    // Convert dbAnswers object to an array
    const answersArray = Object.values(dbAnswers);

    // Make an HTTP POST request to the server
    fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // Send the answers array to the server
            answers: answersArray
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to submit form');
        }
        return response.json(); // Assuming the server sends JSON response
    })
    .then(data => {
        console.log('Form data submitted successfully:', data);
        // Handle success, if needed
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        // Handle error, if needed
    });


}








