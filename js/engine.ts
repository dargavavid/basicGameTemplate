interface Key {
  code: number;
  isDown: boolean,
  action: any
}

class Game {
  bg: any;
  fg: any;
  bgCtx: any;
  fgCtx: any;
  fps: number;
  lastFrame: number = 0;
  frameCounter: number = 0;
  latency: number = 1;
  entities: any[];
  controlls: Key[];
  interactions: any[];
  constructor(fps: number, bg: any, fg: any, entities: any[], controlls: Key[], interactions: any[]) {
    this.fps = fps;
    this.bg = bg;
    this.fg = fg;
    this.setContexts();
    this.entities = entities;
    this.controlls = controlls;
    this.setKeyListener();
    this.interactions = interactions;
  }
  setContexts(): void {
    this.bgCtx = this.bg.getContext("2d");
    this.fgCtx = this.fg.getContext("2d");
  }
  setKeyListener(): void {
    document.addEventListener("keydown", e => {
      this.controlls.forEach(key => {
        if (key.code === e.keyCode) {
          // console.log(key);
          key.isDown = true;
        }
      });
    });
    document.addEventListener("keyup", e => {
      this.controlls.forEach(key => {
        if (key.code === e.keyCode) {
          key.isDown = false;
        }
      });
    });
  }
  executeActiveKeys(): void {
    this.controlls.forEach(key => {
      if (key.isDown) {
        key.action();
      }
    });
  }
  clearForeground(): void {
    this.fgCtx.clearRect(0, 0, this.fg.width, this.fg.height);
  }
  renderEntities(): void {
    this.entities.forEach(entity => entity.render(this.fgCtx))
  }
  handleInteractions(): void {
    this.interactions.forEach(interaction => interaction());
  }
  run(time: number = 0): void {
    window.requestAnimationFrame(this.run.bind(this));
    const deltaTime = time - this.lastFrame;
    this.frameCounter += deltaTime;
    this.lastFrame = time;
    if (this.frameCounter > this.fps) {
      // console.log("fps");
      this.latency = this.frameCounter / this.fps;
      this.clearForeground();
      this.executeActiveKeys();
      this.handleInteractions();
      this.renderEntities();
      this.frameCounter = 0;
    }
  }
  run2(): void {
    window.requestAnimationFrame(this.run.bind(this));
    this.clearForeground();
    this.executeActiveKeys();
    this.handleInteractions();
    this.renderEntities();
  }
}
