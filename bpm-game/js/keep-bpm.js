(function() {
  var beatTimes = [];
  var countDown = 10;

  var buttonEl = $('#button');
  var countDownEl = $('#count-down');
  var targetBpmEl = $('#target-bpm');

  var targetBpm = -1;

  function generateTargetBpm() {
    var MIN = 30;
    var MAX = 200;
    return Math.round(MIN + Math.random() * (MAX - MIN));
  }

  function renderCountDown() {
    var text = 'Click ' + countDown + ' times more';
    if (countDown === 10) {
      text = 'Click ' + countDown + ' times';
    }
    countDownEl.text(text);
  }

  function calcBpm() {
    diffs = [];

    _.reduce(_.rest(beatTimes, 1), function(prev, curr) {
      diffs.push(curr - prev);
      return curr;
    }, beatTimes[0]);

    var MS_PER_MIN = 60000;

    var bpms = _.map(diffs, function(diff) {
      return MS_PER_MIN / diff;
    });

    var sumBpm = _.reduce(bpms, function(memo, x) { return memo + x; }, 0);
    var avgBpm = Math.round(sumBpm / bpms.length);

    var targetDiff = MS_PER_MIN / targetBpm;
    diffsAgainstTargetDiff = _.map(diffs, function(diff) {
      return Math.round(diff - targetDiff);
    });

    return {
      avg: avgBpm,
      bpmDiffs: diffsAgainstTargetDiff
    };
  }

  function renderBpm() {
    var bpm = calcBpm();

    var ex = 'Nope!';
    var text = 'Your BPM was ' + bpm.avg;

    var correct = Math.abs(targetBpm - bpm.avg) <= 3;

    if (correct) {
      ex = 'Well done!';
      if (targetBpm == bpm.avg) ex = 'Perfect!';
    }

    text = '<strong>' + ex + '</strong></br/>' + text;

    var bpmDiffs = _.map(bpm.bpmDiffs, function(bpmDiff) {
      if (bpmDiff < 0) return bpmDiff + 'ms';
      return '+' + bpmDiff + 'ms';
    });
    text += '<br/><small>' + _.first(bpmDiffs, 5) + '<br/>' + _.rest(bpmDiffs, 5) + '</small>';

    countDownEl.html(text);

    buttonEl.text('Again');

    buttonEl.prop('disabled', true);
    buttonEl.addClass('disabled');
    setTimeout(function() {
      buttonEl.prop('disabled', false);
      buttonEl.removeClass('disabled');
    }, 1500);
  }

  function reset() {
    beatTimes = [];
    countDown = 10;
    buttonEl.text('Play!');
    renderCountDown();

    targetBpm = generateTargetBpm();
    targetBpmEl.html('Target:<br/>' + targetBpm + ' BPM');
  }

  function onPlayClick() {
    if (countDown === 0) return reset();

    beatTimes.push(new Date());
    countDown -= 1;

    if (countDown > 0) {
      renderCountDown();
    } else {
      renderBpm();
    }
  }

  buttonEl.on('click', onPlayClick);

  reset();
})();
