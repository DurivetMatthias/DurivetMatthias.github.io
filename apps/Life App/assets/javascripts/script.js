Vue.component("life-counter", {
    props: ["initRotation", "initCount"],
    data: function () {
        return {
            count: this.initCount,
            image: "",
            isEdit: false,
            cardName: "",
            autoCards: ["island", "swamp", "mountain", "forest", "plains"],
        }
    },
    computed: {
        rotation() {
            return this.initRotation;
        },
        computedStyle() {
            let rotateStyle;
            if (this.isEdit) {
                if (this.rotation > 0) {
                    if (this.rotation % 360 > 180) {
                        let closestUpright = this.rotation + 360 - this.rotation % 360
                        rotateStyle = "rotate(" + closestUpright + "deg)"
                    } else {
                        let closestUpright = this.rotation - this.rotation % 360
                        rotateStyle = "rotate(" + closestUpright + "deg)"
                    }
                } else {
                    if (Math.abs(this.rotation % 360) > 180) {
                        let closestUpright = this.rotation - 360 - this.rotation % 360
                        rotateStyle = "rotate(" + closestUpright + "deg)"
                    } else {
                        let closestUpright = this.rotation - this.rotation % 360
                        rotateStyle = "rotate(" + closestUpright + "deg)"
                    }
                }
            } else {
                rotateStyle = "rotate(" + this.rotation + "deg)"
            }
            let backgroundStyle = "backgroundImage: url(" + this.image + ")";
            let transformStyle = "transform: " + rotateStyle;
            return backgroundStyle + ";" + transformStyle;
        }
    },
    template: `
        <div class="life-counter" :style=computedStyle>
            <div class="display">
                <button class="count" v-on:click="count--">-</button>
                <p v-bind:class="{ contrasted: image!='' }" v-on:click="toggleEdit">{{ count }}</p>
                <button class="count" v-on:click="count++">+</button>
            </div>
            <div class="edit-menu" v-show="isEdit">
                <input v-model="cardName" v-on:keyup.enter="apply" v-on:keyup="updateAuto" v-bind:list="_uid + 'cards'">
                <datalist v-bind:id="_uid + 'cards'">
                    <option v-for="card in autoCards" v-bind:value="card"></option>
                </datalist>
                <button v-on:click="apply">Apply</button>
            </div>
        </div>
    `,
    methods: {
        toggleEdit: function () {
            this.isEdit = !this.isEdit;
        },
        changeImage: function (cardName) {
            let searchUrl = "https://api.scryfall.com/cards/named?fuzzy=" + cardName
            fetch(searchUrl)
                .then(response => {
                    return response.json();
                })
                .then(cardJson => {
                    this.image = cardJson.image_uris.art_crop
                }).catch(error => console.log(error));
        },
        apply: function () {
            this.isEdit = false;
            this.changeImage(this.cardName)
        },
        updateAuto: function (event) {
            let query = event.srcElement.value;
            let searchUrl = "https://api.scryfall.com/cards/autocomplete?q=" + query;
            fetch(searchUrl)
                .then(response => {
                    return response.json();
                })
                .then(cardJson => {
                    this.autoCards = cardJson.data;
                }).catch(error => console.log(error));
        }
    }
})

class CounterObject {
    constructor(initRotation, initCount) {
        this.initRotation = initRotation;
        this.initCount = initCount;

        this.flip = function () {
            if (this.initRotation == 0) this.initRotation = 180;
            else if (this.initRotation == 180) this.initRotation = 0;
        }
    }
}

const modes = {
    COMMANDER: "commander",
    CONSTRUCTED: "constructed",
    OATHBRAKER: "oathbraker",
    TWOPLAYERCOMMANDER: "1v1 commander"
}

let main = new Vue({
    el: "#vue-app",
    data: {
        counters: [],
        mode: "",
    },
    methods: {
        addCounter: function (orientation, startAmount) {
            this.counters.push(new CounterObject(orientation, startAmount));
        },
        resetCounters: function () {
            this.counters = [];
            let outerThis = this;
            setTimeout(function () {
                if (outerThis.mode == modes.COMMANDER) {
                    outerThis.addCounter(180, 40);
                    outerThis.addCounter(180, 40);
                    outerThis.addCounter(0, 40);
                    outerThis.addCounter(0, 40);
                } else if (outerThis.mode == modes.CONSTRUCTED) {
                    outerThis.addCounter(180, 20);
                    outerThis.addCounter(0, 20);
                } else if (outerThis.mode == modes.OATHBRAKER) {
                    outerThis.addCounter(180, 20);
                    outerThis.addCounter(180, 20);
                    outerThis.addCounter(0, 20);
                    outerThis.addCounter(0, 20);
                } else if (outerThis.mode == modes.TWOPLAYERCOMMANDER) {
                    outerThis.addCounter(180, 40);
                    outerThis.addCounter(0, 40);
                }
            }, 1);
        },
        setCounters: function () {
            if (screen.orientation.angle == 0) {
                this.mode = modes.CONSTRUCTED;
            } else if (screen.orientation.angle == 90) {
                this.mode = modes.COMMANDER;
            } else if (screen.orientation.angle == 270) {
                this.mode = modes.OATHBRAKER;
            } else {
                this.mode = modes.TWOPLAYERCOMMANDER;
            }
            this.resetCounters();
        }
    },
    mounted: function () {
        this.setCounters();
        screen.orientation.addEventListener('change', this.setCounters);
    }
})
