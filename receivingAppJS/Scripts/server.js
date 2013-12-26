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

    var dataToObject = function(dataString) {
        var result = {};
        dataString.split('&').forEach(function(item) {
            pair = item.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        })

        return result;
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

    $.mockjax({
        url: '/Part/Create',
        response: function(settings) {
            var newPart = dataToObject(settings.data);
            var maxId = _.max(parts, function(part) { return part.Id });
            newPart.Id = maxId + 1;
            newPart.Discontinued = false;
            parts.push(newPart);
            this.responseText = newPart;
        }
    })
})($);