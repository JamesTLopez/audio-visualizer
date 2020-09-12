import React,{useState} from 'react';
import p5 from 'p5';
import p5Types from 'p5';
import Sketch from "react-p5";
import './App.css';
// import P5Wrapper from 'react-p5-wrapper';
import "p5/lib/addons/p5.sound";

const rain = require('./rain.mp3');

function App() {
  const [soundFile,setSong] = useState<any>();
  const [isSongLoaded,setLoaded] = useState<boolean>(true);


  const preload = () =>{
    setSong(new p5.SoundFile(rain,loaded))
  }

  let loaded = () =>{
    console.log('song has loaded')
    setLoaded(false);
  }

  const setup = (p5: p5Types,canvasParentRef: Element) => {
      p5.createCanvas(100, 100).parent(canvasParentRef);
      p5.background(220);
      p5.text('tap here to play', 10, 20);
 
  }; 

  function play() {
    soundFile.play();
    soundFile.setVolume(0.1);
  }

  let stop = () =>{
    soundFile.stop();
  }


 

  return (
    <div className="App">
      <header> <h1>Audio Visualizer</h1></header>
      <main>
        <div className="controller">
          <div className="button-controller">
          <button disabled={isSongLoaded} onClick={play}>Play audio</button>
            <button disabled={isSongLoaded} onClick={stop}>Stop audio</button>
      

          </div>
          <div className="volume-controller">
            
          </div>
         

        </div>

        <div  className="visual-area">
        {/* <P5Wrapper sketch={sketch}></P5Wrapper> */}
     
        <Sketch preload={preload} setup={setup} ></Sketch> 
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
