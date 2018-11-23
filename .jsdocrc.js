'use strict';

module.exports = {
  "source": {
    "include": ["./src"],
    "includePattern": ".+\\.js(doc|x)?$",
    "excludePattern": "(^|\\/|\\\\)_"
  },
  "opts": {
    "template": "node_modules/docdash",
    "destination": "./docs/"
  }
}