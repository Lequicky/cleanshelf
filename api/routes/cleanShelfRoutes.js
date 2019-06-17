'use strict';
module.exports = function(app) {
  var cleanShelf = require('../controllers/cleanShelfController');


  app.route('/stories')
    .get(cleanShelf.stories);


};
