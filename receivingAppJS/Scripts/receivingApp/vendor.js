window.receivingApp.vendor = function () {
    // initializes all of the delete links in the current vendors list and wires up their AJAX post
    var initializeDeleteLink = function () {
        $('#currentVendors').on('click', '.deleteVendorLink', function (event) {
            event.preventDefault();

            var vendorId = $(this).parents('tr').data('vendorid');

            var updateGrid = function() {
                currentVendors.loadGrid();
            }
            updateGrid = _.bind(updateGrid, this);

            var deleteAjax = function () {
                $.ajax({
                    type: "POST",
                    url: "/Vendor/Delete",
                    data: { Id: vendorId }
                }).done(function () {
                    updateGrid();
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
                var template = $('#vendorListTemplate').html();

                var markup = _.template(template, {result: result});

                $('#currentVendors').html(markup);
            });

    };

    return {
        loadGrid: loadGrid
    }
};