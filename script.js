// word-counter
// live word and char counts as you type.

var textEl = document.getElementById("text");
var wordsEl = document.getElementById("words");
var charsEl = document.getElementById("chars");
var charsNoSpaceEl = document.getElementById("charsNoSpace");

function update() {
  var text = textEl.value;

  var chars = text.length;
  var charsNoSpace = text.replace(/\s/g, "").length;

  var wordList = text.split(/\s+/).filter(function (w) { return w.length > 0; });
  var words = wordList.length;

  wordsEl.textContent = words;
  charsEl.textContent = chars;
  charsNoSpaceEl.textContent = charsNoSpace;
}

textEl.addEventListener("input", update);
update();
