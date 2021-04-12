$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    if (options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.token
        },
            options.complete = function (response) {
                console.log(response)
                if (
                    response.responseJSON.status === 1 &&
                    response.responseJSON.message === '身份认证失败！'
                ) {
                    location.href = '/login.html'
                }
            }
    }
})