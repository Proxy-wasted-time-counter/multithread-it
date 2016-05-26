
export default function(id) {
  return caches.open(id)
  .then(function(cache) {
    return {
      setItem: function(key, data) {
        return cache.put(key, new Response(JSON.stringify(data)));
      },
      getItem: function(key) {
        return cache.match(key)
          .then(function(res) {
            return res && res.text().then(JSON.parse);
          });
      }
    };
  });
}
