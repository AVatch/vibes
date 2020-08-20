declare var p5: any;

import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {
  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}

  ngAfterViewInit() {
    new p5((sketch) => {
      sketch.preload = () => this.preload(sketch);
      sketch.setup = () => this.setup(sketch);
      sketch.draw = () => this.draw(sketch);
    });
  }

  // ----------------------------
  // audio processing business
  //    Garble up the audio from
  //    the microphone
  // ----------------------------

  // ----------------------------
  // webRTC business
  //    Connect to a room and pull
  //    audio streams from the other
  //    participants and merge it
  // ----------------------------

  // ----------------------------
  // rendering business
  //    Create the circular rings
  //    representing the user and
  //    the crowd.
  // ----------------------------

  private canvasSizeX = 750;
  private canvasSizeY = 750;

  private resolution = 100;

  private r = this.canvasSizeX * 0.3;

  private fft;
  private fftSmoothing = 0.8;
  private fftBins = 512;

  private mic;

  private preload(sketch: any) {}

  private setup(sketch: any) {
    // Create the canvas
    sketch
      .createCanvas(this.canvasSizeX, this.canvasSizeY)
      .parent("sketch-canvas");

    // Create the FFT analyzer
    this.fft = new p5.FFT(this.fftSmoothing, this.fftBins);

    // Define the mic input and connect it to the FFT
    this.mic = new p5.AudioIn();
    this.mic.connect(this.fft);

    // Ask permission and start w mic
    this.enableMic();
  }

  private loaded(sketch: any) {}

  private draw(sketch: any) {
    sketch.background(34, 36, 40);

    this.visualizeWaveform(sketch);
  }

  private enableMic() {
    this.mic.start();
  }

  private visualizeWaveform(sketch) {
    //make waveform usable
    const waveform = this.fft.waveform(this.fftBins);
    const waveInter = p5.prototype.floor(waveform.length / this.resolution);

    let reducedWave = [];
    for (let i = 0; i < this.resolution; i++) {
      reducedWave.push(waveform[i * waveInter]);
    }

    sketch.beginShape();
    sketch.noFill();
    sketch.stroke(255, 255, 255);
    sketch.strokeWeight(4);
    sketch.translate(sketch.width / 2, sketch.height / 2);
    for (let i = 0; i < this.resolution; i++) {
      const off = p5.prototype.map(
        reducedWave[i],
        -1,
        1,
        -this.r / 2,
        this.r / 2
      );

      const angle = p5.prototype.map(
        i,
        0,
        this.resolution,
        0,
        p5.prototype.TWO_PI
      );

      const y = (this.r - this.r * 0.1 + off) * p5.prototype.sin(angle);
      const x = (this.r - this.r * 0.1 + off) * p5.prototype.cos(angle);

      sketch.vertex(x, y);
    }
    sketch.endShape(p5.prototype.CLOSE);
  }
}
