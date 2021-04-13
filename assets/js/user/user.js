$(function(){
    const form = layui.form;
    const layer = layui.layer
    
    
    form.verify({
        nickname : function(value){
            if (value.length > 6) {
                return '昵称不能超过6位'
            }
        }
    })

    getInfo();

    function getInfo() {
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success(res){
                if (res.status !== 0 ) {
                    return layer.msg('获取失败')
                }
                
                form.val('formUserInfo',res.data)
            }
            
        })
    }
    
    $('#btn_click').on('click',function(e){
        e.preventDefault(),
        getInfo()
    })

    $('.layui-form').on('submit',function(e){
       
        e.preventDefault(),
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !==0) {
                    return layui.msg('获取失败')
                }
                layer.msg('更新用户信息成功！')
                window.parent.star()
            }
        })
    })
})



