// word-counter
// live stats for whatever text is in the textarea.
// flesch reading ease uses a syllable estimator based on vowel groups.

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
  speakTime: document.getElementById("speakTime"),
  flesch: document.getElementById("flesch"),
  fleschNote: document.getElementById("fleschNote")
};

function countSyllables(word) {
  // strip non-letters, lowercase
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!word) return 0;

  // count vowel groups
  var groups = word.match(/[aeiouy]+/g);
  var count = groups ? groups.length : 0;

  // drop trailing silent e (but keep "le" endings like "able")
  if (word.length > 2 && word.slice(-1) === "e" && word.slice(-2) !== "le") {
    var stripped = word.slice(0, -1);
    if (/[aeiouy]/.test(stripped)) count--;
  }

  // every word has at least one syllable
  if (count < 1) count = 1;
  return count;
}

function formatTime(seconds) {
  if (seconds < 1) return "0s";
  if (seconds < 60) return Math.round(seconds) + "s";
  var m = Math.floor(seconds / 60);
  var s = Math.round(seconds - m * 60);
  if (s === 0) return m + "m";
  return m + "m " + s + "s";
}

function fleschLabel(score) {
  if (score >= 90) return "very easy";
  if (score >= 80) return "easy";
  if (score >= 70) return "fairly easy";
  if (score >= 60) return "plain english";
  if (score >= 50) return "fairly difficult";
  if (score >= 30) return "difficult";
  return "very difficult";
}

function update() {
  var text = textEl.value;

  var chars = text.length;
  var charsNoSpace = text.replace(/\s/g, "").length;

  var wordList = text.split(/\s+/).filter(function (w) { return w.length > 0; });
  var words = wordList.length;

  var sentenceList = text.split(/[.!?]+/).filter(function (s) { return s.trim().length > 0; });
  var sentences = sentenceList.length;

  var paraList = text.split(/\n\s*\n/).filter(function (p) { return p.trim().length > 0; });
  var paragraphs = paraList.length;

  var longest = "";
  var totalLen = 0;
  for (var i = 0; i < wordList.length; i++) {
    var w = wordList[i].replace(/[^A-Za-z0-9'-]/g, "");
    if (w.length > longest.length) longest = w;
    totalLen += w.length;
  }
  var avgLen = words > 0 ? (totalLen / words) : 0;

  var readSec = (words / 200) * 60;
  var speakSec = (words / 130) * 60;

  // flesch reading ease
  // 206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words)
  var totalSyll = 0;
  for (var j = 0; j < wordList.length; j++) {
    totalSyll += countSyllables(wordList[j]);
  }

  var flesch = null;
  if (words > 0 && sentences > 0) {
    flesch = 206.835 - 1.015 * (words / sentences) - 84.6 * (totalSyll / words);
  }

  els.words.textContent = words;
  els.chars.textContent = chars;
  els.charsNoSpace.textContent = charsNoSpace;
  els.sentences.textContent = sentences;
  els.paragraphs.textContent = paragraphs;
  els.longest.textContent = longest || "-";
  els.avgLen.textContent = avgLen.toFixed(1);
  els.readTime.textContent = formatTime(readSec);
  els.speakTime.textContent = formatTime(speakSec);

  if (flesch === null) {
    els.flesch.textContent = "-";
    els.fleschNote.textContent = "";
  } else {
    els.flesch.textContent = flesch.toFixed(1);
    els.fleschNote.textContent = fleschLabel(flesch);
  }
}

textEl.addEventListener("input", update);
update();
