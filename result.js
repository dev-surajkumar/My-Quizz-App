document.addEventListener('DOMContentLoaded', () => {
    const result = document.querySelector('.result-detail');


    // Getting all the values that I have stored in the local storage
    const username = localStorage.getItem("userName") || "Unknown User";
    const score = parseInt(localStorage.getItem("score")) || 0;
    const right = parseInt(localStorage.getItem("right")) || 0;
    const wrong = parseInt(localStorage.getItem("wrong")) || 0;
    const unanswered = parseInt(localStorage.getItem("unanswered")) || 0;
    const totalTimeTaken = localStorage.getItem("totalTimeTaken") || "Unknown";
    const questLength = Number(localStorage.getItem("questions.length"));

    const totalQuestions = questLength;

    // Calculating percentage
    const percentage = totalQuestions > 0 ? ((right / totalQuestions) * 100).toFixed(2) : 0;

    result.innerHTML = `
                        <p>${username}, your result is:</p>
                        <p>Total Time Taken: ${totalTimeTaken} seconds</p>
                        <p>Total Questions: ${totalQuestions}</p>
                        <p>Attempted: ${right + wrong}</p>
                        <p>Correct: ${right}</p>
                        <p>Wrong: ${wrong}</p>
                        <p>Percentage: ${percentage}%</p>
        `;

    const redirect = document.querySelector('.result-button');
    const backToQuiz = document.createElement('button');
    const goToHome = document.createElement('button');
    backToQuiz.innerHTML = "Start Again";
    goToHome.innerHTML = "Go To Home";

    redirect.appendChild(backToQuiz);
    redirect.appendChild(goToHome);

    backToQuiz.addEventListener('click', () => {
        backToQuiz.style.backgroundColor = "#0ad0f4";
        backToQuiz.style.color = "white";
        window.location.href = "quizpage.html";
    })

    goToHome.addEventListener('click', () => {
        goToHome.style.backgroundColor = "#0ad0f4";
        goToHome.style.color = "white";
        window.location.href = "index.html";
    })

})
// This is all. Thank You! Please let me know if and how this could have been better!