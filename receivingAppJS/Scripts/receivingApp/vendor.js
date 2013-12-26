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
                        $('#vendorsList').find('tr[data-vendorid="' + vendorId + '"]').remove();
                    });
            }

            window.receivingApp.utility.deletePopup.open("Delete this vendor?", deleteAjax);
        });
    };

    // initializes the create new link to open a popup window
    var initializeCreateNewLink = function () {
        $('#createNewVendor').on('click', function () {
            $('#createNewVendorForm').dialog({
                resizable: false,
                width: 500,
                modal: true,
                title: "New Vendor",
                buttons: {
                    "Create": function () {
                        var data = $('#createNewVendorForm').serialize();
                        $.ajax({
                            type: 'POST',
                            url: '/Vendor/Create',
                            data: data,
                            context: this,
                            title: "New Vendor",
                            dataType: "json"
                        }).done(function (result) {
                                // Look at all this lovely markup
                                $('#vendorsList tbody').append('' +
                                    '<tr data-vendorid="' + result.Id + '"><input type="hidden" name="id" value="' + result.Id + '">' +
                                    '<td>' + result.Name + '</td>' +
                                    '<td>' + result.Address1 + '</td>' +
                                    '<td>' + result.City + '</td>' +
                                    '<td>' + result.State + '</td>' +
                                    '<td>' + result.Zip + '</td>' +
                                    '<td><a class="deleteVendorLink" href="#">Delete</a>' +
                                    '</form></td>');

                                $(this).dialog("close");
                                $(this).find('input').val('');
                            });

                    },
                    Cancel: function () {
                        $(this).dialog("close");
                        $(this).first('input').val('');
                    }
                }
            });
        });
    };

    // loads/reloads the current vdndors grid
    var loadCurrentVendors = function () {
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

    var initialize = function () {
        initializeCreateNewLink();
        initializeDeleteLink();
        loadCurrentVendors();
    };

    return {
        initialize: initialize,
        initializeDeleteLink: initializeDeleteLink,
        initializeCreateNewLink: initializeCreateNewLink,
        loadCurrentVendors: loadCurrentVendors,
    };
};
