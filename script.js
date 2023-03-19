// word-counter
// live stats for the textarea contents.

var textEl = document.getElementById("text");

var els = {
  words: document.getElementById("words"),
  chars: document.getElementById("chars"),
  charsNoSpace: document.getElementById("charsNoSpace"),
  sentences: document.getElementById("sentences"),
  paragraphs: document.getElementById("paragraphs"),
  longest: document.getElementById("longest"),
  avgLen: document.getElementById("avgLen"),
  readTime: document.getElementById("readTime"),
  speakTime: document.getElementById("speakTime")
};

function formatTime(seconds) {
  if (seconds < 1) return "0s";
  if (seconds < 60) return Math.round(seconds) + "s";
  var m = Math.floor(seconds / 60);
  var s = Math.round(seconds - m * 60);
  if (s === 0) return m + "m";
  return m + "m " + s + "s";
}

function update() {
  var text = textEl.value;

  var chars = text.length;
  var charsNoSpace = text.replace(/\s/g, "").length;

  var wordList = text.split(/\s+/).filter(function (w) { return w.length > 0; });
  var words = wordList.length;

  // sentences: split on . ! ? sequences
  var sentenceList = text.split(/[.!?]+/).filter(function (s) { return s.trim().length > 0; });
  var sentences = sentenceList.length;

  // paragraphs: blocks separated by blank lines
  var paraList = text.split(/\n\s*\n/).filter(function (p) { return p.trim().length > 0; });
  var paragraphs = paraList.length;

  // longest word, average length
  var longest = "";
  var totalLen = 0;
  for (var i = 0; i < wordList.length; i++) {
    var w = wordList[i].replace(/[^A-Za-z0-9'-]/g, "");
    if (w.length > longest.length) longest = w;
    totalLen += w.length;
  }
  var avgLen = words > 0 ? (totalLen / words) : 0;

  // reading and speaking time
  var readSec = (words / 200) * 60;
  var speakSec = (words / 130) * 60;

  els.words.textContent = words;
  els.chars.textContent = chars;
  els.charsNoSpace.textContent = charsNoSpace;
  els.sentences.textContent = sentences;
  els.paragraphs.textContent = paragraphs;
  els.longest.textContent = longest || "-";
  els.avgLen.textContent = avgLen.toFixed(1);
  els.readTime.textContent = formatTime(readSec);
  els.speakTime.textContent = formatTime(speakSec);
}

textEl.addEventListener("input", update);
update();
