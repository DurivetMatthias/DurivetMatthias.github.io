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

            // let sizeStyle;
            // if(this.rotation % 180 == 0){
            //     sizeStyle = `
            //     --counter-width: 40vw;
            //     --counter-height: 45vh;`
            // }else{
            //     sizeStyle = `
            //     --counter-width: 40vh;
            //     --counter-height: 45vw;`
            // }

            let transformStyle = "transform: " + rotateStyle;
            return backgroundStyle + ";" + transformStyle;
        }
    },
    template: `
        <div class="life-counter" :style=computedStyle v-on:click="setActive">
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
        },
        invertTheme: function () {
            let inverted = 255 - this.$el.style.getPropertyValue("--base-color");
            this.$el.style.setProperty('--base-color', inverted);
        },
        setActive: function () {
            this.$root.activeCounter = this;
        }
    },
    created: function () {

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

let main = new Vue({
    el: "#vue-app",
    data: {
        counters: [],
        menuVisible: false,
        defaultDelay: 500,
        defaultMenuRatio: "0.05",
        orientation: screen.orientation.angle
    },
    methods: {
        addCounter: function (startAmount) {
            this.hideMenu();
            this.counters.push(new CounterObject(0, startAmount));
            if (this.counters.length == 3) {
                this.counters[0].flip();
                this.counters[1].flip();
            }
        },
        removeCounter: function () {
            this.hideMenu();
            this.counters.pop();
            if (this.counters.length == 2) {
                this.counters[0].flip();
                this.counters[1].flip();
            }
        },
        removeAllCounters: function () {
            let outsideThis = this;
            let removeAmount = outsideThis.counters.length;
            for (let i = 0; i < removeAmount; i++) {
                setTimeout(function () {
                    outsideThis.removeCounter();
                }, i * outsideThis.defaultDelay);
            }
            return removeAmount * outsideThis.defaultDelay;
        },
        toggleMenu: function () {
            this.menuVisible = !this.menuVisible;
        },
        hideMenu: function () {
            this.menuVisible = false;
        },
        resetCounters: function (playerAmount, startAmount) {
            let outsideThis = this;
            let delay = outsideThis.removeAllCounters();
            for (let i = 0; i < playerAmount; i++) {
                setTimeout(function () {
                    outsideThis.addCounter(startAmount);
                }, delay + i * outsideThis.defaultDelay);
            }
        }
    },
    beforeMount: function () {

    },
    mounted: function () {
        if (this.orientation % 180 == 0) {
            this.resetCounters(2, 20);
        } else {
            this.resetCounters(4, 40);
        }
    }
})
