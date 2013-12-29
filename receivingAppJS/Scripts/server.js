(function($) {

    if (!('localStorage' in window && window['localStorage'] !== null)){
        alert('Seriously, you need a newer browser.')
    }

    // resets all the models on a page. Use this if the page is loaded for the first time or if someone needs to reset bad data
    var resetModels = function() {
        // parts
        var _parts = [];
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
                _parts.push({
                    Id: index,
                    Name: item,
                    Weight: index + 1,
                    Discontinued: !!(index % 2)
                });
            });
        parts.set(_parts);


        // vendors
        var _vendors = [];
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
                _vendors.push({
                    Id: index,
                    Address1: "1" + index + index + " Main Street",
                    City: "Sprintfield",
                    State: "IL",
                    Name: item,
                    Zip: "" + (index) + (index) + index + index + index
                })
            });
        vendors.set(_vendors);
    }

    // cheater helpers for local storage
    var parts = {
        get: function() {
            return JSON.parse(localStorage.getItem("parts"))
        },
        set: function(newParts) {
            localStorage.setItem("parts", JSON.stringify(newParts))
        }
    };
    var vendors = {
        get: function() {
            return JSON.parse(localStorage.getItem("vendors"))
        },
        set: function(newVendors) {
            localStorage.setItem("vendors", JSON.stringify(newVendors))
        }
    };

    if (parts.get() == undefined || parts.get().length == 0  || vendors.get() == undefined || vendors.get().length == 0) {
        alert("Resetting the data because an array is empty!")
        resetModels()
    }

    var dataToObject = function(dataString) {
        var result = {};
        dataString.split('&').forEach(function(item) {
            pair = item.split('=');
            // little bit of a hack to take care of +s in our fake post bodies
            result[pair[0]] = decodeURIComponent(pair[1] || '').replace(/\+/g, ' ');
        })

        return result;
    }

    $.mockjax({
        url: '/Part/DiscontinuedParts',
        response: function(settings) {
            this.responseText = _.chain(parts.get()).filter(function(part) {
                return part.Discontinued;
            }).sortBy(function(part){return part.Name}).value();
        }
    });

    $.mockjax({
        url: '/Part/CurrentParts',
        response: function(settings) {
            this.responseText = _.chain(parts.get()).filter(function(part) {
                return !part.Discontinued;
            }).sortBy(function(part){return part.Name}).value();
        }
    });

    $.mockjax({
        url: '/Part/Delete',
        response: function(settings) {
            var id = settings.data.Id;

            var allParts = parts.get();

            var partToDelete = _.find(allParts, function(item) {
                return item.Id == id;
            });

            partToDelete.Discontinued = true;

            parts.set(allParts);
        }
    });

    $.mockjax({
        url: '/Part/Create',
        response: function(settings) {
            var allParts = parts.get();

            var newPart = dataToObject(settings.data);
            var maxId = _.max(allParts, function(part) { return part.Id });
            newPart.Id = maxId + 1;
            newPart.Discontinued = false;
            allParts.push(newPart);
            this.responseText = newPart;

            parts.set(allParts);
        }
    });

    $.mockjax({
        url: '/Vendor/CurrentVendors',
        response: function(settings) {
            this.responseText = _.sortBy(vendors.get(), function(vendor){return vendor.Name});
        }
    });

    $.mockjax({
        url: '/Vendor/Delete',
        response: function(settings) {
            var allVendors = vendors.get();

            var id = settings.data.Id;
            allVendors = _.reject(allVendors, function(item) {
                return item.Id == id;
            });

            vendors.set(allVendors);
        }
    });

    $.mockjax({
        url: '/Vendor/Create',
        response: function(settings) {
            var allVendors = vendors.get();

            var newVendor = dataToObject(settings.data);
            var maxId = _.max(allVendors, function(vendor) { return vendor.Id });
            newVendor.Id = maxId + 1;
            allVendors.push(newVendor);
            this.responseText = newVendor;

            vendors.set(allVendors);
        }
    });
})($);