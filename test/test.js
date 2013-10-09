var path = require('path');
var fs = require('fs');
var assert = require('chai').assert;

//TODO: Validate that solutions match their puzzle's toolbox.

['maze', 'turtle'].forEach(function(app) {
  describe(app + ' levels', function() {

    var levels = require('../build/js/' + app + '/levels');
    Object.keys(levels).forEach(function(levelId) {

      var xmlPath = path.join(__dirname, 'solutions', app, levelId + '.xml');
      var description = 'level ' + levelId + ' solution';

      if (fs.existsSync(xmlPath)) {
        it(description, function() {
          var xml = fs.readFileSync(xmlPath, 'utf8');
          //TODO: Run solution and validate success
          assert(false);
        });
      } else {
        // Treat missing solutions as pending, not failing.
        it(description);
      }

    });

  });
});
