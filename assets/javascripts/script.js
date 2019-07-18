let main = new Vue({
    el: "#vue-app",
    data: {
        apps: ["Camera App", "Life App"],
        rotationEnabled: window.DeviceOrientationEvent
    },
    methods: {

    },
    created: function () {
        // Live Background
        // if (window.DeviceOrientationEvent) {
        //     alert("supported");
        // }else{
        //     alert("not supported");
        // }
        // let _this = this;
        // window.addEventListener("deviceorientation", function (event) {
        //     _this.xRotation = Math.round(event.beta);
        //     _this.yRotation = Math.round(event.gamma);
        //     let rotateX = (_this.xRotation) * 2;
        //     let rotateY = (_this.yRotation) * 2;
        //     this.document.getElementById("cube").style = `transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg);`
        // }, true);
    }
})