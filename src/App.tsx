import React,{useState} from 'react';
import p5 from 'p5';
import p5Types from 'p5';
import Sketch from "react-p5";
import './App.css';
// import P5Wrapper from 'react-p5-wrapper';
import "p5/lib/addons/p5.sound";

const rain = require('./audio/Mems2.wav');

function App() {
  const [soundFile,setSong] = useState<any>();
  const [Amp,setAmp] = useState<any>(new p5.Amplitude());
  const [FFT,setFFT] = useState<any>(new p5.FFT());
  const [isSongLoaded,setLoaded] = useState<boolean>(true);
  const [volHistory] = useState<any>([]);


  const preload = () =>{
    setSong(new p5.SoundFile(rain,loaded))
  }

  let loaded = () =>{
    console.log('song has loaded')
    setLoaded(false);
  }

  const setup = (P5: p5Types,canvasParentRef: Element) => {
      P5.createCanvas(700, 500).parent(canvasParentRef);
      P5.angleMode(P5.DEGREES);
      setAmp(new p5.Amplitude());
      setFFT(new p5.FFT(0,512));
  }; 

  const draw = (p5: p5Types) => {
    p5.background(50);

    //CENTER CIRCLE
    let vol = Amp.getLevel();
    let diam = p5.map(vol,0,0.5,10 ,200);
    p5.fill(255,0,255);
    p5.ellipse(p5.width/2,p5.height/2,diam*3,diam*3); 

    //AMP LINE
    volHistory.push(vol);   
    p5.stroke(255);
    p5.noFill();
    p5.translate(p5.width/2,p5.height/2);
    p5.beginShape();
    for(let i:number = 0; i < 360; i++){
      let r = p5.map(volHistory[i],0,0.2,100,200);
      let x = r * p5.cos(i);
      let y = r * p5.sin(i);
      // let y = p5.map(volHistory[i],0,0.2,p5.height/2,1);
      p5.vertex(x,y);
      
    }
    p5.endShape();
    
    if(volHistory.length > 360){
      volHistory.splice(0,1);
    }


        // let spectrum = FFT.analyze();
    // let w = (p5.width / 60)-4;
    // p5.stroke(255);
    // for(let i:number = 0; i < spectrum.length; i++){
    //   let amp = spectrum[i];
    //   let y = p5.map(amp,0,256,p5.height,0);
    //   p5.line(i*w,p5.height,i*w,y);

    // }

    
};




  function play() {
    soundFile.play(); 
    soundFile.setVolume(0.2);
  }

  let stop = () =>{
    soundFile.stop();
  }

  let test = () =>{
    console.log(volHistory);
    volHistory.push(2);
    console.log(volHistory);

  }


 
 
  return (
    <div className="App">
      <header> <h1>Audio Visualizer</h1></header>
      <main>
        <div className="controller">
          <div className="button-controller">
          <button disabled={isSongLoaded} onClick={play}>Play audio</button>
            <button disabled={isSongLoaded} onClick={stop}>Stop audio</button>
          <button disabled={isSongLoaded} onClick={test}>TEST Button</button>

          </div>
          <div className="volume-controller">
            
          </div>
         

        </div>

        <div  className="visual-area">
        {/* <P5Wrapper sketch={sketch}></P5Wrapper> */}
     
        <Sketch preload={preload} setup={setup}  draw={draw }></Sketch> 
        </div>

      </main>
      <footer>

        <h3>Copyright</h3>
      </footer>
    
    </div>
  );
}

export default App;


//P5-WRAPPER VERSION

  // const sketch = (p) =>{
  //   let mySound;
  //   p.preload = () =>{
  //     p.soundFormats('wav');
  //     mySound = p.loadSound(rain);
      
  //   }
    
  //   p.setup = () =>{
  //     let cnv = p.createCanvas(100, 100);
  //     cnv.mousePressed(canvasPressed);
  //     p.background(220);
  //     p.text('tap here to play', 10, 20);

  //   }
  //   function canvasPressed() {

  //     mySound.play();
  //   }
  // }
