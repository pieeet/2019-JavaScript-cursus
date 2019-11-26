// create img elements
var imgs = [];
for (let i = 0; i < 9; i++) {
    const img = document.createElement("IMG");
    img.width = 200;
    imgs.push(img);
}
// create src attributes
var sources = [];
for (let i = 0; i < imgs.length; i++) {
    sources.push("img/vogel" + (i + 1) + ".jpeg");
}
// get a random src to link to an img and remove src from array
function getRandomSrc() {
    const random = Math.floor(Math.random() * sources.length);
    const src = sources[random];
    //with splice you can remove an element from an array
    //https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    sources.splice(random, 1);
    return src;
}
// add the img to imagewrapper
const imgWrapper = document.getElementById("imgWrapper");
for (let i = 0; i < imgs.length; i++) {
    imgs[i].src = getRandomSrc();
    imgWrapper.appendChild(imgs[i]);
}

