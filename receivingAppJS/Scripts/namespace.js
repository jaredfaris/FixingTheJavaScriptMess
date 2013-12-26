window.receivingApp = {
    part: {},
    vendor: {},
    utility: {}
};

// shorthand
var utility = window.receivingApp.utility;

utility.deletePopup = {

   open: function (title, deleteFunction) {
        $('<div><h4>Please confirm this delete.</h4></div>').dialog({
            resizable: false,
            height: 200,
            modal: true,
            title: title,
            buttons: {
                Confirm: function() {
                    deleteFunction();

                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    }
};

window.receivingApp.vendor = function () {
    // initializes all of the delete links in the current vendors list and wires up their AJAX post
    var initializeDeleteLink = function() {
        $('#currentVendors').on('click', '.deleteVendorLink', function (event) {
            event.preventDefault();

            var vendorId = $(this).parents('tr').data('vendorid');

            var deleteAjax = function () {
                $.ajax({
                    type: "POST",
                    url: "/Vendor/Delete",
                    data: { Id: vendorId }
                }).done(function () {
                    $('#vendorsList').find('tr[data-vendorid="' + vendorId + '"]').remove();
                });
            }

            window.receivingApp.utility.deletePopup.open("Delete this vendor?", deleteAjax);
        });
    };

    return {
        initializeDeleteLink: initializeDeleteLink
    };
};

window.receivingApp.part = function () {
    // initializes all of the delete links in the current parts list and wires up their AJAX post
    var initializeDeleteLink = function() {
        $('#currentParts').on('click', '.deletePartLink', function (event) {
            event.preventDefault();

            var partId = $(this).parents('tr').data('partid');

            var deleteFunction = function () {
                $.ajax({
                    type: "POST",
                    url: "/Part/Delete",
                    data: { Id: partId },
                    context: this
                }).done(function () {
                    $('#partsList').find('tr[data-partid="' + partId + '"]').remove();
                });
            }
            window.receivingApp.utility.deletePopup.open("Delete this vendor?", deleteFunction);
        });
    };

    return {
        initializeDeleteLink: initializeDeleteLink
    };
};