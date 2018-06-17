"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ImageLoader_1 = require("./ImageLoader");
var FontLoader_1 = require("./FontLoader");
var post_bg_png_1 = __importDefault(require("./assets/post-bg.png"));
var test_png_1 = __importDefault(require("./assets/test.png"));
var SFUIDisplayBlack_otf_1 = __importDefault(require("./assets/SFUIDisplayBlack.otf"));
var Archive_otf_1 = __importDefault(require("./assets/Archive.otf"));
var drawers_1 = require("./drawers/");
var bg = ImageLoader_1.ImageLoader(post_bg_png_1.default);
var test = ImageLoader_1.ImageLoader(test_png_1.default);
var SFDisplay = FontLoader_1.FontLoader(SFUIDisplayBlack_otf_1.default);
var Archive = FontLoader_1.FontLoader(Archive_otf_1.default);
// ImageLoader(testImage).then((image) => {
// 	(document.querySelector("#post-wrapper") as HTMLElement).appendChild(image);
// });
Promise.all([
    // bg,
    test,
    SFDisplay,
    Archive,
]).then(function (_a) {
    var bg = _a[0], SFDisplay = _a[1], Archive = _a[2];
    var canvas = document.getElementById("test-canvas");
    var ctx = canvas.getContext("2d");
    ctx.drawImage(bg, 0, 0);
    var letterSpacing = 0.6;
    function drawText(text, x, y, fontSize) {
        var rich = new drawers_1.RichText(SFDisplay, text, x, y);
        console.log(rich);
        rich.draw(ctx);
    }
    drawText("Мы поможем вам\nсохранить *shsh*. and", 100, 244, 119);
    // drawText("a", 100, 244, 119);
    // const line1 = getPathWithLetterSpacing(SFDisplay.getPaths("Мы поможем вам", 100, 244, 119), letterSpacing);
    // line1.fill = "#3C4D60";
    // line1.draw(ctx);
    // const line2 = getPathWithLetterSpacing(SFDisplay.getPaths("сохранить shsh", 100, 390, 119), letterSpacing);
    // line2.fill = "#3C4D60";
    // line2.draw(ctx);
    // const line3 = getPathWithLetterSpacing(SFDisplay.getPaths("сохранить shsh", 100, 390, 119), letterSpacing);
    // line3.fill = "#3880D3";
    // line3.draw(ctx);
    // console.log(line1)
});
