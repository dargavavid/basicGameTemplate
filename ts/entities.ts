class Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  images: any[];
  frame: number = 0;
  frameKey: number = 5;
  currentImageIndex: number = 0;
  vx: number;
  vy: number;
  isAnimated: boolean;
  constructor(x: number, y: number, width: number, height: number, imgsrcs: string[], vx: number = 0, vy: number = 0, isAnimated: boolean = true) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.images = this.setImages(imgsrcs);
    this.vx = vx;
    this.vy = vy;
    this.isAnimated = isAnimated;
  }
  setImages(srcs: string[]): any {
    const images = [];
    let img;
    if (srcs.length > 0) {
      for (const src of srcs) {
        img = new Image();
        img.src = src;
        images.push(img);
      }
    }
    return images;
  }
  incrementFrame(): void {
    this.frame++;
    if (this.frame === 1000) {
      this.frame = 0;
    }
  }
  render(context: any): void {
    if (this.images.length > 0) {
      if (this.isAnimated) {
        this.incrementFrame();
        this.currentImageIndex = this.frame % this.frameKey === 0? (this.currentImageIndex + 1) % this.images.length : this.currentImageIndex;
      }
      context.drawImage(this.images[this.currentImageIndex], this.x, this.y);
    }else {
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  pickRandomBetween(min: number, max: number): number {
    return ~~(Math.random() * (max - min) + min);
  }
  move(dx: number = 0, dy: number = 0, dt: number = 1): void {
    this.x += Math.ceil(dx * dt);
    this.y += Math.ceil(dy * dt);
  }
  updateLocation(): void {
    this.incrementFrame();
    this.x += this.vx;
    this.y += this.vy;
  }
}
