$(function () {
    const form = layui.form

    form.verify({
        pwd: 
        [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        samepwd:function(value){
            if (value === $('[name= oldPwd]').val()) {
                return '两次密码不能一致'
            }
        },
        repwd:function(value) {
            if(value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }

    });

    $('.layui-form').submit(function(e){
        e.preventDefault(),
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success(res){
                if(res.status !== 0) {
                    console.log(res)
                    return layui.layer.msg('更新表单失败')
                }
                layui.layer.msg('更新表单成功')
                $('.layui-form')[0].reset()            }
        })
    })
})