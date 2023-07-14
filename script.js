document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const submitBtn = document.getElementById('submitBtn');
    const categorySelect = document.getElementById('category');
    const difficultySelect = document.getElementById('difficulty');
    const typeSelect = document.getElementById('type');
    const questionContainer = document.getElementById('questionContainer');
    const scoreContainer = document.getElementById('scoreContainer');
    const scoreElement = document.getElementById('score');
  
    generateBtn.addEventListener('click', function() {
  const categorySelect = document.getElementById('category');
  const difficultySelect = document.getElementById('difficulty');
  const typeSelect = document.getElementById('type');

  const category = categorySelect.value === 'any' ? '' : `&category=${categorySelect.value}`;
  const difficulty = difficultySelect.value === 'any' ? '' : `&difficulty=${difficultySelect.value}`;
  const type = typeSelect.value === 'any' ? '' : `&type=${typeSelect.value}`;

  fetch(`https://opentdb.com/api.php?amount=10${category}${difficulty}${type}`)
    .then(response => response.json())
    .then(data => {

      questionContainer.innerHTML = '';
      scoreElement.innerText = '0';

      data.results.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
          <h5>Pregunta ${index + 1}:</h5>
          <p>${question.question}</p>
        `;
        questionContainer.appendChild(questionElement);

        const answerElement = document.createElement('div');
        answerElement.classList.add('answers');

        if (question.type === 'boolean') {
          const option1 = document.createElement('p');
          option1.innerHTML = `
            <label>
              <input type="radio" name="question${index}" value="True">
              <span>Verdadero</span>
            </label>
          `;
          answerElement.appendChild(option1);

          const option2 = document.createElement('p');
          option2.innerHTML = `
            <label>
              <input type="radio" name="question${index}" value="False">
              <span>Falso</span>
            </label>
          `;
          answerElement.appendChild(option2);
        } else {
          question.incorrect_answers.forEach(answer => {
            const option = document.createElement('p');
            option.innerHTML = `
              <label>
                <input type="checkbox" name="question${index}" value="${answer}">
                <span>${answer}</span>
              </label>
            `;
            answerElement.appendChild(option);
          });

          const correctOption = document.createElement('p');
          correctOption.innerHTML = `
            <label>
              <input type="checkbox" name="question${index}" value="${question.correct_answer}">
              <span>${question.correct_answer}</span>
            </label>
          `;
          answerElement.appendChild(correctOption);
        }

        questionContainer.appendChild(answerElement);
      });

      document.getElementById('triviaContainer').style.display = 'block';
      generateBtn.style.display = 'none';
    })
    .catch(error => console.log(error));
});

      
  });
  