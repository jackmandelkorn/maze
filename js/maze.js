var mazeData = "131101101101101101101101101101101101101101101101101101101101101101101101000000000000000000000000000000000000000000000000000000000000000000000000101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101000000000000000000000000000000000000000000000000000000000000000000000000101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101000000000000000000000000000000000000000000000000000000000000000000000000101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101000000000000000000000000000000000000000000000000000000000000000000000000101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101000000000000000000000000000000000000000000000000000000000000000000000000101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101000000000000000000000000000000000000000000000000000000000000000000000000101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101000000000000000000000000000000000000000000000000000000000000000000000000101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101000000000000000000000000000000000000000000000000000000000000000000000000101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101000000000000000000000000000000000000000000000000000000000000000000000000101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101000000000000000000000000000000000000000000000000000000000000000000000000101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101000000000000000000000000000000000000000000000000000000000000000000000000101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101101000000000000000000000000000000000000000000000000000000000000000000000000101101101101101101101101101101101101101101101101101101101101101101101141";
var xT = 72;
var yT = 36;

var wall = "1";
var space = "0";
var player = "8";
var color = "blue";
var gooAmt = 20;
var lives = 7;
var bombs = 10;
var teleporter = "unused";
var tele = "7";
var teleColor = "purple";
var telePos;

var hero = "9";
var heroColor = "cyan";

var enemy = "6";
var enemyColor = "red";
var enemyNum = 40;
var enemySpeed = 60;
var bfreq = 800;
var en = [];

var cow = "5";
var cowColor = "pink";
var cowSpeed = 400;
var cowNum = 10;
var cw = [];


var tInner;
var tColor;
var pos;
var start;
var begin;
var blob;
var cowBlob;
var score = 0;
var timer = 0;

function init() {
  document.getElementById("lives").innerHTML = lives;
  document.getElementById("goo").innerHTML = gooAmt;
  document.getElementById("bombs").innerHTML = bombs;
  document.getElementById("teleporter").innerHTML = teleporter;
  document.getElementById("score").innerHTML = score;
  var clock = window.setInterval(function(){time(); timer++;},1000);
  start = mazeData.indexOf("3");
  begin = 1;
  for (a = 0; a < yT; a++) {
    var newLine = document.createElement("br");
    document.body.appendChild(newLine);
    for (b = 0; b < xT; b++) {
      var char = document.createElement("span");
      char.innerHTML = mazeData.charAt((a * xT) + b);
      char.id = ((a * xT) + b);
        if (char.innerHTML === space) {
          char.style.color = "#404040";
        }
        else if (char.innerHTML === wall) {
          char.style.color = "#A0A0A0";
        }
        else if (char.innerHTML === "3") {
          char.style.color = "#404040";
        }
        else {
          char.style.color = "#A0A0A0";
        }
      document.body.appendChild(char);
    }
  }
  var newLine = document.createElement("br");
  document.body.appendChild(newLine);
    var status = document.createElement("p");
    status.id = "status";
    status.className = "norm";
      var p = document.createElement("span");
      p.id = "status-pre";
      var t = document.createElement("span");
      t.id = "status-time";
      t.style.color = "blue";
      status.appendChild(p);
      status.appendChild(t);
    document.body.appendChild(status);
  move(start);
  var test = 31;
  var period = window.setInterval(function(){
    test--;
    stat("building time: " + test + "s.");
    if (test === 0) {
      stat("demons released.");
      enemies();
      releaseCows();
      window.clearInterval(period);
    }
  },1000);
}

function releaseCows() {
  var test = 30;
  var period = window.setInterval(function(){
    test--;
    stat("time until goo-cows are released: " + test + "s.");
    if (test === 0) {
      stat("goo-cows released. moo.");
      cows();
      window.clearInterval(period);
    }
  },1000);
}

function move(char) {
  if (char > 0 && document.getElementById(char).innerHTML !== wall && char < mazeData.length) {
    if (begin === 0) {
      var pre = document.getElementById(pos);
      pre.innerHTML = tInner;
      pre.style.color = tColor;
    }
      var neo = document.getElementById(char);
      if (neo.innerHTML === enemy) {
        begin = 1;
        move(start);
        lives--;
        document.getElementById("lives").innerHTML = lives;
        stat("you lost a life.");
      }
      else if (neo.innerHTML === hero) {
        lives++;
        document.getElementById("lives").innerHTML = lives;
        stat("you were healed by the medic.");
        tInner = space;
        tColor = "#404040";
        neo.innerHTML = player;
        neo.style.color = color;
        pos = char;
        begin = 0;
      }
      else if (neo.innerHTML === cow) {
        var plusGoo = Math.floor(Math.random() * 11);
        gooAmt = gooAmt + plusGoo;
        document.getElementById("goo").innerHTML = gooAmt;
        stat("you harvested " + plusGoo + " goo from a goo-cow. moo.");
        tInner = space;
        tColor = "#404040";
        neo.innerHTML = player;
        neo.style.color = color;
        pos = char;
        begin = 0;
      }
      else {
        tInner = neo.innerHTML;
        tColor = neo.style.color;
        neo.innerHTML = player;
        neo.style.color = color;
        pos = char;
        begin = 0;
      }
  }
}

function enemies() {
  var spawn = mazeData.indexOf("4");
  for (i = 0; i < enemyNum; i++) {
    en[en.length] = [spawn,document.getElementById(spawn).innerHTML,document.getElementById(spawn).style.color,Math.floor(Math.random() * 4)];
  }
  blob = window.setInterval(function(){
    for (a = 0; a < en.length; a++) {
      var pre = document.getElementById(en[a][0]);
      pre.innerHTML = "0";
      pre.style.color = "#404040";
        var data = randomDir(en[a][0],en[a][3]);
          en[a][0] = data[0];
          en[a][3] = data[1];
        var neo = document.getElementById(en[a][0]);
        en[a][1] = neo.innerHTML;
        en[a][2] = neo.style.color;
        var num = Math.floor(Math.random() * (bfreq + 1));
        if (num === 0) {
          bomb(en[a][0],"enemy");
        }
    }
    for (b = 0; b < en.length; b++) {
      var neo = document.getElementById(en[b][0]);
      if (b === (en.length - 1) || b === (en.length - 2)) {
        neo.innerHTML = hero;
        neo.style.color = heroColor;
      }
      else {
        neo.innerHTML = enemy;
        neo.style.color = enemyColor;
        if (num === 1) {
          neo.innerHTML = "1";
          neo.style.color = "#A0A0A0";
          en[b][1] = "1";
          en[b][2] = "#A0A0A0";
        }
        else if (num === 2) {
          neo.innerHTML = "1";
          neo.style.color = "#A0A0A0";
          en[b][1] = "1";
          en[b][2] = "#A0A0A0";
        }
        else if (num === bfreq) {
          neo.innerHTML = "1";
          neo.style.color = "#A0A0A0";
          en[b][1] = "1";
          en[b][2] = "#A0A0A0";
        }
      }
    }
  },enemySpeed);
}

function cows() {
  var spawn = mazeData.indexOf("4");
  for (i = 0; i < cowNum; i++) {
    cw[cw.length] = [spawn,document.getElementById(spawn).innerHTML,document.getElementById(spawn).style.color,Math.floor(Math.random() * 4)];
  }
  cowBlob = window.setInterval(function(){
    for (a = 0; a < cw.length; a++) {
      var pre = document.getElementById(cw[a][0]);
      pre.innerHTML = "0";
      pre.style.color = "#404040";
        var data = randomDir(cw[a][0],cw[a][3]);
          cw[a][0] = data[0];
          cw[a][3] = data[1];
        var neo = document.getElementById(cw[a][0]);
        cw[a][1] = neo.innerHTML;
        cw[a][2] = neo.style.color;
    }
    for (b = 0; b < cw.length; b++) {
      var neo = document.getElementById(cw[b][0]);
        neo.innerHTML = cow;
        neo.style.color = cowColor;
      }
  },cowSpeed);
}


function randomDir(position,prev) {
  var test = Math.floor(Math.random() * 3);
  if (test === 0) {
    var num = Math.floor(Math.random() * 4);
  }
  else {
    var num = prev;
  }
  if (num === 0) {
    var char = position - 1;
    if (char > 0 && document.getElementById(char) !== null && char < mazeData.length) {
      if (document.getElementById(char).innerHTML === space || document.getElementById(char).innerHTML === enemy || document.getElementById(char).innerHTML === hero) {
        return [char,num];
      }
      else {
        return randomDir(position,prev);
      }
    }
    else {
      return randomDir(position,prev);
    }
  }
  else if (num === 1) {
    var char = position - xT;
    if (char > 0 && document.getElementById(char) !== null && char < mazeData.length) {
      if (document.getElementById(char).innerHTML === space || document.getElementById(char).innerHTML === enemy || document.getElementById(char).innerHTML === hero) {
        return [char,num];
      }
      else {
        return randomDir(position,prev);
      }
    }
    else {
      return randomDir(position,prev);
    }
  }
  else if (num === 2) {
    var char = position + 1;
    if (char > 0 && document.getElementById(char) !== null && char < mazeData.length) {
      if (document.getElementById(char).innerHTML === space || document.getElementById(char).innerHTML === enemy || document.getElementById(char).innerHTML === hero) {
        return [char,num];
      }
      else {
        return randomDir(position,prev);
      }
    }
    else {
      return randomDir(position,prev);
    }
  }
  else if (num === 3) {
    var char = +position - (xT * -1);
    if (char > 0 && document.getElementById(char) !== null && char < mazeData.length) {
      if (document.getElementById(char).innerHTML === space || document.getElementById(char).innerHTML === enemy || document.getElementById(char).innerHTML === hero) {
        return [char,num];
      }
      else {
        return randomDir(position,prev);
      }
    }
    else {
      return randomDir(position,prev);
    }
  }
}

function stat(dat) {
  document.getElementById("status-pre").innerHTML = dat;
}

function time() {
  document.getElementById("status-time").innerHTML = " [ clock: " + timer + "s ]";
}

function bomb(a,b) {
  if (bombs > 0 || b === "enemy") {
    var area = [(a-xT-1),(a-xT),(a-xT+1),(a+xT-1),(a+xT),(a+xT+1),(a-1),(a+1)];
    for (i = 0; i < area.length; i++) {
      if (document.getElementById(area[i]).innerHTML === "1" || document.getElementById(area[i]).innerHTML === "2") {
        if (document.getElementById(area[i]).innerHTML === "2") {
          gooAmt++;
          document.getElementById("goo").innerHTML = gooAmt;
        }
        document.getElementById(area[i]).innerHTML = "0";
        document.getElementById(area[i]).style.color = "#404040";
      }
    }


    tInner = "0";
    tColor = "#404040";
    if (b === "player") {
      bombs--;
      document.getElementById("bombs").innerHTML = bombs;
    }
  }
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 32:
            if (tInner === space) {
              tInner = wall;
              tColor = "#A0A0A0";
            }
            break;
        case 37:
            move(pos - 1);
            break;
        case 38:
            move(pos - xT);
            break;
        case 39:
            move(pos + 1);
            break;
        case 40:
            move(pos + xT);
            break;
        case 66:
            bomb(pos,"player");
            break;
        case 71:
            if (tInner === "0" && gooAmt > 0) {
              tInner = "2";
              tColor = "orange";
              gooAmt--;
              document.getElementById("goo").innerHTML = gooAmt;
            }
            break;
        case 82:
            if (teleporter === "placed") {
              document.getElementById(telePos).innerHTML = space;
              document.getElementById(telePos).style.color = "#404040";
            }
            if (tInner === space) {
              tInner = tele;
              tColor = teleColor;
              telePos = pos;
              teleporter = "placed";
              document.getElementById("teleporter").innerHTML = teleporter;
              stat("teleporter placed successfully.");
            }
            break;
        case 84:
            if (teleporter === "placed") {
              move(telePos);
              stat("teleported.");
            }
            break;
        case 90:
          if (tInner === "2") {
            gooAmt++;
            document.getElementById("goo").innerHTML = gooAmt;
          }
          else if (tInner === "7") {
            teleporter = "unused";
            document.getElementById("teleporter").innerHTML = teleporter;
            stat("teleporter removed.");
          }
          tInner = space;
          tColor = "#404040";
            break;
    }
};
