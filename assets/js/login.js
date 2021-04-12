$(function(){
    $('#link_reg').on('click',function(){
        $('.reg-box').show()
        $('.login-box').hide()
    })

    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    const form = layui.form;
    const msg = layui.msg
    form.verify({
        pwd:[/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd:function(value) {
            const pwd = $('.reg-box [name=password]').val()

            if(value !== pwd) {
                return '两次输入的不一致'
            }
        }
    })

    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
          }
        //   console.log(data)
        $.post('/api/reguser',data,function(res){
            if (res.status !== 0) {
               return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            $('#link_login').click()
        })
    })

    $('#form_login').submit(function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success(res){
                if(res.status !== 0) {
                    return layer.msg('登录失败')
                }
                 layer.msg('登陆成功')
                 localStorage.setItem('token',res.token)
                 location.href='/index.html'
            }
        })
    })
})