(function() {
    var parts = [];

    var fakeItems = [
        "Anchor",
        "Bottle",
        "Bigger Hammer",
        "Cog",
        "Everburning Torch",
        "Hammer",
        "Really Big Hammer",
        "Screwdriver",
        "Super Big Hammer",
        "Unstoppable Hammer"
    ];

    var getIdFromUrl = function(url) {
        return url.split('/').pop();
    }

    // do we need to clone data as it goes through mockjax?

    fakeItems.forEach(function(item, index) {
       parts.push({
           id: index,
           name: item,
           weight: index * 2
       });
    });

    $.mockjax({
        url: '/part/',
        response: function(settings) {
            this.responseText = parts;
        }
    });

    $.mockjax({
        url: '/part/create',
        response: function(settings) {
            parts.push(settings.data);
            this.responseText = "ok";
        }
    });

    $.mockjax({
        url: '/part/edit/*',
        response: function(settings) {
            this.responseText = "ok";
        }
    });

    $.mockjax({
        url: '/part/delete/*',
        response: function(settings) {
            var id = getIdFromUrl(settings.url);
            parts = _.reject(parts, function(item) {
                return item.id == id;
            });
            this.responseText = "ok";
        }
    })

    $.mockjax({
        url: '/api/hello',
        responseText: {
            status: 'okay',
            response: 'hello'
        }
    });

})();