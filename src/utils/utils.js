import { nanoid } from "nanoid";

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function decodeEntity(inputStr) {
  var textarea = document.createElement("textarea");
  textarea.innerHTML = inputStr;
  return textarea.value;
}



export { decodeEntity, shuffleArray };
