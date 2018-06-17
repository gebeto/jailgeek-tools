"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var addons_1 = require("./addons");
var config_1 = require("./config");
var Line = /** @class */ (function () {
    function Line(font, text, x, y, index) {
        var _this = this;
        this.index = index;
        this.font = font;
        this.text = text;
        this.x = x;
        this.y = y;
        var leftOffset = 0;
        var wordY = y + this.index * 144;
        var wordX = x;
        this.words = this.text.split(" ").map(function (text, index) {
            wordX += leftOffset + (index ? 30 : 0);
            var result = leftOffset = addons_1.getPathWithLetterSpacing(_this.font.getPaths(text, 0, 0, 119), config_1.LETTER_SPACING).getBoundingBox().x2;
            return;
        });
    }
    Line.prototype.draw = function (ctx) {
        this.words.forEach(function (el) {
            el.draw(ctx);
        });
    };
    return Line;
}());
exports.Line = Line;
