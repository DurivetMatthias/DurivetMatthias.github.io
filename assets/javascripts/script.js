let main = new Vue({
    el: "#vue-app",
    data: {
        apps: [],
        rotationEnabled: window.DeviceOrientationEvent
    },
    methods: {

    },
    created: function () {
        const Http = new XMLHttpRequest();
        const url = "/apps";
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            if (e.target.readyState == 4) {
                let lines = Http.response.split("\n");
                lines.reverse().forEach(element => {
                    if (element.includes('class="icon icon-directory"')) {
                        this.apps.push(element);
                    }
                });
                this.apps.pop();
                for (let i = 0; i < this.apps.length; i++) {
                    this.apps[i] = this.apps[i].split("apps/")[1].split("\"")[0].replace("%20", " ");;
                }
                this.apps = this.apps.sort((a, b) => {
                    a = a.toLowerCase();
                    b = b.toLowerCase();
                    if (a < b) return -1;
                    else if (a > b) return 1;
                    else return 0;
                })
            }
        }

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