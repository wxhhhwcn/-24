$(function(){
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
      }
      
      template.defaults.imports.dataFormat = function(data){
           const dt = new Date()

           const y = dt.getFullYear();
           const m = dt.getMonth()+1;
           const d = dt.getDate();

           const hh = dt.getHours();
           const mm = dt.getMinutes();
           const ss = dt.getSeconds();

           return `${y}-${m}-${d} ${paddZero(hh)}:${paddZero(mm)}:${paddZero(ss)}`
      }

      function paddZero(n) {
        return n > 9? n : '0' + n
      }
      books();
      initCate();
      function books(){
          $.ajax({
              type:'GET',
              url:'/my/article/list',
              data:q,
              success(res){
                 if(res.status !== 0) {
                    console.log(res)
                     return layer.msg('获取文章列表失败')
                 }
                 
                 layer.msg('获取文章列表成功')
                 const htmlStr = template('tpl-table',res)
                 $('tbody').html(htmlStr)
                 renderPage(res.total)
              }
          })

          
      }
      
      const form = layui.form
      function initCate(){
          $.ajax({
              type:'get',
              url:'/my/article/cates',
              success(res){
                  if (res.status !== 0) {
                      return layer.msg('获取失败')
                  }
                  
                 const htStr = template('tpl-cate',res)
                
                 $('[name=cate_id]').html(htStr)
                 form.render()
              }
          })
      }

      $('#form-search').on('submit',function(e){
        e.preventDefault()
        const cate_id = $('[name=cate_id]').val()
        const state = $('[name=state]').val()

        q.cate_id = cate_id
        q.state = state
        books();
      })
      
      const laypage = layui.laypage
      function renderPage(total) {
        laypage.render({
            elem:'test1',
            count:total,
            limit:q.pagesize,
            curr:q.pagenum,
            jump:function(obj,first){
                q.pagenum = obj.curr
                q.pagesize = obj.limit

                if (!first ) {
                    books();
                }
            },
            layout:['count','prev','page','next','limit','refresh','skip'],
            limits:[2,3,4,5,6],
            
        })

        $('tbody').on('click','#btn_remove',function(){
            const many = $('#btn_remove').length
            console.log(many)
               console.log('ok')
               const id = $(this).attr('data-index')
               layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
                //do something
                $.ajax({
                    type:'GET',
                    url:'/my/article/delete/'+id,
                    success(res) {
                        if (res.status !== 0) {
                            return layer.msg('获取失败')
                        }
                        if(many === 1 && q.pagenum !== 1) {
                            q.pagenum-1
                        }
                        books()
                    }
                })
                
                layer.close(index);
              });
        })
      }
})