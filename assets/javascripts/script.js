const home = document.getElementById('homeScreen');
const katakana = document.getElementById('katakanaScreen');
const flashcard = document.getElementById('flashcardScreen');
const stats = document.getElementById('statisticsScreen');
const settings = document.getElementById('settingsScreen');
const screens = [home, katakana, flashcard, stats, settings];
const buttonToScreen = {'katakana': katakana, 'stats': stats, 'flashcard': flashcard};

document.addEventListener("DOMContentLoaded", function () {

    VOCAB_OBJECT.ROMANJI.forEach(function (letter, i) {
        let div = document.createElement('div');
        div.classList.add('kana');
        if (letter !== '') div.innerHTML = letter + '<br>' + VOCAB_OBJECT.KATAKANA[i];
        katakana.append(div);
    });

    const allLi = document.getElementsByTagName('li');
    Array.from(allLi).forEach(li => li.addEventListener('click', function () {
        li.classList.add('buttonPush');
        setTimeout(function () {
            li.classList.remove('buttonPush');
        }, 500);
    }));

    const homeLi = home.getElementsByTagName('li');
    Array.from(homeLi).forEach(li => li.addEventListener('click', function () {
        const screen = buttonToScreen[li.id];
        setTimeout(function () {
            open(screen);
        }, 500);
    }));

    const settingsLi = settings.getElementsByTagName('li');
    Array.from(settingsLi).forEach(li => li.addEventListener('click', function () {
        changeStyle(li.innerHTML);
    }));

    const colorPicker = document.getElementById('colorPicker');
    colorPicker.value = '#66CC66';
    colorPicker.addEventListener('change', function () {
        changeColor(colorPicker.value);
    });

    const homeIcon = document.getElementById('homeIcon');
    homeIcon.addEventListener('click', function () {
        open(home);
    });

    let previousScreen = home;
    const settingsIcon = document.getElementById('settingsIcon');
    settingsIcon.addEventListener('click', function () {
        if (getActiveScreen() !== settings) {
            previousScreen = getActiveScreen();
            open(settings);
        } else {
            open(previousScreen);
        }
    });

    function changeStyle(name) {
        document.documentElement.style.setProperty('--baseColor', `var(--${name}Color)`);
        document.documentElement.style.setProperty('--baseUrl', `var(--${name}Url)`);
        colorPicker.value = getComputedStyle(document.documentElement).getPropertyValue('--baseColor').replace(' ', '');
        /* getProperty returns an extra space at the start */
    }
});

function changeColor(colorcode) {
    document.documentElement.style.setProperty('--baseColor', colorcode);
}

function closeAllScreens() {
    screens.forEach(screen => screen.classList.remove('active'));
}

function open(screen) {
    closeAllScreens();
    screen.classList.add('active');
}

function getActiveScreen() {
    return document.getElementsByClassName('active')[0];
}