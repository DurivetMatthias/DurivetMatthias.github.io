Vue.component('life-counter', {
    data: function () {
        return {
            count: 20,
            rotation: 0,
        }
    },
    computed:{
        rstyle () {
            return 'transform: rotate(' + this.rotation + 'deg)'
        }
    },
    template: `
        <div class='life-counter' :style="rstyle">
            {{rstyle}}
            <button class='add' v-on:click='count++'>+</button>
            <button class='sub' v-on:click='count--'>-</button>
            <p>{{ count }}</p>
            <button class='rotate' v-on:click='rotation+=90'>ROTATE ({{rotation}})</button>
        </div>
    `,
    methods: {
        some: function () {
          this.rotate(90)
        }
    }
})

new Vue({ el: '#vue-app' })