Vue.component("die", {
    props: ["die"],
    data: function () {
        return {
            die: this.die,
        }
    },
    computed: {
        rotation() {

        },
        computedStyle() {

        }
    },
    template: `<div v-on:click="" v-html="die.template"></div>`,
    methods: {

    }
})

class Die {
    constructor(template) {
        this.template = template;
        this.isSpinning = false;
        this.me = this;
    }

    toggleSpin() {
        this.isSpinning = !this.isSpinning;
    }

    roll() {
        this.isSpinning = false;
    }
}

class D6 extends Die {
    constructor(isSpinning) {
        let classList = "";
        if (isSpinning) {
            classList += "is-spinning";
        }
        // if (BackfaceHidden) {
        //     classList += " is-backface-hidden";
        // }
        super(
            `<div class="dieContainer">
                <div class="die ${classList}">
                    <div class="die_face die_face-front"></div>
                    <div class="die_face die_face-back"></div>
                    <div class="die_face die_face-right"></div>
                    <div class="die_face die_face-left"></div>
                    <div class="die_face die_face-top"></div>
                    <div class="die_face die_face-bottom"></div>
                </div>
            </div>`
        );
    }
}

class D4 extends Die {
    constructor(isSpinning) {
        let classList = "";
        if (isSpinning) {
            classList += "is-spinning";
        }
        // if (BackfaceHidden) {
        //     classList += " is-backface-hidden";
        // }
        super(
            `<div class="dieContainer-d3">
                <div class="die-d3 ${classList}">
                    <div class="die_face-d3 die_face-d3-front">
                        <svg width="200px" height="173px">
                            <polygon points="0,173 200,173 100,0" style="fill:black;stroke:black;stroke-width:1" />
                            <text text-anchor="middle" x="100" y="65" fill="white" font-size="36px" transform="rotate(0, 100, 115)">4</text>
                            <text text-anchor="middle" x="100" y="65" fill="white" font-size="36px" transform="rotate(120, 100, 115)">3</text>
                            <text text-anchor="middle" x="100" y="65" fill="white" font-size="36px" transform="rotate(240, 100, 115)">2</text>
                        </svg>
                    </div>
                    <div class="die_face-d3 die_face-d3-left">
                        <svg width="200px" height="173px">
                            <polygon points="0,173 200,173 100,0" style="fill:black;stroke:black;stroke-width:1" />
                            <text text-anchor="middle" x="100" y="65" fill="white" font-size="36px" transform="rotate(0, 100, 115)">4</text>
                            <text text-anchor="middle" x="100" y="65" fill="white" font-size="36px" transform="rotate(120, 100, 115)">1</text>
                            <text text-anchor="middle" x="100" y="65" fill="white" font-size="36px" transform="rotate(240, 100, 115)">3</text>
                        </svg>
                    </div>
                    <div class="die_face-d3 die_face-d3-right">
                        <svg width="200px" height="173px">
                            <polygon points="0,173 200,173 100,0" style="fill:black;stroke:black;stroke-width:1" />
                            <text text-anchor="middle" x="100" y="65" fill="white" font-size="36px" transform="rotate(0, 100, 115)">4</text>
                            <text text-anchor="middle" x="100" y="65" fill="white" font-size="36px" transform="rotate(120, 100, 115)">2</text>
                            <text text-anchor="middle" x="100" y="65" fill="white" font-size="36px" transform="rotate(240, 100, 115)">1</text>
                        </svg>
                    </div>
                    <div class="die_face-d3 die_face-d3-bottom">
                        <svg width="200px" height="173px"  transform="scale(-1, 1)">
                            <polygon points="0,173 200,173 100,0" style="fill:black;stroke:black;stroke-width:1" />
                            <text text-anchor="middle" x="100" y="65" fill="white" font-size="36px" transform="rotate(0, 100, 115)">1</text>
                            <text text-anchor="middle" x="100" y="65" fill="white" font-size="36px" transform="rotate(120, 100, 115)">2</text>
                            <text text-anchor="middle" x="100" y="65" fill="white" font-size="36px" transform="rotate(240, 100, 115)">3</text>
                        </svg>
                    </div>
                </div>
            </div>`
        );
    }
}

let main = new Vue({
    el: "#vue-app",
    data: {
        dice: [new D6(true), new D4(true)],
    },
    methods: {

    },
    mounted: function () {

    }
})
