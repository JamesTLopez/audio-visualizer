import React,{useEffect,createRef} from 'react';
import p5 from 'p5';
import p5Types from 'p5';
import Sketch from "react-p5";
import './App.css';
// import P5Wrapper from 'react-p5-wrapper';
import "p5/lib/addons/p5.sound";

const rain = require('./rain.mp3');

function App() {

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


  let p5sound = new p5.SoundFile(rain);


  const setup = (p5: p5Types,canvasParentRef: Element) => {
      let cnv = p5.createCanvas(100, 100).parent(canvasParentRef);
      cnv.mousePressed(canvasPressed);
      p5.background(220);
      p5.text('tap here to play', 10, 20);
  }; 

  function canvasPressed() {
    p5sound.play();
  }

  let stop = () =>{
    p5sound.stop();
  }

 

  return (
    <div className="App">
      <header> <h1>Audio Visualizer</h1></header>
      <main>
        <div className="controller">
          <button>load audio</button>
          <button onClick={stop}>Stop audio</button>
          <button>Play audio</button>

        </div>

        <div  className="visual-area">
        {/* <P5Wrapper sketch={sketch}></P5Wrapper> */}
     
        <Sketch setup={setup} ></Sketch>
        </div>

      </main>
      <footer>

        <h3>Copyright</h3>
      </footer>
    
    </div>
  );
}

export default App;
