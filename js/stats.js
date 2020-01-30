'use strict';

window.renderStatistics = function (ctx, names, times) {

  // Параметры
  var TEXT_FILL = '#000000';
  var CLOUD_POSITION = [100, 10, 420, 270];
  var SHADOW_POSITION = [110, 20, 420, 270];

  var BAR_WIDTH = 40;
  var INITIAL_X = 120;
  var INITIAL_Y = 245;
  var INDENT = 90;
  var INDENT_NAME = 20;
  var INDENT_TIME = 15;

  var HISTOGRAM_HEIGHT = 150;
  var STEP = HISTOGRAM_HEIGHT / (getMaxValue(times) - 0);

  // Тень облака
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillRect.apply(ctx, SHADOW_POSITION);

  // Облако
  ctx.fillStyle = '#ffffff';
  ctx.strokeRect.apply(ctx, CLOUD_POSITION);
  ctx.fillRect.apply(ctx, CLOUD_POSITION);

  // Текст
  ctx.fillStyle = TEXT_FILL;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов: ', 120, 60);


  function getMaxValue(array) {
    var max = array[0];
    for (var i = 1; i < array.length; i++) {
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
    var barHeight = times[i] * STEP;
    var positionY = INITIAL_Y - times[i] * STEP;
    var positionX = INITIAL_X + INDENT * i;

    ctx.fillStyle = fillBarColor(names[i]);
    ctx.fillRect(positionX, positionY, BAR_WIDTH, barHeight);

    ctx.fillStyle = TEXT_FILL;
    ctx.fillText(names[i], positionX, INITIAL_Y + INDENT_NAME);
    ctx.fillText(times[i].toFixed(0), positionX, positionY - INDENT_TIME);
  }
};
