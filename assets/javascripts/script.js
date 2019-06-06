Vue.component('life-counter', {
    data: function () {
        return {
            count: 20
        }
    },
    template: `
        <div class='life-counter'>
            <button class='add' v-on:click='count++'>+</button>
            <p>{{ count }}</p>
            <button class='sub' v-on:click='count--'>-</button>
        </div>
    `
})

new Vue({ el: '#vue-app' })