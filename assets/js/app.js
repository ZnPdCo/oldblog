/**
 * Tags & categories tab activation based on hash value. If hash is undefined then first tab is activated.
 */
function activateTab() {
    if (['/tags.html', '/categories.html'].indexOf(window.location.pathname) > -1) {
        var hash = decodeURIComponent(window.location.hash);
        if (hash)
            $('.tab-pane').length && $('a[href="' + hash + '"]').tab('show');
        else
            $('.tab-pane').length && $($('.cat-tag-menu li a')[0]).tab('show');
    }
}

// watch hash change and activate relevant tab
$(window).on('hashchange', activateTab);

// initial activation
activateTab();