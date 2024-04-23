(function() {

  var state = 'waiting';
  var readyButtonEl = $('#ready');
  var speakerEl = $('.speaker');
  var formEl = $('#form');
  var guessedTempoEl = $('#guessed-tempo');
  var submitButtonEl = $('#submit');
  var scoreEl = $('#score');

  var duration = "5sec";
  var bpm = -1;

  function generateRandomBpm() {
    var MIN = 40;
    var MAX = 200;
    return Math.round(MIN + Math.random() * (MAX - MIN));
  }

  function generateRandomDuration() {
    var MIN = 4;
    var MAX = 8;
    return Math.round(MIN + Math.random() * (MAX - MIN));
  }

  function playTempo() {
    var pluck = T("pluck", {freq:3800, mul:2});

    timbre.bpm = bpm;
    T("interval", {interval: "L4", timeout: duration}, function() {
      pluck.bang().play();
    }).on("ended", function() {
      this.stop();
      onPlayFinish(bpm);
    }).set({buddies:pluck}).start();
  }

  function onPlayFinish() {
    speakerEl.addClass('hidden');
    formEl.removeClass('hidden');
  }

  function onReadyClick() {
    scoreEl.addClass('hidden');
    readyButtonEl.addClass('hidden');
    speakerEl.removeClass('hidden');

    bpm = generateRandomBpm();
    duration = generateRandomDuration() + 'sec';

    playTempo();
  }

  function onSubmit(e) {
    e.preventDefault();
    formEl.addClass('hidden');

    var guessedBpm = guessedTempoEl.val();
    guessedTempoEl.val('');
    
    if(typeof guessedBpm == "string") {
      guessedBpm = parseInt(guessedBpm);
      if(isNaN(guessedBpm)) guessedBpm = 0;
    }

    scoreEl.removeClass('hidden');

    var text;
    var correct = Math.abs(guessedBpm - bpm) <= 3;
    if (correct) {
      var ex = 'Well done!';
      if (guessedBpm == bpm) ex = 'Perfect!';
      text = '<strong>' + ex + '</strong><br/>You guessed ' + guessedBpm + ', and it was ' + bpm + '.';
    } else {
      text = '<strong>Nope!</strong></br/>You guessed ' + guessedBpm + ', it was actually ' + bpm + '.';
    }

    scoreEl.html(text);

    readyButtonEl.text('Again');
    readyButtonEl.removeClass('hidden');
  }

  readyButtonEl.on('click', onReadyClick);
  submitButtonEl.on('click', onSubmit);
  formEl.on('submit', onSubmit);
})();
