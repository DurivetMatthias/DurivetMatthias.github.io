Vue.component("life-counter", {
    props: ["initRotation"],
    data: function () {
        return {
            count: 20,
            image: "",
            rotation: this.initRotation,
            isEdit: false
        }
    },
    computed:{
        computedStyle () {
            let rotateStyle;
            let backgroundStyle = "backgroundImage: url(" + this.image + ")";
            if(this.isEdit){
                rotateStyle = "transform: rotate(" + 0 + "deg)"
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
                <button class="apply" v-on:click="isEdit=false">Apply</button>
            </div>
        </div>
    `,
    methods: {
        changeImage: (event) => {
            let search = event.srcElement.value;
            let searchUrl = "https://api.scryfall.com/cards/named?fuzzy="+search
            fetch(searchUrl)
                .then(response => {
                    return response.json();
                })
                .then(cardJson => {
                    this.image = cardJson.image_uris.art_crop
                }).catch(error => console.log(error));
        }
    }
})

new Vue({ el: "#vue-app" })