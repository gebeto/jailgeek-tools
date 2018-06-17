"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var addons_1 = require("./addons");
var config_1 = require("./config");
var Word = /** @class */ (function () {
    function Word(font, text, x, y) {
        this.font = font;
        this.chunks = [];
        this.text = text;
        this.x = x;
        this.y = y;
        this.positionChanged = false;
        this.path = addons_1.getPathWithLetterSpacing(this.font.getPaths(this.text, 0, 0, config_1.FONT_SIZE), config_1.LETTER_SPACING);
        this.bounding = this.path.getBoundingBox();
    }
    Object.defineProperty(Word.prototype, "width", {
        get: function () {
            return this.bounding.x2 - this.bounding.x1;
        },
        enumerable: true,
        configurable: true
    });
    Word.prototype.setPosition = function () {
        var _this = this;
        this.path.commands.forEach(function (el) {
            if (el.hasOwnProperty("x"))
                el.x += _this.x;
            if (el.hasOwnProperty("x1"))
                el.x1 += _this.x;
            if (el.hasOwnProperty("x2"))
                el.x2 += _this.x;
            if (el.hasOwnProperty("y"))
                el.y += _this.y;
            if (el.hasOwnProperty("y1"))
                el.y1 += _this.y;
            if (el.hasOwnProperty("y2"))
                el.y2 += _this.y;
        });
        this.positionChanged = true;
    };
    Word.prototype.resetPosition = function () {
        var _this = this;
        if (!this.positionChanged)
            return;
        this.positionChanged = false;
        this.path.commands.forEach(function (el) {
            if (el.hasOwnProperty("x"))
                el.x -= _this.x;
            if (el.hasOwnProperty("x1"))
                el.x1 -= _this.x;
            if (el.hasOwnProperty("x2"))
                el.x2 -= _this.x;
            if (el.hasOwnProperty("y"))
                el.y -= _this.y;
            if (el.hasOwnProperty("y1"))
                el.y1 -= _this.y;
            if (el.hasOwnProperty("y2"))
                el.y2 -= _this.y;
        });
    };
    Word.prototype.draw = function (ctx) {
        this.setPosition();
        this.path.draw(ctx);
        var br = this.path.getBoundingBox();
        ctx.strokeRect(br.x1, br.y1, br.x2 - br.x1, br.y2 - br.y1);
        this.resetPosition();
    };
    return Word;
}());
exports.Word = Word;
