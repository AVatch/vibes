import * as p5 from "p5";

import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {
  // ------------------------

  private p5;

  // ------------------------

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}

  ngAfterViewInit() {
    this.createCanvas();
  }

  // ------------------------

  private createCanvas() {
    this.p5 = new p5(this.sketch);
  }

  private sketch(p: any) {
    p.setup = () => {
      p.createCanvas(256, 256).parent("sketch-canvas");
    };

    p.draw = () => {
      p.background(255);
      p.fill(0);
      p.rect(p.width / 2, p.height / 2, 50, 50);
    };
  }
}
