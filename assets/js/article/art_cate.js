$(function () {

    getText();

    function getText() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                const htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    let index = null
    $('#btn_add').on('click', function () {
        index = layer.open({
            type: 1,
            title: '添加文章类别',
            content: $('#dialog-add').html(),
            area: ['500px', '250px']
        })
    });

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()

        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('提交失败')
                }
                layer.msg('提交成功')
                getText()
                layer.close(index)
            }
        })
    })
    const form = layui.form
    let editIndex = null
    $('tbody').on('click', '#btn-edit', function (e) {
        e.preventDefault()

        editIndex = layer.open({
            type: 1,
            title: '修改文章类别',
            content: $('#dialog-edit').html(),
            area: ['500px', '250px']
        })

        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('提交修改失败')
                }
                layer.msg('提交修改成功')
                layer.close(editIndex)
                getText()
            }
        })
    })

    $('tbody').on('click', '#btn-delete', function () {
        // e.preventDefault();
        const id = $(this).attr('data-id')
        layer.confirm('is not?', { icon: 3, title: '提示' }, function (index) {
            //do something
          $.ajax({
              type:'GET',
              url:'/my/article/deletecate/' + id,
              success(res){
                  if(res.status !== 0) {
                      return layer.msg('删除失败')
                  }
                  layer.msg('删除成功'),
                  layer.close(index)
                  getText();
              }
          })
            
        });
    })
})