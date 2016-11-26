(function($) {

    skel.breakpoints({
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 980px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)'
    });



    // ajax 方法封装 需要配合jQuery使用
    // URL 链接地址
    // data 提交的数据
    // method 提交的方法
    // fun1 成功后执行的方法
    // fun2 失败后执行的方法

    function myAjax(url, data, method, func1, func2) {

        var handle_error = function(jqXHR, textStatus) {
            // ajax 调用出错处理
            if (jqXHR.state() == "resolved") {
                console.log('error');
                func2();
                return;
            }
            func2();
        };
        $.ajax({
            url: url,
            data: data,
            method: method,
            success: func1,
            error: handle_error,
            dataType: 'json',
        });
    }

    // 字符串格式化
    function format(template, s) {
        // 使JS字符串可以使用%s
        // format('%s %s' ,['hello', 'world'])
        // "hello world"
        var r = "%s";

        while (template.indexOf(r) != -1) {
            template = template.replace(/\%s/, s.shift(), 1);
        }
        if (s.length != 0) {
            console.log('error, the template not match ');
            return;
        }
        return template;
    }


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

    index();



    $(function() {

        var $window = $(window),
            $body = $('body'),
            $wrapper = $('#wrapper');

        // Hack: Enable IE workarounds.
        if (skel.vars.IEVersion < 12)
            $body.addClass('ie');

        // Touch?
        if (skel.vars.mobile)
            $body.addClass('touch');

        // Transitions supported?
        if (skel.canUse('transition')) {

            // Add (and later, on load, remove) "loading" class.
            $body.addClass('loading');

            $window.on('load', function() {
                window.setTimeout(function() {
                    $body.removeClass('loading');
                }, 100);
            });

            // Prevent transitions/animations on resize.
            var resizeTimeout;

            $window.on('resize', function() {

                window.clearTimeout(resizeTimeout);

                $body.addClass('resizing');

                resizeTimeout = window.setTimeout(function() {
                    $body.removeClass('resizing');
                }, 100);

            });

        }

        // Scroll back to top.
        $window.scrollTop(0);

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Panels.
        var $panels = $('.panel');

        $panels.each(function() {

            var $this = $(this),
                $toggles = $('[href="#' + $this.attr('id') + '"]'),
                $closer = $('<div class="closer" />').appendTo($this);

            // Closer.
            $closer
                .on('click', function(event) {
                    $this.trigger('---hide');
                });

            // Events.
            $this
                .on('click', function(event) {
                    event.stopPropagation();
                })
                .on('---toggle', function() {

                    if ($this.hasClass('active'))
                        $this.triggerHandler('---hide');
                    else
                        $this.triggerHandler('---show');

                })
                .on('---show', function() {

                    // Hide other content.
                    if ($body.hasClass('content-active'))
                        $panels.trigger('---hide');

                    // Activate content, toggles.
                    $this.addClass('active');
                    $toggles.addClass('active');

                    // Activate body.
                    $body.addClass('content-active');

                })
                .on('---hide', function() {

                    // Deactivate content, toggles.
                    $this.removeClass('active');
                    $toggles.removeClass('active');

                    // Deactivate body.
                    $body.removeClass('content-active');

                });

            // Toggles.
            $toggles
                .removeAttr('href')
                .css('cursor', 'pointer')
                .on('click', function(event) {

                    event.preventDefault();
                    event.stopPropagation();

                    $this.trigger('---toggle');

                });

        });

        // Global events.
        $body
            .on('click', function(event) {

                if ($body.hasClass('content-active')) {

                    event.preventDefault();
                    event.stopPropagation();

                    $panels.trigger('---hide');

                }

            });

        $window
            .on('keyup', function(event) {

                if (event.keyCode == 27 && $body.hasClass('content-active')) {

                    event.preventDefault();
                    event.stopPropagation();

                    $panels.trigger('---hide');

                }

            });

        // Header.
        var $header = $('#header');

        // Links.
        $header.find('a').each(function() {

            var $this = $(this),
                href = $this.attr('href');

            // Internal link? Skip.
            if (!href || href.charAt(0) == '#')
                return;

            // Redirect on click.
            $this
                .removeAttr('href')
                .css('cursor', 'pointer')
                .on('click', function(event) {

                    event.preventDefault();
                    event.stopPropagation();

                    window.location.href = href;

                });

        });

        // Footer.
        var $footer = $('#footer');

        // Copyright.
        // This basically just moves the copyright line to the end of the *last* sibling of its current parent
        // when the "medium" breakpoint activates, and moves it back when it deactivates.
        $footer.find('.copyright').each(function() {

            var $this = $(this),
                $parent = $this.parent(),
                $lastParent = $parent.parent().children().last();

            skel
                .on('+medium', function() {
                    $this.appendTo($lastParent);
                })
                .on('-medium', function() {
                    $this.appendTo($parent);
                });

        });



    });



})(jQuery);
