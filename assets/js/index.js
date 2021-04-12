$(function () {
    star();
    // render()

    $('#btn_wx').on('click', function () {
        layer.confirm('确定退出', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)

        })
    })
})


function star() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success(res) {
            console.log(res)
            if (res.status !== 0) {
                return ('获取失败')
            }
            render(res.data)
        },
    })
}

function render(user) {
    const name = user.nickname || user.username

    $('#welcome').html('欢迎  ' + name)

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        const first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
    }
}