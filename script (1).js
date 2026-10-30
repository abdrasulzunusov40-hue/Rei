// Контакты для заявок. Меняйте только здесь.
var WA = '996509037902';                 // номер WhatsApp без плюса
var MAIL = 'kudaikulov006@gmail.com';    // почта для заявок
// Калькулятор стоимости ремонта
var a = document.getElementById('area'),
    k = document.getElementById('kind'),
    s = document.getElementById('sum');

function calc() {
  var v = Math.max(0, +a.value || 0) * (+k.value);
  s.textContent = v ? '≈ ' + v.toLocaleString('ru-RU') + ' сом' : '—';
}
a.oninput = k.onchange = calc;
calc();

document.getElementById('usecalc').onclick = function () {
  var t = document.querySelector('#lead [name=t]');
  t.value = 'Площадь ' + a.value + ' м², ' + k.options[k.selectedIndex].text.toLowerCase() +
            ' ремонт, примерно ' + s.textContent;
  document.getElementById('zayavka').scrollIntoView();
};
// Форма заявки: проверка телефона и отправка через WhatsApp или почту
function send(f, b) {
  var st = document.getElementById('st');
  if (f.p.value.replace(/\D/g, '').length < 10) {
    st.textContent = 'Проверьте телефон: нужно минимум 10 цифр.';
    f.p.focus();
    return;
  }
  var wa = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(b);
  var mail = 'mailto:' + MAIL + '?subject=' + encodeURIComponent('Заявка на замер') +
             '&body=' + encodeURIComponent(b);
  st.textContent = 'Открываю WhatsApp, нажмите «Отправить» в чате. Если не открылся, выберите способ: ';
  [['WhatsApp', wa], ['почта', mail]].forEach(function (x, i) {
    var l = document.createElement('a');
    l.href = x[1]; l.textContent = x[0]; l.target = '_blank'; l.rel = 'noopener';
    if (i) st.append(' или ');
    st.append(l);
  });
  window.open(wa, '_blank', 'noopener');
  f.reset();
}

document.getElementById('lead').addEventListener('submit', function (e) {
  e.preventDefault();
  var f = e.target;
  var b = 'Имя: ' + f.n.value + '\nТелефон: ' + f.p.value + '\nАдрес и площадь: ' + f.t.value;
  send(f, b);
});
