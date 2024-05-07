async function fetchQuestions() {
    try {
        const response = await fetch('http://localhost/PO01/exam/10/Math/Exam_1/');
        if (!response.ok) {
            throw new Error('Failed to fetch directory listing');
        }
        const text = await response.text();
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(text, 'text/html');
        const links = htmlDocument.querySelectorAll('a[href$=".png"]');
        const imageUrls = Array.from(links).map(link => {
            // Construct full URL using base URL of directory listing page
            const baseUrl = 'http://localhost/PO01/exam/10/Math/Exam_1/';
            return new URL(link.getAttribute('href'), baseUrl).href;
        });
        
        const questionContainer = document.querySelector('.exam-content');
        const answerPanel = document.querySelector('.answer-panel');
        
        imageUrls.forEach((url, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.id = `question${index + 1}`;

            const img = document.createElement('img');
            img.src = url;
            img.alt = `Question ${index + 1}`;
            questionDiv.appendChild(img);

            // Create answer buttons
            const answerDiv = document.createElement('div');
            answerDiv.classList.add('answer-buttons');
            const answers = ['A', 'B', 'C', 'D'];
            answers.forEach(answer => {
                const button = document.createElement('button');
                button.textContent = answer;
                button.id = `answer-${index + 1}-${answer}`;
                button.addEventListener('click', () => handleAnswer(index + 1, answer));
                answerDiv.appendChild(button);
            });
            questionDiv.appendChild(answerDiv);

            questionContainer.appendChild(questionDiv);

            // Create answer label div in answer panel
            const answerLabelDiv = document.createElement('div');
            answerLabelDiv.classList.add('answer-label');
            answerLabelDiv.id = `answer-label${index + 1}`;
            const answerLabel = document.createElement('span');
            answerLabel.textContent = `Question ${index + 1}: `;
            answerLabelDiv.appendChild(answerLabel);
            answers.forEach(answer => {
                const circle = document.createElement('div');
                circle.classList.add('circle');
                circle.dataset.answer = answer;
                circle.id = `answer-circle-${index + 1}-${answer}`;
                circle.textContent = answer;
                answerLabelDiv.appendChild(circle);
            });
            answerPanel.appendChild(answerLabelDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

function handleAnswer(questionId, selectedAnswer) {
    // Remove previous selection
    const previousSelectedCircles = document.querySelectorAll(`#answer-label${questionId} .circle.blue`);
    previousSelectedCircles.forEach(circle => {
        circle.classList.remove('blue');
    });
    
    // Highlight selected answer
    const selectedCircle = document.querySelector(`#answer-circle-${questionId}-${selectedAnswer}`);
    if (selectedCircle) {
        selectedCircle.classList.add('blue');
    }
}

fetchQuestions();


document.addEventListener('DOMContentLoaded', function() {
    // Get the clock element
    const clock = document.getElementById('clock');
    let timerInterval; // Declare timerInterval variable in the outer scope

    // Function to start the exam
    function startExam() {
        // Enable the end exam button
        endExamButton.disabled = false;

        // Set the exam duration to 60 minutes
        let duration = 60 * 60; // 60 minutes in seconds

        // Update the clock every second
        timerInterval = setInterval(() => { // Assign to the timerInterval variable in the outer scope
            // Calculate minutes and seconds
            const minutes = Math.floor(duration / 60);
            const seconds = duration % 60;

            // Display the time
            clock.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            // Decrease the duration
            duration--;

            // Check if the time is up
            if (duration < 0) {
                clearInterval(timerInterval);
                // Disable the end exam button
                endExamButton.disabled = true;
            }
        }, 1000);
    }

    // Function to end the exam
    function endExam() {
        // Clear the timer interval
        clearInterval(timerInterval);
        // Disable the end exam button
        endExamButton.disabled = true;
    }

    // Get the buttons
    const startExamButton = document.getElementById('startExamButton');
    const endExamButton = document.getElementById('endExamButton');

    // Add event listeners
    startExamButton.addEventListener('click', startExam);
    endExamButton.addEventListener('click', endExam);
});
