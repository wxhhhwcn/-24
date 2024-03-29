$(function () {
    const layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);

    $('#btn_img').on('click', function () {
        $('#file').click()
    })

    $('#file').on('change', function (e) {
        console.log(e)
        const files = e.target.files

        if (files.length === 0) {
            return layer.msg('未上传图片')
        }

        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    
 })
     
     $('#btn_sure').on('click',function(){
         const dataURL = $image
         .cropper('getCroppedCanvas',{
             wigth:100,
             height:100,
         })
         .toDataURL('image/png')

         $.ajax({
             type:'POST',
             url:'/my/update/avatar',
             data:{
                 avatar:dataURL
             },
             success(res){
                 if(res.status !== 0) {
                     return layer.msg('上传失败')
                 }
                 layer.msg('上传成功')
                 window.parent.star()
             }
         })
     })

})