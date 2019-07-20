let main = new Vue({
    el: "#vue-app",
    data: {
        apps: ["Camera App", "Dice App", "Life App"],
        rotationEnabled: window.DeviceOrientationEvent,
        rotationStyle: "",
    },
    methods: {
        // Dice orientation
        // Also flips text
        // onOrientationChange: function () {
        //     if (screen.orientation.angle == 180) {
        //         this.rotationStyle = "transform: rotate(180deg) scaleX(-1)";
        //     } else if (screen.orientation.angle == 270) {
        //         this.rotationStyle = "transform: rotate(180deg) scaleY(-1)";
        //     }
        // },
    },
    mounted: function () {
        ///Live Background
        if (window.DeviceOrientationEvent) {
            console.log("Orientation Event supported");
        } else {
            console.log("Orientation Event not supported");
        }
        window.addEventListener("deviceorientation", function (event) {
            let rotateX = (Math.round(event.beta)) * 2;
            let rotateY = (Math.round(event.gamma)) * 2;
            document.getElementById("cubeContainer").style = `transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg);`
        }, true);
    }
})