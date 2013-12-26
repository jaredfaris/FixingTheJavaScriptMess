window.receivingApp.part = function () {
    // initializes all of the delete links in the current parts list and wires up their AJAX post
    var initializeDeleteLink = function () {
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

    // initializes the create new link to open a popup window
    var initializeCreateNewLink = function () {
        $('#createNewPart').on('click', function () {

        });

        // load the current parts at page load
        $.ajax({
            url: '/Part/CurrentParts',
            type: 'GET',
            context: this,
            dataType: "json"
        }).done(function (result) {
                var markup = '<table class="table" id="partsList"><tr><th>Name</th><th>Weight</th><th></th></tr>';

                _.each(result, function (item) {
                    markup += "<tr data-partid=\"" + item.Id + "\">" +
                        "<input type=\"hidden\" class=\"partId\" value=\"" + item.Id + "\"/>" +
                        "<td>" + item.Name + "</td>" +
                        "<td>" + item.Weight + "</td>" +
                        "<td><a class=\"deletePartLink\" href=\"#\">Delete</a></td></tr>";
                });

                markup += "</table>";

                $('#currentParts').html(markup);
            });
    }

    var toggleDiscontinuedParts = function () {

    }

    return {
        initializeDeleteLink: initializeDeleteLink,
        initializeCreateNewLink: initializeCreateNewLink
    };
};