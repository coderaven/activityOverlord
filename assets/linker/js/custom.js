$('#searchbar').submit(function () {

    // Get the Login Name value and trim it
    var searchfor = $.trim($('#searchfor').val());

    // Check if empty of not
    if (searchfor  === '') {
        return false;
    }
});