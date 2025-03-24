// Global variable to store all character data
let allCharacters = [];
let currentCharacter = null;

// Wait for the DOM to load before executing code
document.addEventListener('DOMContentLoaded', () => {
  // Get elements from the DOM
  const characterBar = document.getElementById('character-bar');
  const detailedInfo = document.getElementById('detailed-info');
  const nameEl = document.getElementById('name');
  const imageEl = document.getElementById('image');
  const voteCountEl = document.getElementById('vote-count');
  const votesForm = document.getElementById('votes-form');
  const resetBtn = document.getElementById('reset-btn');

  // Initialize the application
  init();

  // Add event listener for the votes form
  votesForm.addEventListener('submit', handleVoteSubmit);

  // Add event listener for the reset button
  resetBtn.addEventListener('click', handleResetVotes);
});

// Initialize the application
async function init() {
  try {
    const characters = await fetchCharacters();
    allCharacters = characters;
    displayCharacters(characters);
  } catch (error) {
    console.error('Error initializing application:', error);
  }
}

// Fetch characters from the API
async function fetchCharacters() {
  const response = await fetch('http://localhost:3000/characters');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

// Display characters in the character bar
function displayCharacters(characters) {
  const characterBar = document.getElementById('character-bar');
  characterBar.innerHTML = '';

  characters.forEach(character => {
    const span = document.createElement('span');
    span.textContent = character.name;
    span.dataset.id = character.id;

    span.addEventListener('click', () => displayCharacterDetails(character));

    characterBar.appendChild(span);
  });
}

// Display character details
function displayCharacterDetails(character) {
  currentCharacter = character;

  const nameEl = document.getElementById('name');
  const imageEl = document.getElementById('image');
  const voteCountEl = document.getElementById('vote-count');

  nameEl.textContent = character.name;
  imageEl.src = character.image || 'default-image-url.jpg';
  imageEl.alt = character.name;
  voteCountEl.textContent = character.votes;
}

// Handle vote form submission
function handleVoteSubmit(event) {
  event.preventDefault();
  const votesInput = document.getElementById('votes');
  const votes = parseInt(votesInput.value);

  if (currentCharacter && !isNaN(votes)) {
    currentCharacter.votes += votes;
    updateVoteDisplay();
    votesForm.reset();
  }
}

// Handle reset votes button click
function handleResetVotes() {
  if (currentCharacter) {
    currentCharacter.votes = 0;
    updateVoteDisplay();
  }
}

// Update the vote display
function updateVoteDisplay() {
  const voteCountEl = document.getElementById('vote-count');
  voteCountEl.textContent = currentCharacter.votes;
}
