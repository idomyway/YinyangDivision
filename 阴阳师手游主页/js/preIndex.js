/**
 * Created by domyway on 2017/5/24.
 */

//背景
$(function () {
    var $obj = $("#bg").find(".bg01 object");
    setInterval(function () {
        $obj.css("opacity",1);
    },1000);
});
//头部导航条
$(function () {
    var $timeInt = $("#topBar").find(".content .timer ul");
    setInterval(function () {
        var top = $timeInt.css("top");
        var tempTop = parseInt(top);
        if(tempTop>-110){
            tempTop-=55;
            $timeInt.animate({
                top:tempTop
            },1000);
        }
        else {
            $timeInt.css("top",0);
            tempTop = -55;
            $timeInt.animate({
                top:tempTop
            },1000);
        }
    },2000);
});

//首屏部分
$(function () {
    var $wrap = $("#wrap");
    var $logo =$wrap.find(".wrapLogo");
    var $back =$wrap.find(".goBack");
    var $now = $wrap.find(".now");
    var $download = $wrap.find(".download");
    var $show = $wrap.find(".show");
    var $close  = $("#video").find(".close");
    var index = 0;//用于切换

    $logo.animate({
        "left":40,
        "opacity":1
    },1000);
    $back.animate({
        "right":30,
        "opacity":1
    },1000);
    $now.animate({
        "top":90,
        "opacity":1
    },1000);
    $download.animate({
        "top":620,
        "opacity":1
    },1000);
    $show.click(function () {
        $("#video").css("display","block");
        $("body").addClass("noScroll");
        $("#video #videoBox").append(
            "<object data='https://nie.res.netease.com/comm/js/nie/util/video/img/player.swf?v=2017032302' type='application/x-shockwave-flash' id='flash_519183351' width='800' height='450'>"+
            "<param name='allowFullScreen' value='true'>"+
            "<param name='allowscriptaccess' value='always'>"+
            "<param name='wmode' value='direct'><param name='bgcolor' value='#000000'>"+
            "<param name='flashvars' value='width=800&amp;height=450&amp;wmode=direct&amp;bgcolor=#000000&amp;host=yys.163.com&amp;movieUrl=https://nie.v.netease.com/nie/2017/0518/a7f3a0546e69013b5d039c988d7c458bqt.mp4&amp;HDmovieUrl=&amp;SHDmovieUrl=&amp;vtype=&amp;&amp;&amp;&amp;volume=0.8&amp;autoPlay=true&amp;&amp;loopTimes=0&amp;&amp;bufferTime=5&amp;videoIndex=0&amp;&amp;allowFullScreen=true&amp;fat='>"+
            "<param name='movie' value='https://nie.res.netease.com/comm/js/nie/util/video/img/player.swf?v=2017032302'>"+
            "<div><h4>页面需要新版Adobe Flash Player.</h4><p><a href='http://www.adobe.com/go/getflashplayer' target='_blank'>"+
            "<img width='112' height='33' alt='获取新版Flash' src='https://nie.res.netease.com/comm/js/util/swfobject/get_flash_player.gif'></a></p></div></object>");
    });
    $close.click(function () {
        $("#video").css("display","none");
        $("#video #videoBox object").remove();
        $("body").removeClass("noScroll");
    });
});

//新功能弹窗
$(function () {
    var $newVision = $("#newVision");
    var $propModel = $newVision.find(".propModel");
    var $prop =$newVision.find(".propModel ul li");
    var $close = $newVision.find(".propModel ul .newClose");
    var $contentIntro = $newVision.find(".content li");

    $prop.each(function () {
        var $txt = $(this).find(".txt");
        var $txtContent = $txt.find(".txtContent");
        var $txtScroll = $txt.find(".scroll");
        var $scrollTip = $txt.find(".scrollTip");

        var $txtContentHeight = $txtContent.height();
        var $txtHeight = $txt.height();
        var $txtScrollHeight = $txtScroll.height();
        var $scrollTipHeight = ($txtHeight/$txtContentHeight)*$txtScrollHeight;

        $scrollTip.height($scrollTipHeight );
        //滚动条
        $scrollTip.mousedown(function (e) {
            var loc = e.clientY;
            var tipTop = $(this).position().top;
            var $This = $(this);

            $(document).mousemove(function (e) {
                var moveLoc = e.clientY;
                var top = tipTop+moveLoc-loc;
                top = Math.max(0,top);
                top = Math.min(top,$txtScrollHeight-$scrollTipHeight);
                var txtTop = top/$txtScrollHeight *$txtContentHeight;
                $This.css("top",top);
                $txtContent.css("top",-txtTop);
                console.log(top/$txtScrollHeight);
            }).mouseup(function () {
                $(this).off("mousemove").off("mousemove");
            });
            return false;
        });
        //滚轮事件
        $txt.mousewheel(function (e, d) {
            var contentTop = $txtContent.position().top;
            var scrollTop = 0;
            if(d>0){
                contentTop+=10;
            }
            else {
                contentTop-=10;
            }
            contentTop = Math.min(0,contentTop);
            contentTop = Math.max(contentTop,-($txtContentHeight-$txtHeight));
            scrollTop = (-contentTop)/$txtContentHeight*$txtScrollHeight;
            $txtContent.css("top",contentTop);
            $scrollTip.css("top",scrollTop);
            return false;
        });
        //滚动条点击事件
        $txtScroll.mousedown(function (e) {
            var tempTop = e.clientY;
            //获取ul的top（这是获取top：50% margin：-xxxx的例子）
            var ulTop = $(this).parent().parent().parent().position().top - 0.5*$(this).parent().parent().parent().height();
           //这是视口到scrollTip底部的距离
            var locLength = ulTop+$(this).parent().position().top+$scrollTipHeight;
            //这是每次变化的距离
            var top = tempTop-locLength+0.5*$scrollTipHeight;
            top = Math.max(0,top);
            top = Math.min(top,$txtScrollHeight-$scrollTipHeight);
            $scrollTip.css("top",top);
            var contextTop = -(top/$txtScrollHeight*$txtContentHeight);
            $txtContent.css("top",contextTop);
        });
    });
    //关闭事件
    $close.click(function () {
        $propModel.fadeOut(500);
        $(document.body).removeClass("noScroll");
    });


    //注意如果一开始设置了display：none 南无其中的对象捕捉不到 ,多疑不先设置display：none ，而是等到全都加载完毕以后再隐藏
    $propModel.hide();
    //解决一开始加载延迟的情况
    $propModel.css("opacity",1);

    //点击显示
    $contentIntro.each(function (i) {
        $(this).click(function () {
            $(document.body).addClass("noScroll");
            $propModel.fadeIn(500);
            $prop.eq(i).show().siblings("li").hide();
            index = i;
        });
    });
// 点击切换
    $propModel.find("ul .change div").click(function () {
        if($(this).index()){
            index++;
            index = index%6;
            $prop.eq(index).fadeIn(500).siblings("li").hide();
        }
        else {
            index--;
            if(index<0){
                index = 5;
            }
            $prop.eq(index).fadeIn(500).siblings("li").hide();
        }
    });

});

//游戏特色轮播
$(function () {
    var index=0;
    var tempLi = $("#specific").find(".content .banner li");

    //点击自切换
    tempLi.click(function () {
        if($(this).index()!=index){
            index = $(this).index();
            var leftIndex = index+1;
            var rightIndex = index-1;
            leftIndex = leftIndex%5;
            if(rightIndex<0){
                rightIndex = 4;
            }
            addProtery(tempLi,index,leftIndex,rightIndex);
        }
    });
    //点击按钮切换
    var btn = $("#specific").find(".content .btn div");
    btn.click(function () {
        var leftIndex;
        var rightIndex;
        if($(this).index()){
            index++;
            index = index%5;
            leftIndex = index+1;
            rightIndex = index-1;
            leftIndex = leftIndex%5;
            if(rightIndex<0){
                rightIndex = 4;
            }
            addProtery(tempLi,index,leftIndex,rightIndex);
        }
        else {
            index--;
            if(index<0){
                index = 4;
            }

            leftIndex = index+1;
            rightIndex = index-1;
            leftIndex = leftIndex%5;
            if(rightIndex<0){
                rightIndex = 4;
            }
            addProtery(tempLi,index,leftIndex,rightIndex);
        }
    });
    //提取方法
    function addProtery(obj,index,leftIndex,rightIndex) {
        obj.removeClass();
        obj.eq(leftIndex).addClass("left");
        obj.eq(index).addClass("mid");
        obj.find("i").removeClass();
        obj.eq(index).find("i").each(function (i) {
            var str = "borderI"+(i+1);
            console.log(str)
            $(this).addClass(str);
        });
        obj.eq(rightIndex).addClass("right");
    }

});

//滑轮出发上移
$(function () {
    var initArr = new Array();
    var $newVisionTitle = $("#newVision .newVisionTitle");
    var $newVisionLi = $("#newVision .content li");
    var $specificTitle = $("#specific .specificTitle");
    var $specificLink = $("#specific .link");
    var $specificContent = $("#specific .content");
    var $footer = $("#footer .content");

    init($newVisionTitle,$newVisionLi,$specificTitle,$specificLink,$footer,$specificContent);
   $(window).scroll(function () {
       var height = $(document).scrollTop()+$(window).height();
       for(var i=0;i<initArr.length;i++){
           (function () {
               if(height>initArr[i].top){
                   var $obj = $(initArr[i]);
                   setTimeout(function () {
                       $obj.removeClass("fade");
                   },($obj.index()%3)*200);
               }
           })();
       }
   });
    //获取所有动作的元素  并且进行初始化
    function init() {
        for(var i=0; i<arguments.length;i++){
            arguments[i].each(function () {
                this.top = $(this).offset().top;//获取元素的相对于的文档的高度
                initArr.push(this);
            });
        }
    }
});





























