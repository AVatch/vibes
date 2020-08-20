import * as p5 from "p5";

import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {
  // ------------------------

  private p5: any;

  // ------------------------

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}

  ngAfterViewInit() {
    this.createCanvas();
  }

  // ------------------------

  private createCanvas() {
    this.p5 = new p5((sketch) => {
      let coords = [40, 40, 80, 60, 100, 100, 60, 120, 50, 150];
      let song;

      sketch.setup = () => {
        sketch.createCanvas(256, 256).parent("sketch-canvas");

        // sketch.soundFormats("mp3");
        // song = p.loadSound("assets/Kenney_Floreat_-_02_-_Crucify.mp3");
      };

      sketch.loaded = () => {
        // song.play();
      };

      sketch.draw = () => {
        // sketch.background(255);
        // sketch.fill(0);
        // sketch.rect(sketch.width / 2, sketch.height / 2, 50, 50);

        sketch.background(255);
        sketch.noFill();
        sketch.stroke(0);
        sketch.beginShape();
        sketch.curveVertex(40, 40);
        sketch.curveVertex(40, 40);
        sketch.curveVertex(80, 60);
        sketch.curveVertex(100, 100);
        sketch.curveVertex(60, 120);
        sketch.curveVertex(50, 150);
        sketch.curveVertex(50, 150);
        sketch.endShape();

        // once FFT is done, connect w https://p5js.org/learn/curves.html
      };
    });
  }
}
