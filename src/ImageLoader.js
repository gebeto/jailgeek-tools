"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ImageLoader(imageUrl) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.onload = function () {
            resolve(image);
        };
        image.src = imageUrl;
    });
}
exports.ImageLoader = ImageLoader;
