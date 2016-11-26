// 提交
$(function() {

    index();
    // 从后台获取数据
    function index() {
        // 发起请求
        myAjax("./api", {}, 'GET', draw, fal);
        // 成功方法
        function draw(res) {
            console.log(res);
            if (res.code === 200) {
                var data = res.data;
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    temp = "<article class='thumb'>\
	                			<a href=\'%s\' class='image'>\
	                				<img src=\'%s\' alt='' />\
	                			</a>\
	                			<h2>%s</h2>\
            				</article>"
                    html += (format(temp, [data[i].url, data[i].url, data[i].name]));
                }

                $('#main').html(html);

            }

        }
        // 失败函数
        function fal(err) {
            console.log(err);
        }

    }

    // 表单提交
    postMsg();
    function postMsg() {

        $('#submit').click(function() {
            var name = $.trim($('#name').val());
            var email = $.trim($('#email').val());
            var message = $.trim($('#message').val());

            if ($.trim(name) === '') {
                alert('用户名不能为空！');
                return false;
            }

            // 数值判断 邮箱
            email = $.trim(email).match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
            if (!email && $.trim(email) === '') {
                alert('邮箱格式不正/邮箱不能为空！');
                return false;
            }

            if ($.trim(message) === '') {
                alert('留言不能为空！');
                return false;
            }
            // 转义
            email = $.trim($('#email').val());
            name = htmlEncode(name);
            email = htmlEncode(email);
            message = htmlEncode(message);　

            var data = {
                name: name,
                email: email,
                message: message
            };

            // 提交数据
            myAjax('./v0/upUserMsg', data, 'POST', draw, fals);

            function draw(res) {
                if (res.code === 200) {
                    alert('提交成功！');
                }
            }

            function fals(err) {
                console.log('提交失败');
            }

            // 清空数据
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');
        });

    }



});
