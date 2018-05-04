const vowel = ['a', 'i', 'u', 'e', 'o'];
const consonant = ['', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'];
let romanjiArray = [];
const katakanaArray = ['&#12450', '&#12452', '&#12454', '&#12456', '&#12458', '&#12459', '&#12461', '&#12463', '&#12465', '&#12467'
    , '&#12469', '&#12471', '&#12473', '&#12475', '&#12477', '&#12479', '&#12481', '&#12483', '&#12486', '&#12488'
    , '&#12490', '&#12491', '&#12492', '&#12493', '&#12494', '&#12495', '&#12498', '&#12501', '&#12504', '&#12507'
    , '&#12510', '&#12511', '&#12512', '&#12513', '&#12514', '&#12516', '', '&#12518', '', '&#12520'
    , '&#12521', '&#12522', '&#12523', '&#12524', '&#12525', '&#12527', '', '', '', '&#12530', '&#12531'];

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
        romanjiArray[i * 5 + j] = consonant[i] + vowel[j];
    }
}
let emptyIndices = [36, 38, 46, 47, 48];
romanjiArray[11] = 'shi';
romanjiArray[16] = 'chi';
romanjiArray[17] = 'tsu';
romanjiArray[27] = 'fu';
romanjiArray[50] = 'n';
emptyIndices.forEach(i => romanjiArray[i] = '');

let VOCAB_OBJECT = {
    ROMANJI: romanjiArray,
    KATAKANA: katakanaArray,
    EMPTY_INDICES: emptyIndices
};

let usedIndices;
let questionedKatakana;
let questionResults;
let currentAnswer;

const katakanaQuestion = document.getElementById('questions').getElementsByTagName('div')[0];
const answerField = document.getElementById('answerField');

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('flashcard').addEventListener('click', function () {
        Array.from(flashcard.getElementsByTagName('li')).forEach(li => li.remove());
        initFlashcards();
        nextFlashcard();
    });

    document.getElementById('answerButton').addEventListener('click', function () {
        nextFlashcard();
    });

    answerField.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            nextFlashcard();
        }
    });
});

const questions = document.getElementById('questions');
const correct = document.getElementById('correct');
const incorrect = document.getElementById('incorrect');
const progress = document.getElementById('progress');

function initFlashcards() {
    usedIndices = VOCAB_OBJECT.EMPTY_INDICES.slice();
    questionedKatakana = [];
    questionResults = [];
    currentAnswer = '';
    questions.style.display = 'block';
    summary.style.display = 'none';
    correct.innerHTML = '';
    incorrect.innerHTML = '';
    updateProgress();
}

function updateProgress() {
    progress.innerHTML = questionedKatakana.length + '/' + (VOCAB_OBJECT.KATAKANA.length - emptyIndices.length);
}

function nextFlashcard() {
    checkFlashcard();
    if (usedIndices.length < VOCAB_OBJECT.KATAKANA.length) {
        showFlashcard();
    } else {
        showFlashcardSummary();
        updateStatistics();
        buildStatsSection();
    }
}

function showFlashcard() {
    let random = Math.floor(Math.random() * VOCAB_OBJECT.KATAKANA.length);
    while (usedIndices.includes(random)) {
        random = Math.floor(Math.random() * VOCAB_OBJECT.KATAKANA.length);
    }
    usedIndices.push(random);
    currentAnswer = VOCAB_OBJECT.ROMANJI[random];
    questionedKatakana.push(VOCAB_OBJECT.KATAKANA[random]);
    katakanaQuestion.innerHTML = VOCAB_OBJECT.KATAKANA[random];
    answerField.value = '';
    updateProgress();
}

const summary = document.getElementById('summary');
function showFlashcardSummary() {
    questions.style.display = 'none';
    summary.style.display = 'block';
    for (let i = 0; i < questionedKatakana.length; i++) {
        let div;
        let katakana = questionedKatakana[i];
        let romanji = VOCAB_OBJECT.ROMANJI[usedIndices[i + emptyIndices.length]];
        if (katakana !== '') {
            setTimeout(function () {
                div = document.createElement('div');
                div.classList.add('kana');
                div.innerHTML = katakana + '<br>' + romanji;
                if (questionResults[i]) {
                    let amount = parseInt(correct.previousElementSibling.firstElementChild.innerHTML);
                    correct.previousElementSibling.firstElementChild.innerHTML = (amount + 1).toString();
                    correct.appendChild(div);
                } else {
                    let amount = parseInt(incorrect.previousElementSibling.firstElementChild.innerHTML);
                    incorrect.previousElementSibling.firstElementChild.innerHTML = (amount + 1).toString();
                    incorrect.appendChild(div);
                }
            }, 200 * i);
        }
    }
}

function checkFlashcard() {
    const answer = answerField.value;
    if (currentAnswer !== '') {
        questionResults.push(answer.toLowerCase() === currentAnswer);
    }
}