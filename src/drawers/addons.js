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
function getPathWithLetterSpacing(paths, letterSpacing) {
    var result = new OpenType.Path();
    paths.forEach(function (path, index) {
        path.commands.forEach(function (el) {
            if (el.x) {
                el.x += letterSpacing * index;
            }
            if (el.x1) {
                el.x1 += letterSpacing * index;
            }
            if (el.x2) {
                el.x2 += letterSpacing * index;
            }
            result.commands.push(el);
        });
    });
    return result;
}
exports.getPathWithLetterSpacing = getPathWithLetterSpacing;
