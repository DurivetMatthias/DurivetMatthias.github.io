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
if (typeof window !== 'object') module.exports = VOCAB_OBJECT;