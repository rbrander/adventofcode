const data = require('./data');

// init the lights array
var lights = new Array(1000);
for (var i=0; i < 1000; i++) {
  lights[i] = new Array(1000);
  for (var j=0; j < 1000; j++)
    lights[i][j] = 0;
}

function countLightsOn() {
  var cnt = 0;
  for (var y = 0; y < 1000; y++)
    for (var x = 0; x < 1000; x++)
      cnt += lights[x][y];
  return cnt;
}

function changeLights(action, sx, sy, ex, ey) {
  for (var y = sy; y <= ey; y++) {
    for (var x = sx; x <= ex; x++) {
      var newValue = lights[x][y];
      switch (action) {
        case 'on':
          newValue += 1;
          break;
        case 'off':
          newValue -= 1;
          if (newValue < 0)
            newValue = 0;
          break;
        case 'toggle':
          newValue += 2;
          break;
        default:
          break;
      }
      lights[x][y] = newValue;
    }
  }
}

function parseData() {
  var lineRegex = /.*(off|toggle|on) (\d+),(\d+) through (\d+),(\d+)/;
  var lines = data.split('\n');
  lines.forEach((line) => {
    if (!lineRegex.test(line)) {
      throw 'Invalid line: ' + line;
    }
    var matches = lineRegex.exec(line);
    var action = matches[1];
    var sx = parseInt(matches[2]);
    var sy = parseInt(matches[3]);
    var ex = parseInt(matches[4]);
    var ey = parseInt(matches[5]);
    changeLights(action, sx, sy, ex, ey);
  })
}


parseData();

console.log('num lights on: ' + countLightsOn());
