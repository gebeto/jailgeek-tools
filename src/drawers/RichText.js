"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Line_1 = require("./Line");
var RichText = /** @class */ (function () {
    function RichText(font, text, x, y) {
        this.font = font;
        this.text = text;
        this.x = x;
        this.y = y;
        this.lines = this.text.split("\n").map(function (text, index) {
            return new Line_1.Line(font, text, x, y, index);
        });
    }
    RichText.prototype.draw = function (ctx) {
        this.lines.forEach(function (el) {
            el.draw(ctx);
        });
    };
    return RichText;
}());
exports.RichText = RichText;
