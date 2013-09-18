fs = require('fs');

var APPS = ['common', 'bird', 'maze', 'karel', 'turtle'];

for (var i = 0; i < APPS.length; i++) {
  var app = APPS[i];
  var root = 'i18n/' + app;
  var strings = JSON.parse(fs.readFileSync(root + '/en_us.json'));
  var descriptions = JSON.parse(fs.readFileSync(root + '/qqq.json'));
  var ids = JSON.parse(fs.readFileSync(root + '/keys.json'));
  var result = {};
  Object.keys(ids).sort().forEach(function(key) {
    // Exclude common strings from apps.
    var re = new RegExp('^' + app + '\.');
    if (app == 'common' || re.test(key.toLowerCase())) {
      // Strip off the module name.
      var subKey = key.match(/[a-zA-Z]\.(.*)/)[1];
      result[subKey] = {
        id: ids[key],
        string: strings[key],
        description: descriptions[key]
      };
    }
  });
  fs.writeFileSync(root + '/merged.json', JSON.stringify(result, null, 2));
}
