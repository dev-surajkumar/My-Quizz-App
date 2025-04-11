// Since I am creating everything dynamically using javaScript, I wanted to make sure that html loads first and then javaScript executes hence I used DOMContentLoaded. It makes sure that the html element is there and javascript is executed only after that.


document.addEventListener('DOMContentLoaded', () => {

    // Creating the Layout that will be used to display content!

    const greet = document.querySelector('.greet');
    const greetH = document.createElement('h1');
    greetH.innerHTML = "Hello User!";
    greet.appendChild(greetH);

    const userInputDiv = document.querySelector('.user-input');
    const userInput = document.createElement('input');
    const userButton = document.createElement('button');
    userInput.placeholder = "ENTER YOUR NAME..";
    userButton.textContent = "ENTER";
    userInputDiv.appendChild(userInput);
    userInputDiv.appendChild(userButton);

    userButton.addEventListener('click',() => {
        let userName = userInput.value;
        // saving the username to localstorage to access it for the result.
        localStorage.setItem("userName", userName);
    })

    const infoForUser = document.querySelector('.info-for-user');
    const advice = document.createElement('p');
    advice.textContent= "You'll have 10 seconds to answer each question!";
    const lineHr = document.createElement('hr');
    infoForUser.appendChild(advice);
    infoForUser.appendChild(lineHr);

    const categoryContainer = document.querySelector('.category-container');
    const categoryUser = document.createElement('h1');
    categoryUser.textContent = "Select Category";
    categoryContainer.appendChild(categoryUser);
    const category = document.createElement('div');
    category.classList.add("category"); 
    categoryContainer.appendChild(category);

    
    // Here myQuiz  will help in displaying the topics.. I have mapped it and in the index.html I have also linked the questions.js
    Object.keys(myQuiz).forEach((topic) => {
        const topicButton = document.createElement('button');
        topicButton.setAttribute("data-topic", topic);
        topicButton.textContent = topic;
        category.appendChild(topicButton);


        topicButton.addEventListener('click', () => {
            const user = userInput.value.trim();
            if(!user){
                alert("Please enter your name before selecting a topic.");
                return;
            }
            // setting it to local storage to access it later
            localStorage.setItem("selectedTopic", topic);
            localStorage.setItem("userName", user);

            console.log("Stored selectedTopic:", topic);
            console.log("Stored userInput:", user);
            // window location will redirect to the next page when the button is clicked!
            window.location.href = "quizpage.html";

        })

    })
})