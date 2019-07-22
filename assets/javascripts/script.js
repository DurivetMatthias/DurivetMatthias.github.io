let main = new Vue({
    el: "#vue-app",
    data: {
        apps: ["Camera App", "Dice App", "Life App"],
        rotationEnabled: window.DeviceOrientationEvent
    },
    methods: {
    },
    mounted: function () {
        ///Live Background
        if (this.rotationEnabled) {
            console.log("Orientation Event supported");
        } else {
            console.log("Orientation Event not supported");
        }
    }
})