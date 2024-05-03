(function ($) {

    function init() {
        /* Sidebar height set */
        $sidebarStyles = $('.sidebar').attr('style') || "";
        $sidebarStyles += ' min-height: ' + $(document).height() + 'px;';
        $('.sidebar').attr('style', $sidebarStyles);

        /* Secondary contact links */
        var $scontacts = $('#contact-list-secondary');
        var $contactList = $('#contact-list');

        $scontacts.hide();
        $contactList.mouseenter(function () { $scontacts.fadeIn(); });
        $contactList.mouseleave(function () { $scontacts.fadeOut(); });

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


        // 目录生成
        function createTOC() {
            if ($('.article_body').length == 1) {
                var ele = $('.article_body h1, .article_body h2, .article_body h3, .article_body h4, .article_body h5, .article_body h6');
                for (let i = 0; i < ele.length; i++) {
                    ele.eq(i).html(`<a href="#${ele.eq(i).prop('id')}">${ele.eq(i).html()}</a>`);
                }
                var title = { 'H1': 1, 'H2': 2, 'H3': 3, 'H4': 4, 'H5': 5, 'H6': 6 }
                function dfs(i, type) {
                    var e = $('<ul></ul>')
                    for (; i < ele.length; i++) {
                        if (title[ele.get(i).tagName] > type) {
                            var res = dfs(i, type + 1);
                            i = res[0];
                            e.append(res[1]);
                        } else if (title[ele.get(i).tagName] == type) {
                            e.append(`<li><a href="#${ele.eq(i).prop('id')}">${ele.eq(i).html()}</a></li>`)
                        } else {
                            return [i - 1, e];
                        }
                    }
                    return [i - 1, e];
                }
                var toc = dfs(0, 1)[1];
                $('.sidebar').append(`<div class="toc"></div>`);
                $('.toc').append(toc);
            }
        }
        createTOC();

        // 配置分享
        function initShare() {
            window.nativeShare = new NativeShare()
            var shareData = {
                title: document.title,
                link: location.href,
            }
            window.nativeShare.setShareData(shareData)
        }
        initShare();
    };

    // run init on document ready
    $(document).ready(init);

})(jQuery);
