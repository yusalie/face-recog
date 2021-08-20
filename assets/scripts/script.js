const webcam = document.getElementById('webcam');
const live = new Webcam(webcam, 'user');
let info = document.getElementById("info")

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('../models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('../models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('../models'),

]).then(startStream())

function startStream(){
  live.start()
}

webcam.addEventListener('play', () =>{
  setInterval(async()=>{
    const faces = await faceapi.detectAllFaces(webcam, 
      new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
      console.log(faces);
    if(faces.length !=0 ){
      info.innerHTML = `<p id="text">`+faces.length + " face(s) detected" +`</p>`
    }

  }, 1000)
  
})