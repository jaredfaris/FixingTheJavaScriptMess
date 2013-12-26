(function($) {
    // parts
    var parts = [];
    [
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
    ].forEach(function(item, index) {
        parts.push({
            Id: index,
            Name: item,
            Weight: index + 1,
            Discontinued: !!(index % 2)
        });
    });

    var getIdFromUrl = function(url) {
        return url.split('/').pop();
    }

    $.mockjax({
        url: '/Part/DiscontinuedParts',
        response: function(settings) {
            this.responseText = _.filter(parts, function(part) {
                return part.Discontinued;
            })
        }
    });

    $.mockjax({
        url: '/Part/CurrentParts',
        response: function(settings) {
            this.responseText = _.filter(parts, function(part) {
                return !part.Discontinued;
            })
        }
    });

    $.mockjax({
        url: '/Part/Delete',
        response: function(settings) {
            var id = settings.data.Id;
            parts = _.reject(parts, function(item) {
                return item.id == id;
            });
        }
    });
})($);