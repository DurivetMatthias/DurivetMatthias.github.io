Vue.component('life-counter', {
    data: function () {
        return {
            count: 20,
            rotation: 0,
            image: ""
        }
    },
    computed:{
        computedStyle () {
            return 'transform: rotate(' + this.rotation + 'deg); backgroundImage: url(' + this.image + ')'
        }
    },
    template: `
        <div class='life-counter' :style=computedStyle>
            {{computedStyle}}
            <button class='add' v-on:click='count++'>+</button>
            <input type=text v-on:keyup.enter=changeImage></input>
            <button class='sub' v-on:click='count--'>-</button>
            <p>{{ count }}</p>
            <button class='rotate' v-on:click='rotation+=90'>ROTATE ({{rotation}})</button>
        </div>
    `,
    methods: {
        changeImage: function (event) {
            let search = event.srcElement.value;
            let searchUrl = "https://api.scryfall.com/cards/named?fuzzy="+search
            fetch(searchUrl)
                .then(response => {
                    return response.json();
                })
                .then(cardJson => {
                    this.image = cardJson.image_uris.art_crop
                });
        }
    }
})

new Vue({ el: '#vue-app' })