//Variables

let h2 = document.createElement('h2'); 
h2.id = 'headingTwo';
container.append(h2);


let div = document.createElement('div');
div.id = 'quesContainer'; 
container.append(div);

let quesContainer;
let quesContainer_status;
let score = 0;
let pos = 0;
let question; 
let options; 
let option1; 
let option2; 
let option3; 
let prevBtn;
let nextBtn;




const questions = [
  {
    question: "Which Programming Language is used to make a webpage dynamic?",
    a: "JavaScript",
    b: "CSS",
    c: "HTML",
    answer: "A"
  },
  {
    question: "What name was JavaScript orginally called?",
    a: "TypeScript",
    b: "LiveScript",
    c: "Java",
    answer: "B"
  },
  {
    question: "What type of data is a collection of indexed data",
    a: "Object",
    b: "String",
    c: "Arrays",
    answer: "C"
  },
  {
    question: "What method is used to convert a string to an array?",
    a: "splice",
    b: "split",
    c: "join",
    answer: "B"
  }
];


// Get container to output the question.
function getElement(x){
  return document.getElementById(x);
}


//questions
let showQuestion = () => {
  quesContainer = getElement('quesContainer');
  
  if(pos >= questions.length) {
    let scoreBoard = {
      Brillant: 100,
      Good: 75,
      Average: 50,
      Poor: 25,
      Failed: 0
    };
      

    let teachersRemark;
    for (const remark in scoreBoard) {
      if(score === scoreBoard[remark]) {
        teachersRemark =  remark;  
      }
      
    }
    
    quesContainer.innerHTML = '<h3> Test result is ' + score + '%.'  +
    '<p>' + teachersRemark +' performance!</p>' + '</h3>';
    if(score === 0) {
      let pattern = /(performance|%)/g;
      quesContainer.innerHTML = quesContainer.innerHTML.replace(pattern, '');
    }
    
    getElement('headingTwo').innerHTML = 'Test completed';
    
    // reset the variable to enable to quiz restart.
    pos = 0;
    
    //create reset button to reload page.
    let resetBtn = document.createElement('button');
    resetBtn.textContent = 'Retake test';
    quesContainer.append(resetBtn);
    resetBtn.addEventListener('click', reloadQuiz);   
    
    // stops rest of showQuestion function running when quesContainer is completed
    return false;
  }
  
  getElement('headingTwo').innerHTML = 'question ' + (pos+1)+ ' of ' + questions.length;
  question = questions[pos].question;
  option1 = questions[pos].a;
  option2 = questions[pos].b;
  option3 = questions[pos].c;  
  displayQuestion();
  checkSelectedOption()

} 


//Display questions 
let displayQuestion = () => {
  quesContainer.innerHTML = '<h3>' + question + '</h3>';
  
  //Check for previous answer
  const prevAns = getPrevAns(pos + 1)

  // display the answer options
  // the += appends to the data we started on the line above
  quesContainer.innerHTML += `<label> <input type='radio' name='options' value='A' ${prevAns === 'A' && "checked"}> ${option1} </label><br>`;
  quesContainer.innerHTML += `<label> <input type='radio' name='options' value='B' ${prevAns === 'B' && "checked"}> ${option2} </label><br>`;
  quesContainer.innerHTML += `<label> <input type='radio' name='options' value='C' ${prevAns === 'C' && "checked"}> ${option3} </label><br><br>`;
  
  //invoke the create button function
  createButton();
  
  nextBtn.addEventListener('click', checkAnswer);

  if(pos >= 1) {
    prevBtn = document.createElement('button');
    prevBtn.className = 'btn'
    prevBtn.className.add = 'prevBtn' 
    quesContainer.insertBefore(prevBtn, nextBtn);
    prevBtn.textContent = 'Prev';
    prevBtn.style.marginRight = '10px';
    prevBtn.addEventListener('click', () => {
      pos = pos - 1;      
      score = score - 25;
      showQuestion();
      
    })
  }

  if(pos === 3) {
    prevBtn.style.visibility = 'none';
    nextBtn.textContent = 'Submit';
  }  
}


//create button  
let createButton = () => {
  //Create a next button
  nextBtn = document.createElement('button');   
  quesContainer.append(nextBtn);
  nextBtn.textContent = "Next"; 
  nextBtn.className ='btn' 
  nextBtn.disabled = true;
  
  let options = document.getElementsByName('options');
  
  for(var i = 0; i < options.length; i++) {
    if(options[i].addEventListener('change', () => { 
      nextBtn.disabled = false; 
    }));

  }
  
}


//check answer
let checkAnswer = () => {
  // use getElementsByName because we have an array which it will loop through
  options = document.getElementsByName("options");
  
  for(var i = 0; i < options.length; i++){
    if(options[i].checked){
      const answer = options[i].value;
      sessionStorage.setItem(`question ${pos + 1}`, answer);
      const lastAnswer = sessionStorage.getItem(`question ${pos + 1}`)
    }
    
  }
  // checks if answer matches the correct choice
  if(options == questions[pos].answer){
    //each time there is a correct answer this value increases
    score+= 25;
    
  }
  // changes position of which character user is on
  pos++;
  // then the showQuestion function runs again to go to next question
  showQuestion();  
  
}

//check selected radio button
const checkSelectedOption = () => {
  const options = Array.from(document.getElementsByName('options'));
  const isChecked = options.some(input => {
    return input.checked
  })
  if(isChecked) {
    nextBtn.disabled = false;
  }
}

//Check for answer on previous question
const getPrevAns = (questionNumber) => {
  return sessionStorage.getItem(`question ${questionNumber}`)
}


// Reload Quiz
let reloadQuiz = () => {
  sessionStorage.clear()
  location.reload();

}


// Add event listener to call showQuestion on page load event
window.addEventListener("load", showQuestion);
// submitBtn.addEventListener('click', checkAnswer);