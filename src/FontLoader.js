"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var OpenType = __importStar(require("opentype.js"));
function FontLoader(fontPath) {
    return new Promise(function (resolve, reject) {
        OpenType.load(fontPath, function (error, font) {
            if (font) {
                resolve(font);
            }
            else {
                reject(error);
            }
        });
    });
}
exports.FontLoader = FontLoader;
function drawLettersWithSpacing(ctx, letterSpacing, color) {
    return function (letter, index, arr) {
        letter.commands.forEach(function (el) {
            if (el.x) {
                el.x += letterSpacing * index;
            }
            if (el.x1) {
                el.x1 += letterSpacing * index;
            }
            if (el.x2) {
                el.x2 += letterSpacing * index;
            }
        });
        letter.fill = color;
        letter.draw(ctx);
        var lb = letter.getBoundingBox();
        ctx.strokeStyle = "red";
        ctx.strokeRect(lb.x1, lb.y1, lb.x2 - lb.x1, lb.y2 - lb.y1);
    };
}
exports.drawLettersWithSpacing = drawLettersWithSpacing;
