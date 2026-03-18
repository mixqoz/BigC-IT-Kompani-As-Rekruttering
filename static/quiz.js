const questions = [
	{
		question: "Hva er hovedmålet med IT-support i et kundemiljø?",
		answers: [
			{ text: "Å utvikle ny produkter", correct: false},
			{text: "Å løse tekniske problemer og hjelpe brukere", correct: true},
			{text: "Å selge IT-utstyr", correct: false},
			{text: "Å overvåke nettverket", correct: false},
		]
	},
	{
		question: "Hva betyr begrepet 'feilsøking'?",
		answers: [
			{ text: "Å lage nye funksjoner", correct: false},
			{text: "Å identifisere og løse problemer", correct: true},
			{text: "Å slette gamle filer", correct: false},
			{text: "Å oppdatere programvare", correct: false},
		]
	},
	{
		question: "Hva er viktigst når du kommuniserer med en kunde som opplever et problem?",
		answers: [
			{ text: "Be kunden finne løsningen selv", correct: false},
			{text: "Holde samtalen kort og skarp", correct: false},
			{text: "Vise tålmodighet og forklare tydelig", correct: true},
			{text: "Bruke avansert teknisk språk", correct: false},
		]
	},
	{
		question: "Hva er en 'ticket' i IT-support?",
		answers: [
			{ text: "En registrert sak om et problem", correct: true},
			{text: "En type datavirus", correct: false},
			{text: "En programvareoppdatering", correct: false},
			{text: "En teknisk feil", correct: false},
		]
	},
	{
		question: "Hva er en vanlig årsak til at en PC blir treg?",
		answers: [
			{text: "For mye ledig minne", correct: false},
			{text: "For mange programmer åpent samtidig", correct: true},
			{text: "For rask internettlinje", correct: false},
			{text: "For ny maskin", correct: false},
		]
	},
	{
		question: "Hva står 'VPN' for?",
		answers: [
			{text: "Virtual Private Network", correct: true},
			{text: "Visual Personal Number", correct: false},
			{text: "Variable Protocol Network", correct: false},
			{text: "Virtual Processing Number", correct: false},
		]
	},
	{
		question: "Hvorfor er datasikkerhet viktig for et IT-selskap?",
		answers: [
			{text: "For å gjøre PC-er raskere", correct: false},
			{text: "For å redusere strømbruk og kostnader", correct: false},
			{text: "For å unngå programvareoppdateringer", correct: false},
			{text: "For å beskytte sensitive data", correct: true},
		]
	},
	{
		question: "Hva er god praksis når du ikke vet svartet på et kundespørsmål?",
		answers: [
			{text: "Gjette og håpe at det stemmer", correct: false},
			{text: "Si at du ikke kan hjelpe og avslutt samtalen", correct: false},
			{text: "Si at du skal undersøke og komme tilbake til dem", correct: true},
			{text: "Ignorere spørsmålet", correct: false},
		]
	},
	{
		question: "Hva er en 'server'?",
		answers: [
			{text: "En datamaskin som tilbyr tjenester til andre enheter", correct: true},
			{text: "En ekstern harddisk brukt til tung last", correct: false},
			{text: "En nettverksprotokoll", correct: false},
			{text: "En database med all informasjon", correct: false},
		]
	},
	{
		question: "Hva kjennetegner en god IT-konsulent?",
		answers: [
			{text: "Jobber godt alene", correct: false},
			{text: "Sterke problemløsningsevner og kunebehandling", correct: true},
			{text: "Relevant utdanning innenfor IT", correct: false},
			{text: "Ignorerer kundens behov og preferanser", correct: false},
		]
	}
]

// Script for modal from: https://www.youtube.com/watch?v=XH5OW46yO8I
// Quiz functions from: https://www.youtube.com/watch?v=PBcqGxrr9g8

// Retrive html IDs for use
// For opening and closing the quiz panell
const startBtn = document.getElementById("startBtn");
const modal_Container = document.getElementById("modal_Container");
const closeBtn = document.getElementById("closeBtn");
// Other html IDs
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerBtns");
const nextButton = document.getElementById("nextBtn");

// Reveals the modal
startBtn.addEventListener("click", () => {
	modal_Container.classList.add("show");
});

// Hides the modal
closeBtn.addEventListener("click", () => {
    // Resets everything
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    resetState();
	showQuestion();
    modal_Container.classList.remove("show");
});

// Keeps tract of the current question and score
let currentQuestionIndex = 0;
let score = 0;

// Starts the quiz and resets everything from previous sessions
function startQuiz(){
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

// Shows questions
function showQuestion(){
    resetState(); // Clears previous answers and hides the Next button

    let currentQuestion = questions[currentQuestionIndex]; // Gets the current question object
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Updates the question text

	// Creats a button tag for each answer and stores its status using dataset.correct in a loop
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
		if(answer.correct){
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);

    });
}

// Resets the quiz to the start
function resetState(){
	nextButton.style.display = "none";
	while(answerButtons.firstChild){
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(e){
	const selectedBtn = e.target; // The clicked button
	const isCorrect = selectedBtn.dataset.correct === "true"; // Checks if it's correct

	// Adds CSS classes "correct" and "incorrect" for visual feedback:
	if(isCorrect){
		selectedBtn.classList.add("correct");
		score++;
	}else{
		selectedBtn.classList.add("incorrect");
	}

	// Disables all the buttons to prevent multiple clicks
	Array.from(answerButtons.children).forEach(button => {
		if(button.dataset.correct === "true"){
			button.classList.add("correct");
		}
		button.disabled = true;
	});

	nextButton.style.display = "block"; // Shows the Next button
}

// Shows result score at the end
function showScore(){
	resetState(); // Clears and hides all buttons
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
	nextButton.innerHTML = "Play again"; // Changed Next button to Play Again
	nextButton.style.display = "block";
}

// If there are remaining questions, shows them. Otherwise shows the score
function handleNextButton(){
	currentQuestionIndex++; // Inceases the questionIndex
	
	// If more questions remain, shows the next
	if (currentQuestionIndex < questions.length){
		showQuestion();
	}else{ // Shows the final score if there aren't any questions left
		showScore();
	}
}

// When the Next button is clicked, shows all questions
nextButton.addEventListener("click", ()=>{
	if(currentQuestionIndex < questions.length){
		handleNextButton();
	}else{ 
		startQuiz(); // Restarts quiz from the beginning
	}
});

startQuiz(); // Starts the quiz when modal is loaded