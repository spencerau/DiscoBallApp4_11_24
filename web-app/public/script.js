
// Global variables
let clonedSvg;
const selectedAnswers = {};

let dbAnswers = {};

let currentQuestionIndex = 0; 

let prev_offset_arr = [];


// const colorMapping = [ 
//     "#57FF33", // Index 0
//     "#FF3357", // Index 1
//     "#F1C40F", // Index 2
//     "#3498DB", // Index 3
//     "#C72222", // Index 4
//     "#EB31A0", // Index 5
//     "#d63eed", // Index 6
//     "#8E44AD", // Index 7
//     "#8048d4", // Index 8
//     "#4055f5", // Index 9
//     "#40d1f5", // Index 10
//     "#34e0c4", // Index 11
//     "#3cb044", // Index 12
//     "#b6db51", // Index 13
//     "#f2e30c", // Index 14
//     "#ed9e2f", // Index 15
//     "#e74c3c"  // Index 16
// ];

const colorMapping = [
    "#c72222",
    "#eb31a0",
    "#d63eed",
    "#9a34c9",
    "#8048d4",
    "#4055f5",
    "#40d1f5",
    "#34e0c4",
    "#3cb044",
    "#b6db51",
    "#f2e30c",
    "#ed9e2f",
    "#b2da28",
    "#09d0df",
    "#0610d9",
    "#ca76da",
    "#d7cf9d",
    "#2383e0",
    "#dc6837",
    "#730d94",
    "#b31176",
    "#F1F890",
    "#275317",
    "#F8A390",
    "#ECC520",
    "#BE6A96",
    "#9C94E8",
    "#FF6969",
    "#F2B050",
    "#F890DD",
    "#47D45A",
    "#BF9659",
    "#66FFCC",
    "#FF37EC",
    "#FF0000",
    "#009999"
];


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
    prev_offset_arr.push(0); // Initialize with 0 for the first entry
    let cumulativeAnswers = 0; // To keep track of the cumulative number of answers

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

        // Update the cumulativeAnswers before moving to the next question
        cumulativeAnswers += q.answers.length;
        // For the next question, store the current total of answers as the offset
        prev_offset_arr.push(cumulativeAnswers);

        const nextButton = document.createElement('button');
        nextButton.classList.add('next-button');
        nextButton.textContent = 'Next';

        questionSection.appendChild(questionText);
        questionSection.appendChild(answersDiv);
        questionSection.appendChild(nextButton);

        container.appendChild(questionSection);
    });

    prev_offset_arr.pop();

    // Optionally, log or otherwise utilize prev_offset_arr
    console.log(prev_offset_arr);

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

    //console.log(`Question index: ${questionIndex}, Selected answer: ${selectedIntegerValue}`); // Debugging print statement
    
    if (questionIndex != 31) {
        prev = prev_offset_arr[questionIndex - 1];
        colorIndex = (prev + parseInt(selectedIntegerValue) - 1) % colorMapping.length;
        colorIndex += 0;
        //console.log(`Color Index: ${colorIndex}`); // Debugging print statement
        color = colorMapping[colorIndex];
        colorSegment(questionIndex, parseInt(selectedIntegerValue), color);
    }

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

    //console.log(dbAnswers);

    if (!clonedSvg || !(clonedSvg instanceof SVGSVGElement)) {
        console.error('Cloned SVG is not ready for saving.');
        return;
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
    fetch('https://discoball.vercel.app/api/server',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // Send the dbAnswers object to the server
            answers: dbAnswers
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
