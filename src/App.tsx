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
  const [isSongLoaded,setLoaded] = useState<boolean>(true);


  let x = 50;

  const preload = () =>{
    setSong(new p5.SoundFile(rain,loaded))
  }

  let loaded = () =>{
    console.log('song has loaded')
    setLoaded(false);
  }

  const setup = (P5: p5Types,canvasParentRef: Element) => {
      P5.createCanvas(500, 500).parent(canvasParentRef);
      setAmp(new p5.Amplitude())
      Amp.getLevel();
      P5.text('tap here to play', 10, 20);
 
  }; 

  const draw = (p5: p5Types) => {
    p5.background(50);

    let vol = Amp.getLevel();
    let diam = p5.map(vol,0,0.3,10 ,200);
    
    p5.fill(255,0,255);
    p5.ellipse(p5.width/2,p5.height/2,diam*5,diam*5); 

  
};


  function play() {
    soundFile.play(); 
    soundFile.setVolume(0.1);
  }

  let stop = () =>{
    soundFile.stop();
  }

  let test = () =>{
    console.log(Amp.getLevel());

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
