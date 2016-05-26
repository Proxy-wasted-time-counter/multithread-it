"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (id) {
  return caches.open(id).then(function (cache) {
    return {
      setItem: function setItem(key, data) {
        return cache.put(key, new Response(JSON.stringify(data)));
      },
      getItem: function getItem(key) {
        return cache.match(key).then(function (res) {
          return res && res.text().then(JSON.parse);
        });
      }
    };
  });
};