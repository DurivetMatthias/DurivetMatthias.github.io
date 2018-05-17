document.addEventListener("DOMContentLoaded", function () {

});

const statistics = "stats";
const katakanaStorage = localforage.createInstance({
    name: "katakanaStorage"
});

/* {a:{correct: 50, wrong: 10},e:{correct: 50, incorrect: 10}, ...} */

function updateStatistics() {
    katakanaStorage.getItem(statistics).then(function (data) {
        if (data != null) {
            for (let i = 0; i < questionedKatakana.length; i++) {
                let katakana = questionedKatakana[i];
                let romanji = VOCAB_OBJECT.ROMANJI[usedIndices[i + emptyIndices.length]];
                if (katakana !== '') {
                    if (questionResults[i]) {
                        data[romanji].correct++;
                    } else {
                        data[romanji].incorrect++;
                    }
                }
            }
        } else data = createFirstStatistics();
        katakanaStorage.setItem(statistics, data);
    }).then(function () {
        buildStatsSection();
    }).catch(function (e) {
        console.log("failed to update the statistics");
        console.log(e);
    });
}

function createFirstStatistics() {
    let data = {};
    for (let i = 0; i < questionedKatakana.length; i++) {

        let katakana = questionedKatakana[i];
        let romanji = VOCAB_OBJECT.ROMANJI[usedIndices[i + emptyIndices.length]];

        data[romanji] = {};
        if (katakana !== '') {
            if (questionResults[i]) {
                data[romanji].correct = 1;
                data[romanji].incorrect = 0;
            } else {
                data[romanji].correct = 0;
                data[romanji].incorrect = 1;
            }
        }
    }
    return data;
}

function buildStatsSection() {
    katakanaStorage.getItem(statistics).then(function (data) {
        stats.innerHTML = "";
        if (data != null) {
            for (let i = 0; i < katakanaArray.length; i++) {
                let romanji = romanjiArray[i];
                let katakana = katakanaArray[i];
                let div = document.createElement('div');
                div.classList.add('kana');
                if (romanji !== '') {
                    let kObject = data[romanjiArray[i]];
                    let total = kObject.incorrect + kObject.correct;
                    let percentage = Math.floor(kObject.correct * 100 / total);
                    div.innerHTML = `${romanji}<br/>${katakana}<br/>${percentage}%`;
                }
                stats.appendChild(div);
            }
        } else {
            stats.appendChild("<h2>no statistics found</h2>");
        }
    }).catch(function (e) {
        console.log("failed get the statistics");
        console.log(e);
    });
}