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

window.receivingApp.createObjectPopup = function () {
    this.openDialog = function() {
        $('#' + this.formId).dialog({
            resizable: false,
            width: 500,
            modal: true,
            title: this.title,
            buttons: {
                "Create": this.createFunction,
                Cancel: function () {
                    $(this).dialog("close");
                    $(this).first('input').val('');
                }
            }
        });

    }
};

