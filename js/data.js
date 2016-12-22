var xT = 88;
var yT = 52;
var mazeData = "";
for (c = 0; c < xT; c++) {
  mazeData = mazeData + Math.floor(Math.random() * 2).toString();
}
console.log(mazeData);
for (a = 0; a < (yT - 1); a++) {
  for (b = 0; b < xT; b++) {
    var num = Math.floor(Math.random() * 2).toString();
    if (mazeData.charAt((a * xT) + b) === "0") {
      mazeData = mazeData + num;
    }
    else if (mazeData.charAt((a * xT) + b - 1) === "0") {
      mazeData = mazeData + num;
    }
    else if (mazeData.charAt((a * xT) + b + 1) === "0") {
      mazeData = mazeData + num;
    }
    else {
      mazeData = mazeData + "1";
    }
  }
}
