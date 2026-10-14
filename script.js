// 1. Breed Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const breedCards = document.querySelectorAll('.breed-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        breedCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 2. Virtual Purr Audio Generator using Web Audio API
let audioCtx = null;
let purrOscillator = null;
let purrGain = null;
let isPurring = false;

const purrToggleBtn = document.getElementById('purrToggleBtn');
const volumeSlider = document.getElementById('volumeSlider');
const catAvatar = document.querySelector('.cat-avatar');

purrToggleBtn.addEventListener('click', () => {
    if (!isPurring) {
        startPurring();
    } else {
        stopPurring();
    }
});

function startPurring() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create oscillator for low rumble (purr frequency around 25-30Hz)
    purrOscillator = audioCtx.createOscillator();
    purrOscillator.type = 'sawtooth';
    purrOscillator.frequency.setValueAtTime(28, audioCtx.currentTime);

    // Filter to soften the sawtooth into a warm rumble
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(120, audioCtx.currentTime);

    // Gain node for volume control
    purrGain = audioCtx.createGain();
    purrGain.gain.setValueAtTime(volumeSlider.value, audioCtx.currentTime);

    // Connect nodes
    purrOscillator.connect(filter);
    filter.connect(purrGain);
    purrGain.connect(audioCtx.destination);

    purrOscillator.start();
    isPurring = true;
    purrToggleBtn.textContent = 'Stop Purring';
    catAvatar.textContent = '😻';
}

function stopPurring() {
    if (purrOscillator) {
        purrOscillator.stop();
        purrOscillator.disconnect();
    }
    if (audioCtx) {
        audioCtx.close();
    }
    isPurring = false;
    purrToggleBtn.textContent = 'Start Purring';
    catAvatar.textContent = '😴';
}

volumeSlider.addEventListener('input', (e) => {
    if (purrGain && audioCtx) {
        purrGain.gain.setValueAtTime(e.target.value, audioCtx.currentTime);
    }
});

// 3. Random Cat Fact Generator
const catFacts = [
    "A cat's nose print is unique, much like a human fingerprint.",
    "Cats spend roughly 70% of their lives sleeping.",
    "A group of cats is called a 'clowder', while kittens are a 'kindle'.",
    "Cats can rotate their ears 180 degrees using 32 individual muscles.",
    "Domestic cats share 95.6% of their genetic makeup with tigers.",
    "Cats walk like camels and giraffes, moving both right legs first, then both left legs."
];

const factDisplay = document.getElementById('factDisplay');
const newFactBtn = document.getElementById('newFactBtn');

newFactBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * catFacts.length);
    factDisplay.textContent = catFacts[randomIndex];
});

// 4. Cat Name Generator
const namePools = {
    cute: ["Mochi", "Waffles", "Biscuit", "Peanut", "Bubbles", "Nugget"],
    royal: ["Duchess", "Lord Fluffington", "Sir Paws-a-Lot", "Baroness", "Cleopatra", "Kaiser"],
    spooky: ["Shadow", "Voodoo", "Phantom", "Midnight", "Salem", "Eclipse"]
};

const generateNameBtn = document.getElementById('generateNameBtn');
const nameDisplay = document.getElementById('nameDisplay');
const catVibe = document.getElementById('catVibe');

generateNameBtn.addEventListener('click', () => {
    const vibe = catVibe.value;
    const pool = namePools[vibe];
    const randomName = pool[Math.floor(Math.random() * pool.length)];
    nameDisplay.textContent = `Suggested Name: ✨ ${randomName} ✨`;
});

// 5. Accordion Care Guide Logic
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        
        // Toggle current item
        item.classList.toggle('active');
        
        // Optional: Close other accordions
        accordionHeaders.forEach(otherHeader => {
            const otherItem = otherHeader.parentElement;
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
    });
});