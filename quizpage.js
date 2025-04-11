document.addEventListener('DOMContentLoaded', () => {
    //  clearing the log so everytime user starts a fresh quiz and hence result is calculated for the current quiz
     localStorage.removeItem("score");
     localStorage.removeItem("right");
     localStorage.removeItem("wrong");
     localStorage.removeItem("unanswered");
     localStorage.removeItem("totalTimeTaken");
     localStorage.removeItem("quizStartTime");
 
    //  this will help in tracking Total time taken
     localStorage.setItem("quizStartTime", Date.now());

    //  Accessing html element to display the quiz
    const topicDisplay = document.querySelector('.topic-display');
    const timer = document.querySelector('.quiz-timer');
    const scoreDisplay = document.querySelector('.quiz-detail span');
    const quesNumDisplay = document.querySelector('.quesNum');
    const quesDisplay = document.querySelector('.quesDis');
    const optionDisplay = document.querySelector('.options');
    const quesToggle = document.querySelector('.quesToggle');


    const selectedTopicKey = localStorage.getItem("selectedTopic"); 
    topicDisplay.textContent = selectedTopicKey;
    // This will set the Title of the page to whatever Topic user has selected!
    document.title = selectedTopicKey;

    const questions = myQuiz[selectedTopicKey];
    console.log(questions[1].options);

    let quesIndex = 0;
    let score = 0;
    let right = 0;
    let wrong = 0;
    let unanswered = 0;
    let timerInterval;
    let timerCount = 10;
    
    // Startng the quiz
    const startQuiz = () => {
        displayQuestion();
        quizTimer();
    }
    // when user first gets redirected to the quiz page, it will load the 1st question
    const displayQuestion = () => {
        optionDisplay.innerHTML = "";
        quesNumDisplay.innerHTML = `${quesIndex + 1}/${questions.length}`
        quesDisplay.innerHTML = questions[quesIndex].question;
        
        // I saved the options and used a foreach loop to display it and then added the eventListener to store answer and match it.
        const options = questions[quesIndex].options;
 
    options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.innerHTML = option;
        optionDisplay.appendChild(optionButton);
        let correctAnswer = questions[quesIndex].answer;
        let selectedAnswer = option;

        optionButton.addEventListener('click', () => {
            optionButton.disabled = true;
            if(selectedAnswer === correctAnswer){
                score++;
                right++
                scoreDisplay.innerHTML = score;
                optionButton.style.backgroundColor = "#0ad0f4";
                optionButton.style.color = "white";
            }else{
                score--;
                wrong++;
                scoreDisplay.innerHTML = score;
                optionButton.style.backgroundColor = "#0ad0f4";
                optionButton.style.color = "white";
            }
            })
        
    });
    // calling quiztimer here too so that if a user does not answer before it runs out, it will mark it as unanswered
    quizTimer();
    }


    // This is for the Next question button. Upto 9th question the text shows Next Question and on 10th it changes to Finish and when Finish is clicked it redirects the user the result page
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = "Next Question";
    quesToggle.appendChild(toggleButton);

    toggleButton.addEventListener('click', () => {
        toggleButton.style.backgroundColor = "#0ad0f4";
        toggleButton.style.color = "white";
        nextQuestion();
        
        if(selectedAnswer === correctAnswer){
            score++;
            right++;
        }else{
            score--;
            wrong++;
        }
        if(quesIndex === questions.length-1){
            toggleButton.innerHTML = "Finish";
            goToResult();
        }
        
    })

    // Function for Next Question
    const nextQuestion = () => {
        quesIndex++;
    
        if (quesIndex < questions.length) {
            displayQuestion();
            toggleButton.style.backgroundColor = "white";
        toggleButton.style.color = "#0ad0f4";
        } else {
            goToResult();
        }
    };


    // For the timer, I have used setInterval. The timer is displaying for each question and also redirects to next question if time runs out. I have kept the timer for 10 seconds only !
    const quizTimer = () => {
        clearInterval(timerInterval); 
    
        timerCount = 10; 
        timer.innerHTML = timerCount;
    
        timerInterval = setInterval(() => {
            if (timerCount > 0) {
                timerCount--;
                timer.innerHTML = timerCount; 
            } else {
                unanswered++;
                clearInterval(timerInterval);
                nextQuestion(); 
            }
        }, 1000);
    };
    // This is for the user to finish the quiz and get redirected to the Result page. Before getting redirected, I am saving everything that will be used to display the result to the localStorage.
    const goToResult = () => {
        const quizEndTime = Date.now();
        const quizStartTime = localStorage.getItem("quizStartTime");

        if (quizStartTime) {
            const totalTimeTaken = Math.floor((quizEndTime - Number(quizStartTime)) / 1000);
            localStorage.setItem("totalTimeTaken", totalTimeTaken);
        }
        localStorage.setItem("score", score);
        localStorage.setItem("right", right);
        localStorage.setItem("wrong", wrong);
        localStorage.setItem("unanswered", unanswered);
        localStorage.setItem("questions.length", questions.length);

        window.location.href = "result.html";
    }
    
// I could have added a function where when the button for correct answer is also highlighted when user clicks a wrong option for answer. But I think that was not required for the project. Also Since everything is dynamic and topics are direct linked to the array, we dont have to tackel the problem for what if a user clicks the topic and questions are not available.
    
// Calling the function
    startQuiz();
});