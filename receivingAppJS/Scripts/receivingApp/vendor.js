window.receivingApp.vendor = function () {
    // initializes all of the delete links in the current vendors list and wires up their AJAX post
    var initializeDeleteLink = function () {
        $('#currentVendors').on('click', '.deleteVendorLink', function (event) {
            event.preventDefault();

            var vendorId = $(this).parents('tr').data('vendorid');

            var deleteAjax = function () {
                $.ajax({
                    type: "POST",
                    url: "/Vendor/Delete",
                    data: { Id: vendorId }
                }).done(function () {
                    amplify.publish("vendorDeleted");
                });
            };
            window.receivingApp.utility.deletePopup.open("Delete this vendor?", deleteAjax);
        });
    };

    // define the current vendors grid
    var currentVendors = new window.receivingApp.currentVendorList();

    // initializes the create new link to use the vendor popup object
    var popup = new window.receivingApp.createVendorPopup(currentVendors);
    var initializeCreateNewLink = function () {
        $('#createNewVendor').on('click', function (event) {
            event.preventDefault();

            popup.openDialog();
        });
    };


    var initialize = function () {
        initializeCreateNewLink();
        initializeDeleteLink();
        currentVendors.loadGrid();
    };

    return {
        initialize: initialize,
        initializeDeleteLink: initializeDeleteLink,
        initializeCreateNewLink: initializeCreateNewLink
    };
};


window.receivingApp.createVendorPopup = function(currentVendorGrid) {
    this.title = "New Vendor";
    this.formId = "createNewVendorForm";

    // we want to force the context to be the grid that was passed in when we call update
    // otherwise we'll be referring to the dialog window
    var updateGrid = function() {
        currentVendorGrid.loadGrid()
    };

    this.createFunction = function () {
        var data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: "/Vendor/Create",
            data: data,
            context: this,
            dataType: "json"
        }).done(function (result) {
                updateGrid();

                $(this).dialog("close");
                $(this).find('input').val('');
            });
    };
};
window.receivingApp.createVendorPopup.prototype = new window.receivingApp.createObjectPopup();

window.receivingApp.currentVendorList = function () {
    var loadGrid = function() {
        $.ajax({
            url: '/Vendor/CurrentVendors',
            type: 'GET',
            context: this,
            dataType: "json"
        }).done(function (result) {
                var markup = '<table class="table" id="vendorsList"><tr><th>Name</th><th>Address 1</th><th>City</th><th>State</th><th>Zip</th><th></th></tr>';

                _.each(result, function (item) {
                    markup += '<tr data-vendorid="' + item.Id + '">' +
                        '<input type="hidden" name="id" value="' + item.Id + '" />' +
                        '<td>' + item.Name + '</td>' +
                        '<td>' + item.Address1 + '</td>' +
                        '<td>' + item.City + '</td>' +
                        '<td>' + item.State + '</td>' +
                        '<td>' + item.Zip + '</td>' +
                        '<td><a class="deleteVendorLink" href="#">Delete</a></td>' +
                        '</tr>';
                });

                markup += "</table>";

                $('#currentVendors').html(markup);
            });

    };

    amplify.subscribe("newVendorCreated", function() {
        loadGrid();
    });
    amplify.subscribe("vendorDeleted", function() {
        loadGrid();
    });

    return {
        loadGrid: loadGrid
    }
};