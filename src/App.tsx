import React, { useState } from "react";
import p5 from "p5";
import p5Types from "p5";
import Sketch from "react-p5";
import "./App.css";
// import P5Wrapper from 'react-p5-wrapper';
import "p5/lib/addons/p5.sound";

const rain = require("./audio/Mems2.wav");

function App() {
  const [soundFile, setSong] = useState<any>();
  const [FFT, setFFT] = useState<any>(new p5.FFT());
  const [isSongLoaded, setLoaded] = useState<boolean>(true);
  const [volumeTemp, setVolumeTemp] = useState<number>(20);
  const [isPlaying, setPlaying] = useState<boolean>(false);

  let preload = () => {
    setSong(new p5.SoundFile(rain, loaded));
  };

  let loaded = () => {
    console.log("song has loaded");
    setLoaded(false);
  };

  const setup = (P5: p5Types, canvasParentRef: Element) => {
    P5.createCanvas(850, 500).parent(canvasParentRef);
    P5.angleMode(P5.DEGREES);

    P5.colorMode(P5.HSB);
    setFFT(new p5.FFT(0, 256));
    soundFile.setVolume(0.2);
  };

  const draw = (p5: p5Types) => {
    //SPECTRUM
    let spectrum = FFT.analyze();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.background(0);

    p5.beginShape();
    for (let i: number = 0; i < spectrum.length; i++) {
      let angle = p5.map(i, 0, spectrum.length, 0, 360);
      let amp = spectrum[i];
      let r = p5.map(amp, 0, 200, 70, 240);
      let x = r * p5.cos(angle);
      let y = r * p5.sin(angle);
      p5.stroke(i, 255, 255);
      p5.line(0, 0, x, y);
    }
    p5.endShape();
  };

  let play = () => {
    if (!isPlaying) {
      soundFile.play();
      setPlaying(true);
    }
  };

  let stop = () => {
    setPlaying(false);
    soundFile.stop();
  };

  let onChangeSlider = (e: any) => {
    console.log(e.target.value / 100);
    setVolumeTemp(e.target.value);

    soundFile.setVolume(e.target.value / 100);
  };

  return (
    <div className="App">
      <header>
        {" "}
        <h1>Audio Visualizer</h1>
      </header>
      <main>
        <div className="controller">
          <div className="button-controller">
            <button disabled={isSongLoaded} onClick={play}>
              Play audio
            </button>
            <button disabled={isSongLoaded} onClick={stop}>
              Stop audio
            </button>
          </div>
          <div className="volume-controller">
            <input
              type="range"
              min={0}
              max={100}
              value={volumeTemp}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                onChangeSlider(e)
              }
              className="slider"
              id="myRange"
            />
          </div>
        </div>

        <div className="visual-area">
          <Sketch preload={preload} setup={setup} draw={draw}></Sketch>
        </div>
      </main>
      <footer>
        <h3>Copyright</h3>
      </footer>
    </div>
  );
}

export default App;
