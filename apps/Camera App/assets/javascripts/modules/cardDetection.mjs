/* TF.js Object detection */
const originalHeight = 4608;
const originalWidth = 3456;
const newHeight = 936;
let scaleRatio = newHeight / originalHeight;
const newWidth = originalWidth * scaleRatio;
const worker = new Tesseract.TesseractWorker();

function initCanvas(){
    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;
    canvas.hidden = "hidden";
    document.body.appendChild(canvas);
    return canvas;
}

function drawBase(imgUrl){
    const canvas = initCanvas();
    const ctx = canvas.getContext("2d");
    const img = new Image;
    return new Promise(function(resolve){
        img.onload = function(){
            ctx.drawImage(img,
                0, 0, newWidth, newHeight
            );
            resolve(canvas);
        };
        img.src = imgUrl;
    });
}

function drawCard(baseCanvas){
    let canvas = initCanvas();
    const ctx = canvas.getContext("2d");
    return new Promise(function(resolve, reject){
        cocoSsd.load().then(model => {
            model.detect(baseCanvas).then(predictions => {
                predictions.forEach(pred => {
                    if(pred.class == "book" || pred.class == "tv" ){
                        ctx.drawImage(baseCanvas,
                            pred.bbox[0], pred.bbox[1], pred.bbox[2], pred.bbox[3],
                            0, 0, newWidth, newHeight
                        );
                        resolve(canvas);
                    }else{
                        console.log(`Found ${pred.class} as class of object`);
                    }
                });
                reject("Failed to detect bounding boxes.");
            });
        });
    });
}

function drawCardName(cardCanvas){
    const heightRatio = 0.15;
    const widthRatio = 1;
    let canvas = initCanvas();
    canvas.height = canvas.height * heightRatio;
    canvas.width = canvas.width * widthRatio;
    const ctx = canvas.getContext("2d");
    const cardCtx = cardCanvas.getContext("2d")
    let imgd = cardCtx.getImageData(0, 0, canvas.width, canvas.height);
    let pix = imgd.data;
    const newColor = {r:255,g:255,b:255, a:0};
    for (let i = 0; i < pix.length; i += 4) {
        let r = pix[i];
        let g = pix[i+1];
        let b = pix[i+2];
        const threshold = 255; //171 for xenograft //100 for yuriko
        if(r > threshold && g > threshold && b > threshold){
            pix[i] = newColor.r;
            pix[i+1] = newColor.g;
            pix[i+2] = newColor.b;
            pix[i+3] = newColor.a;
        }
    }
    return new Promise(function(resolve){
        ctx.drawImage(cardCanvas,
            0, 0
        );
        ctx.putImageData(imgd, 0, 0);
        resolve(canvas);
    });
}

function readCardName(cardCanvas){
    return new Promise(function(resolve){
        worker.recognize(cardCanvas, 'eng')
        .progress((p) => {
            console.log('progress', p);
        })
        .then(({ text }) => {
            text = text.replace(/[^a-z\s',-]/igm, "");
            worker.terminate();
            resolve(text);
        });
    });
}

function fuzzySearch(cardName){
    let searchUrl = "https://api.scryfall.com/cards/named?fuzzy="+cardName;
    return fetch(searchUrl)
        .then(response => {
            return response.json();
        }).then(cardJson => {
            let img = document.createElement("img");
            img.src = cardJson.image_uris.large;
            document.body.appendChild(img);
        });
}

export default function(imgUrl){
    drawBase(imgUrl).then(canvas=>{
        return drawCard(canvas);
    }).then(canvas=>{
        return drawCardName(canvas);
    }).then(canvas=>{
        return readCardName(canvas);
    }).then(cardName=>{
        return fuzzySearch(cardName);
    }).catch(err=>{
        console.err(err);
    })
}