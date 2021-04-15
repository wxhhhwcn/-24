$(function () {

    wenzhang();
    initEditor();

    function wenzhang() {
        const form = layui.form
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                layer.msg('获取成功')
                const htmls = template('tpl-cate', res)
                $('[name=cate_id]').html(htmls)
                form.render()
            }
        })
    }

    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btn_choose').on('click', function () {
        $('#one').click()
    })

    $('#one').on('change', function (e) {
        const flies = e.target.files
        console.log(flies)

        if (flies.lengeh === 0) {
            return
        }
        const newImgURL = URL.createObjectURL(flies[0])

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    const attrStar = '已存为';

    $('#save').on('click', function () {
        attrStar = '草稿'
    })

    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        const fd = new FormData(this)

        fd.append('state', attrStar)

        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                ending(fd)
            })

    })

    function ending(fd) {
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                location.href = '/article/art_list.html'
            }
        })
    }

})