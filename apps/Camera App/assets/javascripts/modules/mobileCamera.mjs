/* Check for media devices */

function hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
}

if (hasGetUserMedia()) {
    console.log('media detected')
} else {
    alert('getUserMedia() is not supported by your browser');
}

/* Show camera in video element */

const constraints = {
    video: true
};

const captureVideoButton =
    document.querySelector('#capture-button');
const screenshotButton = document.querySelector('#screenshot-button');
const img = document.querySelector('img');
const video = document.querySelector('video');

const canvas = document.createElement('canvas');

navigator.mediaDevices.getUserMedia(constraints).
    then((stream) => { video.srcObject = stream });

/* make screenshot */

screenshotButton.onclick = video.onclick = function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    // Other browsers will fall back to image/png
    img.src = canvas.toDataURL('image/webp');
};

/* Check WebGL */
main();
function main() {
    const canvas = document.querySelector("#glCanvas");
    // Initialize the GL context
    const gl = canvas.getContext("webgl");

    // Only continue if WebGL is available and working
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
}