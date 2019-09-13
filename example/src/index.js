const yaml = require('js-yaml');

$(document).ready(function () {
  jQuery.get('zh-TW.yml', (result) => getData(result));
});

function getData(result) {
  window.data = yaml.safeLoad(result);
}
