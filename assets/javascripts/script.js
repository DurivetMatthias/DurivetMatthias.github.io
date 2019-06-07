Vue.component("life-counter", {
    props: ["initRotation"],
    data: function () {
        return {
            count: 20,
            image: "",
            rotation: this.initRotation,
            isEdit: false,
            cardName: "",
            autoCards: ["island", "swamp", "mountain", "forest", "plains"],
        }
    },
    computed:{
        computedStyle () {
            let rotateStyle;
            let backgroundStyle = "backgroundImage: url(" + this.image + ")";
            if(this.isEdit){
                if(this.rotation%360 > 180){
                    rotateStyle = "transform: rotate(" + 360 + "deg)"
                }else{
                    rotateStyle = "transform: rotate(" + 0 + "deg)"
                }
            }else{
                rotateStyle = "transform: rotate(" + this.rotation + "deg)"
            }
            return rotateStyle + ";" + backgroundStyle;
        }
    },
    template: `
        <div class="life-counter" :style=computedStyle>
            <div class="display">
                <button class="count" v-on:click="count--"><</button>
                <p>{{ count }}</p>
                <button class="count" v-on:click="count++">></button>
            </div>
            <div class="rotation">
                <button class="rotate" v-on:click="rotation+=90">⭮</button>
                <button class="edit" v-on:click="isEdit = !isEdit">✎</button>
                <button class="rotate" v-on:click="rotation-=90">⭯</button>
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
        changeImage: function(cardName) {
            let searchUrl = "https://api.scryfall.com/cards/named?fuzzy="+cardName
            fetch(searchUrl)
                .then(response => {
                    return response.json();
                })
                .then(cardJson => {
                    this.image = cardJson.image_uris.art_crop
                }).catch(error => console.log(error));
        },
        apply: function() {
            this.isEdit = false;
            this.changeImage(this.cardName)
        },
        updateAuto: function(event) {
            let query = event.srcElement.value;
            let searchUrl = "https://api.scryfall.com/cards/autocomplete?q="+query;
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

new Vue({ el: "#vue-app" })