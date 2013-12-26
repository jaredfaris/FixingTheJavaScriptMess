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

    // vendors
    var vendors = [];
    [
        "Acme",
        "Bob's Hardware",
        "CogCo",
        "DisIsAFakeName",
        "Emeryville Supply",
        "Fakestown Indisutrial",
        "Great Company LTD",
        "Having trouble coming up with more fake names INC",
        "IM Nearly Out of Ideas Co",
        "My Fake Company"
    ].forEach(function(item, index) {
        vendors.push({
            Id: index,
            Address1: "1" + index + index + " Main Street",
            City: "Sprintfield",
            State: "IL",
            Name: item,
            Zip: "" + (index) + (index) + index + index + index
        })
    });

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

            var partToDelete = _.find(parts, function(item) {
                return item.Id == id;
            });

            partToDelete.Discontinued = true;
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
    });

    $.mockjax({
        url: '/Vendor/CurrentVendors',
        response: function(settings) {
            this.responseText = vendors;
        }
    });

    $.mockjax({
        url: '/Vendor/Delete',
        response: function(settings) {
            var id = settings.data.Id;
            vendors = _.reject(vendors, function(item) {
                return item.Id == id;
            });
        }
    });

    $.mockjax({
        url: '/Vendor/Create',
        response: function(settings) {
            var newVendor = dataToObject(settings.data);
            var maxId = _.max(vendors, function(vendor) { return vendor.Id });
            newVendor.Id = maxId + 1;
            vendors.push(newVendor);
            this.responseText = newVendor;
        }
    });
})($);