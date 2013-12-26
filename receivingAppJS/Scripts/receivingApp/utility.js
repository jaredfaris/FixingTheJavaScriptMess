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



