var Game = /** @class */ (function () {
    function Game(fps, bg, fg, entities, controlls, interactions) {
        this.lastFrame = 0;
        this.frameCounter = 0;
        this.latency = 1;
        this.fps = fps;
        this.bg = bg;
        this.fg = fg;
        this.setContexts();
        this.entities = entities;
        this.controlls = controlls;
        this.setKeyListener();
        this.interactions = interactions;
    }
    Game.prototype.setContexts = function () {
        this.bgCtx = this.bg.getContext("2d");
        this.fgCtx = this.fg.getContext("2d");
    };
    Game.prototype.setKeyListener = function () {
        var _this = this;
        document.addEventListener("keydown", function (e) {
            _this.controlls.forEach(function (key) {
                if (key.code === e.keyCode) {
                    // console.log(key);
                    key.isDown = true;
                }
            });
        });
        document.addEventListener("keyup", function (e) {
            _this.controlls.forEach(function (key) {
                if (key.code === e.keyCode) {
                    key.isDown = false;
                }
            });
        });
    };
    Game.prototype.executeActiveKeys = function () {
        this.controlls.forEach(function (key) {
            if (key.isDown) {
                key.action();
            }
        });
    };
    Game.prototype.clearForeground = function () {
        this.fgCtx.clearRect(0, 0, this.fg.width, this.fg.height);
    };
    Game.prototype.renderEntities = function () {
        var _this = this;
        this.entities.forEach(function (entity) { return entity.render(_this.fgCtx); });
    };
    Game.prototype.handleInteractions = function () {
        this.interactions.forEach(function (interaction) { return interaction(); });
    };
    Game.prototype.run = function (time) {
        if (time === void 0) { time = 0; }
        window.requestAnimationFrame(this.run.bind(this));
        var deltaTime = time - this.lastFrame;
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
    };
    Game.prototype.run2 = function () {
        window.requestAnimationFrame(this.run.bind(this));
        this.clearForeground();
        this.executeActiveKeys();
        this.handleInteractions();
        this.renderEntities();
    };
    return Game;
}());
