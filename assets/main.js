document.querySelectorAll('[data-menu]').forEach(function (b) {
  b.addEventListener('click', function () { document.body.classList.toggle('menu-open'); });
});
document.querySelectorAll('.mnav a').forEach(function (a) {
  a.addEventListener('click', function () { document.body.classList.remove('menu-open'); });
});

function openTab(id, scroll) {
  var panel = document.getElementById(id);
  if (!panel || !panel.classList.contains('tab-panel')) return;
  document.querySelectorAll('.tab-panel').forEach(function (p) { p.hidden = p !== panel; });
  document.querySelectorAll('.tab[data-tab]').forEach(function (t) {
    var on = t.dataset.tab === id;
    t.classList.toggle('on', on);
    t.setAttribute('aria-selected', on);
    if (on) t.parentNode.scrollLeft = t.offsetLeft - 16;
  });
  if (scroll) document.getElementById('secteurs').scrollIntoView({ behavior: 'smooth' });
}
document.querySelectorAll('.tab[data-tab]').forEach(function (t) {
  t.addEventListener('click', function () {
    openTab(t.dataset.tab, false);
    history.replaceState(null, '', '#' + t.dataset.tab);
  });
});
document.querySelectorAll('[data-goto]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    openTab(a.dataset.goto, true);
    history.replaceState(null, '', '#' + a.dataset.goto);
  });
});
if (location.hash.indexOf('#s-') === 0) openTab(location.hash.slice(1), true);
window.addEventListener('hashchange', function () {
  if (location.hash.indexOf('#s-') === 0) openTab(location.hash.slice(1), true);
});
