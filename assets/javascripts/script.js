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
            if(this.isEdit){
                if(this.rotation>0){
                    if(this.rotation%360 > 180){
                        let closestUpright = this.rotation + 360 - this.rotation%360
                        rotateStyle = "rotate(" + closestUpright + "deg)"
                    }else{
                        let closestUpright = this.rotation - this.rotation%360
                        rotateStyle = "rotate(" + closestUpright + "deg)"
                    }
                }else{
                    if(Math.abs(this.rotation%360) > 180){
                        let closestUpright = this.rotation - 360 - this.rotation%360
                        rotateStyle = "rotate(" + closestUpright + "deg)"
                    }else{
                        let closestUpright = this.rotation - this.rotation%360
                        rotateStyle = "rotate(" + closestUpright + "deg)"
                    }
                }
                
            }else{
                rotateStyle = "rotate(" + this.rotation + "deg)"
            }
            let scaleStyle;
            let widthStyle;
            if(this == this.$root.activeCounter){
                scaleStyle = "scale(0.95)";
            } else{
                let scale = 0.95 / (this.$root.counters.length - 1);
                scaleStyle = "scale(" + scale + ")";
            }

            let backgroundStyle = "backgroundImage: url(" + this.image + ")";
            let transformStyle = "transform: " + rotateStyle + " " + scaleStyle;
            return backgroundStyle + ";" + transformStyle;
        }
    },
    template: `
        <div class="life-counter" :style=computedStyle v-on:click="setActive">
            <div class="display">
                <button class="count" v-on:click="count--"><</button>
                <p v-bind:class="{ contrasted: image!='' }">{{ count }}</p>
                <button class="count" v-on:click="count++">></button>
            </div>
            <div class="rotation">
                <button class="rotate" v-on:click="rotation+=90">&#x21BB</button>
                <button class="edit" v-on:click="isEdit = !isEdit">✎</button>
                <button class="rotate" v-on:click="rotation-=90">&#x21BA</button>
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
        },
        invertTheme: function(){
            let inverted = 255 - this.$el.style.getPropertyValue("--base-color");
            this.$el.style.setProperty('--base-color', inverted);
        },
        setActive: function () {
            this.$root.activeCounter = this;
        }
    }
})

class CounterObject {
    constructor(initRotation) {
        this.initRotation = initRotation;
    }
}

let main = new Vue({ 
    el: "#vue-app",
    data: {
        counters: [
            new CounterObject(180),
            new CounterObject(0),
        ],
        activeCounter: null,
    },
    methods: {
        addCounter: function() {
            if(this.counters.length<2){
                this.counters.push(new CounterObject(0));
            } else {
                alert("Can't have more than 2")
            }
            
        },
        removeCounter: function() {
            if(this.counters.length>1){
                this.counters.pop();
            } else {
                alert("Can't have less than 1")
            }
        }
    },
    mounted: function(){
        this.activeCounter = this.$children[0];
    }
})