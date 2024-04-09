
// Global variables
let clonedSvg;
const selectedAnswers = {};

let dbAnswers = {};

let currentQuestionIndex = 0; 

const colorMapping = {
    1: "#8E44AD", 
    2: "#3357FF", 
    3: "#57FF33", 
    4: "#FF3357", 
    5: "#F1C40F",
    6: "#3498DB",
    7: "#C72222",
    8: "#EB31A0",
    9: "#d63eed",
    10: "#9a34c9",
    11: "#8048d4",
    12: "#4055f5",
    13: "#40d1f5",
    14: "#34e0c4",
    15: "#3cb044",
    16: "#b6db51",
    17: "#f2e30c",
    18: "#ed9e2f"
};


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

    //console.log("QUESTION INDEX: " + questionIndex);

    // Check if it's the last question
    if (isLastQuestion) {
        console.log("About to call submitForm", clonedSvg);
        // Process the final question differently
        submitForm();

        // Hide the current question section
        const currentSection = button.closest('.question-section');
        if (currentSection) {
            currentSection.classList.add('hidden');
        }

        return; // Exit the function to prevent further execution
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


function fetchAndEmbedSvg(svgPath, containerId, callback) {
    console.log(`Starting to fetch and embed SVG from: ${svgPath}`);
    fetch(svgPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(svgData => {
            const container = document.getElementById(containerId);
            if (container) {
                console.log(`Embedding SVG into container: ${containerId}`);
                container.innerHTML = svgData;
                console.log(`SVG embedded successfully.`);
                if (callback) callback();
            } else {
                console.error(`Container with ID ${containerId} not found.`);
            }
        })
        .catch(error => console.error('Error fetching SVG:', error));
}



function cloneSvgElement(containerId) {
    console.log(`Starting to clone SVG in container: ${containerId}`);
    const container = document.getElementById(containerId);
    const originalSvg = container.querySelector('svg');
    if (originalSvg) {
        clonedSvg = originalSvg.cloneNode(true);
        console.log(`SVG cloned successfully.`);
        
    } else {
        console.error('Original SVG element not found for cloning.');
    }
}



document.addEventListener('DOMContentLoaded', () => {
    fetchQuestions();
    // fetchDBQuestions();
    //const DBquestions = JSON.parse(fetchQuestions());

    console.log("Questions Loaded")
    
    const svgPath = 'assets/28discoball_custom_30.svg'; 
    const containerId = 'svgContainer'; // The ID of the container where the SVG will be embedded
    
    fetchAndEmbedSvg(svgPath, containerId, function() {
        cloneSvgElement(containerId);
    
    });
});
    

function colorSegment(questionIndex, answer, color) {

    const classSelector = `.q${questionIndex}`;
    
    console.log(`inside colorSegment(): Coloring segment: ${classSelector} with color: ${color} for answer: ${answer}`); // Debugging print statement

    const svgElements = clonedSvg.querySelectorAll(classSelector);
    
    svgElements.forEach(element => {
        if (element) {
            element.style.fill = color;
        } else {
            console.warn(`Element with class ${classSelector} not found in cloned SVG.`);
        }
    });
}



function saveSvg(svgElement, filename) {
    // Serialize the SVG element to a string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    // Encode the SVG string in a data URL
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    // Create a temporary anchor element and trigger a download
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink); // Remove the anchor element after triggering the download

    // Clean up the URL object
    URL.revokeObjectURL(svgUrl);
}

   
// Assuming this function is called when all questions are answered
function submitForm() {
    // Convert dbAnswers object to an array
    const answersArray = Object.values(dbAnswers);

    console.log(dbAnswers);

    if (!clonedSvg || !(clonedSvg instanceof SVGSVGElement)) {
        console.error('Cloned SVG is not ready for saving.');
        return;
    }

    for (const [questionIndex, answer] of Object.entries(dbAnswers)) {
        // Calculate color index, ensuring that we start counting from 0
        const colorIndex = (questionIndex + answer - 1) % Object.keys(colorMapping).length;
        // Use the color index to get the color from our mapping
        // Add 1 because our mapping starts at 1, not 0
        const color = colorMapping[colorIndex + 1];
        console.log(`OUTSIDE FUNCTION CALL: Question index: ${questionIndex}, Answer: ${answer}, Color: ${color}`); // Print statement
    
        if (color) {
            colorSegment(questionIndex, answer, color);
        } else {
            console.error(`No color defined for answer: ${answer}`);
        }
    }

    // Append the colored SVG to the display container
    const svgDisplayContainer = document.getElementById('svgDisplayContainer');
    svgDisplayContainer.innerHTML = ''; // Clear the container
    svgDisplayContainer.appendChild(clonedSvg); // Add the colored SVG to the container

    // Show the download button
    const downloadButton = document.getElementById('download-button');
    downloadButton.style.display = 'flex'; // Use 'flex' to make it visible


    // Event listener for the download button
    downloadButton.addEventListener('click', function() {
        saveSvg(clonedSvg, 'export_discoball.svg');
    });
    
    // Make an HTTP POST request to the server
    fetch('https://discoball.vercel.app/api/submit-form',{
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








