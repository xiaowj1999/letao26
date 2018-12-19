$(function() {
    /*	1. 用户信息渲染
    		1. 请求用户信息的API /user/queryUser
    		2. 创建用户表格的模板
    		3. 渲染页面*/
    queryUser();

    /*2. 用户操作功能
    	1. 点击了禁用或者启用按钮进行操作 改变当前用户的状态
    	2. isDelete == 0 表示 已禁用 isDelete == 1 表示 已启用
    	3. 获取当前点击的用户的 isDelete的值  如果是0 改成 如果是1 改成0
    	4. 修改完后调用API去更新用户状态
    	5. 更新完成后重新查询刷新页面*/
    // 1. 给所有操作按钮添加点击事件
    $('.message').on('click', '.btn-option', function() {
        // 2. 获取当前点击操作按钮的用户状态和id
        var id = $(this).data('id');
        var isDelete = $(this).data('is-delete');
        // 3. 更新状态 如果是0 变成1  如果是1 变为0
        isDelete = isDelete == 0 ? 1 : 0;
        console.log(isDelete);
        // 4. 更新标签自定义属性的值  jquery变化的不是标签上能够看到的属性 而是JS属性
        $(this).data('is-delete', isDelete);
        // 5. 调用API更新
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: { id: id, isDelete: isDelete },
            success: function(data) {
                console.log(data);
                queryUser();
            }
        })
    });

    function queryUser() {
        $.ajax({
            url: '/user/queryUser',
            data: { page: 1, pageSize: 10 },
            success: function(data) {
                console.log(data);
                var html = template('userTpl', data);
                $('.message tbody').html(html);
            }
        });
    }
})
