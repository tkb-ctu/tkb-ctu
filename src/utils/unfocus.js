export default function unfocus() {
  var tmp = document.createElement('input');
  document.body.appendChild(tmp);
  tmp.focus();
  document.body.removeChild(tmp);
}
