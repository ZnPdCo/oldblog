var ele = $('.article_body h1, .article_body h2, .article_body h3, .article_body h4, .article_body h5, .article_body h6');
for(let i = 0; i < ele.length; i ++) {
    ele.eq(i).html(`<a href="#${ele.eq(i).prop('id')}">${ele.eq(i).html()}</a>`);
}
var title = {'H1': 1, 'H2': 2, 'H3': 3, 'H4': 4, 'H5': 5, 'H6': 6}
function dfs(i, type) {
    var e = $('<ul></ul>')
    for(; i < ele.length; i ++) {
        if(title[ele.get(i).tagName] > type) {
            var res = dfs(i, type + 1);
            i = res[0];
            e.append(res[1]);
        } else if(title[ele.get(i).tagName] == type) {
            e.append(`<li><a href="#${ele.eq(i).prop('id')}">${ele.eq(i).html()}</a></li>`)
        } else {
            return [i - 1, e];
        }
    }
    return [i - 1, e];
}
var toc = dfs(1, 1)[1]
$('.sidebar').append(toc)