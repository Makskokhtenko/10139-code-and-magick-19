'use strict';

window.renderStatistics = function (ctx, names, times) {

  // Параметры
  var textFill = '#000000';

  var barWidth = 40;
  var initialX = 120;
  var initialY = 245;
  var indent = 90;
  var indentName = 20;
  var indentTime = 15;

  var histogramHeight = 150;
  var step = histogramHeight / (getMaxValue(times) - 0);

  // Тень облака
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  // Облако
  ctx.fillStyle = '#ffffff';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  // Текст
  ctx.fillStyle = textFill;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов: ', 120, 60);


  function getMaxValue(array) {
    var max = -1;
    for (var i = 0; i < array.length; i++) {
      var value = array[i];
      if (value > max) {
        max = value;
      }
    }
    return max;
  }

  function fillBarColor(namePlayer) {
    var randomSaturation = Math.floor(Math.random() * 101);
    if (namePlayer === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, 100%, ' + randomSaturation + '%)';
    }
  }

  for (var i = 0; i < times.length; i++) {
    var barHeight = times[i] * step;
    var getY = initialY - times[i] * step;
    var getX = initialX + indent * i;

    ctx.fillStyle = fillBarColor(names[i]);
    ctx.fillRect(getX, getY, barWidth, barHeight);

    ctx.fillStyle = textFill;
    ctx.fillText(names[i], getX, initialY + indentName);
    ctx.fillText(times[i].toFixed(0), getX, getY - indentTime);
  }
};
