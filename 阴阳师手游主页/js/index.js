/**
 * Created by domyway on 2017/6/3.
 */
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

//banner nav
$(function () {
    // nav宽度的初始化以及nav的变化
    var widthTemp = $(window).width();
    var rightLi = $("#banner .nav ul.navLine .rightLi ");
    var navExpan = rightLi.find(".navExpan");
    var newLink =  rightLi.find(".subNav .newLink");
    navExpan.css("width", widthTemp);
    newLink.css("width", widthTemp);


    $(window).scroll(function () {
        if($(document).scrollTop()>50){
            $("#banner .nav ").addClass("fix");
            $("#banner .nav ul.navLine li").removeClass("hide");
            $(" #banner .nav ul.fixLogo").fadeIn();
            $("#banner .nav .background").stop().animate({
                opacity:0.8
            },300);
            $("#banner .logoLeftTop").addClass("shrank");
        }
        if($(document).scrollTop()<50){
            $("#banner .nav ").removeClass("fix");
            $("#banner .nav ul.navLine li").eq(2).addClass("hide");
            $("#banner .nav ul.navLine li").eq(3).addClass("hide");
            $(" #banner .nav ul.fixLogo").fadeOut();
            $("#banner .nav .background").stop().animate({
                opacity:0
            },300);
            $("#banner .logoLeftTop").removeClass("shrank");
        }
    });

    //最后两个扩展
    rightLi.hover(function () {
        if($(document).scrollTop()<50){
            $("#banner .nav .background").stop().animate({
                opacity:0.8
            },300);
        }
        navExpan.stop().slideDown();
    }, function () {
        if($(document).scrollTop()<50){
            $("#banner .nav .background").stop().animate({
                opacity:0
            },300);
        }
        navExpan.stop().slideUp();
    });

    //
    $(" #banner .nav ul.navLine .rightLi .subNav").hover(function () {
        $(this).find(".newLink").stop().fadeIn(600);
    },function () {
        $(this).find(".newLink").stop().fadeOut(300);
    });

    $("#banner .logoLeftTop").delay(500).animate({
        left:40,
        opacity:1
    },1000)
});

//banner change

//animate取消队列
$(function () {
    var change = $("#banner .change");
    var role = change.find(".role");
    var changeBtn = change.find(".changeBtn");
    var index = 0;
    role.eq(0).addClass("show");
    role.eq(1).addClass("show");
    changeBtn.click(function () {
        role.stop(true,false);
        index++;
        if(index%2!=0){
            role.eq(0).removeClass("show");
            role.eq(1).removeClass("show");
            role.eq(2).delay(1300).queue(function () {
                $(this).addClass("show");
            });
            role.eq(3).delay(1300).queue(function () {
                $(this).addClass("show");
            });
        }else {
            role.eq(2).removeClass("show");
            role.eq(3).removeClass("show");
            role.eq(0).delay(1300).queue(function () {
                $(this).addClass("show");
            });
            role.eq(1).delay(1300).queue(function () {
                $(this).addClass("show");
            });
        }
    });
});

//server
//由一点缩放的效果
$(function () {
   $("#banner .changeWrap .bunny").click(function () {
       $("#server").fadeIn();
       $("#server .serverBox").addClass("evident");
   });
   $("#server .serverBox .serverListBox .return").click(function () {
       $("#server").fadeOut();
       $("#server .serverBox").removeClass("evident");
   });

});

//download
$(function () {
    $("#side .download .downBox .leftBox .shift").click(function () {
        $("#side .download").css({
            left:-43,
            width:340
        });
        $(this).stop().delay(300).hide();
        $("#side .download .downBox .leftBox .saoMa").stop().delay(600).show();
    });
    $("#side .download .downBox .leftBox .saoMa").click(function () {
        $("#side .download").css({
            left:-390,
            width:390
    });
        $(this).stop().delay(300).hide();
        $("#side .download .downBox .leftBox .shift").stop().delay(600).show();
    });

});

//section
$(function () {
    var sectionWrap = $("#sectionWrap");
    var banner = sectionWrap.find(".section .bannerBox ul.banner");
    var tab = sectionWrap.find(".section .bannerBox .bannerTab li");
    var contentTitle = sectionWrap.find(".section .contentBox ul.titleList li");
    var bannerIndex = 0;
    var shiftLeft = 0;
    var tabList = 0;
    var contentList = 0;
    var bannerInterval;

    //自动轮播
    bannerLunbo();
    //banner悬停出发函数
    banner.hover(function () {
        clearInterval(bannerInterval);
    },function () {
        bannerLunbo();
    });
    //tab触发函数
    tab.hover(function () {
        clearInterval(bannerInterval);
        tab.removeClass("bg");

        tabList = $(this).index();
        tab.eq(tabList).addClass("bg");
        bannerIndex = $(this).index();
        shiftLeft = -bannerIndex*360;
        banner.stop().animate({
            left:shiftLeft
        },500);
    },function () {
        bannerLunbo();
    });
    //轮播函数
    function bannerLunbo() {
        bannerInterval= setInterval(function () {
            bannerIndex++;
            tabList++;
            if(bannerIndex===6){
                bannerIndex =1;
                banner.css("left",0);
            }
            if(tabList ===5){
                tabList = 0;
            }
            tab.removeClass("bg");
            tab.eq(tabList).addClass("bg");

            shiftLeft = -bannerIndex*360;
            banner.animate({
                left:shiftLeft
            },500);
        },2000);
    }

    //content悬停触发函数
    contentTitle.hover(function () {
        contentTitle.find("a .shiftBg").removeClass("show");
        $(this).find("a .shiftBg").addClass("show");
        contentList = $(this).index();
        var tempLeft = -contentList*500;
        $("#sectionWrap").find(".section .contentBox .contentList ul.contentWrap").css("left",tempLeft);
    })
});

//strategy
$(function () {

    var strategy = $("#strategy");
    var title = strategy.find(".strategyWrap ul.wrapTitle li");
    var shiShenContentTitle = strategy.find(".strategyWrap .content .shiShenContent ul li").last().prevAll();
    var roleContain = strategy.find(".strategyWrap .content .shiShenContent .shiftContent .roleContain");

    //左右按钮
    var shiftRightBtn = strategy.find(".strategyWrap .content .shiShenContent .roleContain .turn  .turnRight");
    var shiftLeftBtn = strategy.find(".strategyWrap .content .shiShenContent .roleContain .turn  .turnLeft");
    var wrap = strategy.find(".strategyWrap .wrap");

    var tempShift = 0;
    var shiftNum = 0;

    title.click(function () {
        title.find(".moveBg").removeClass("show");
        $(this).find(".moveBg").addClass("show");
        wrap.fadeOut();
        wrap.eq($(this).index(".shiftBanner")).fadeIn();
    });






    //加载role
    var wrapUl = strategy.find(".strategyWrap .content .shiftContent ul");
    var shiShenTitle = strategy.find(".strategyWrap .content .shiShenContent ul.shiShenTitle li");
    var $allRole = strategy.find(".strategyWrap .content .shiftContent .allRole");
    var $SSRRole = strategy.find(".strategyWrap .content .shiftContent .SSRRole");
    var $SRRole = strategy.find(".strategyWrap .content .shiftContent .SRRole");
    var $RRole = strategy.find(".strategyWrap .content .shiftContent .RRole");
    var $NRole = strategy.find(".strategyWrap .content .shiftContent .NRole");


    $.ajax({
        type :"post",
        async :true,
        url :"data/strategyLink.txt",
        dataType: "json",
        success: function (data) {

            //allRole
            var allWidth =Math.ceil( data.length/12)*804;
            $allRole.css("width",allWidth);
            var allRoleLiLength = Math.ceil( data.length/2);
            //生成Li
            for(var i=0;i<allRoleLiLength;i++){
               var tempLi = $("<li class='roleList'></li>");
               var num01 = i*2;
                var num02 = i*2+1;


               // //生成allRole
               var tempRole01 = $(" <div class='roleContent'>" +
                   " <img src='img/index/strategyImg/"+data[num01].id+".png' />" +
                   " <a href='#' class='surface'> " +
                   "<span class='title'>"+data[num01].name+"</span> " +
                   "</a> " +
                   "</div>");
               if(data[num01].isNew){
                   tempRole01.append("<div class='newRole'></div>")
               }
                tempLi.append(tempRole01);
                var tempRole02 = $(" <div class='roleContent'>" +
                    " <img src='img/index/strategyImg/"+data[num02].id+".png' />" +
                    " <a href='#' class='surface'> " +
                    "<span class='title'>"+data[num02].name+"</span> " +
                    "</a> " +
                    "</div>");
                if(data[num02].isNew){
                    tempRole02.append("<div class='newRole'></div>")
                }
                tempLi.append(tempRole02);
                $allRole.append(tempLi);
            }


            //数据分类
            var SSRData = {};
            var SRData = {};
            var RData = {};
            var NData = {};
            var SSRTemp = 0,SRTemp = 0,RTemp = 0,NTemp = 0;
            for(var iTemp = 0;iTemp<data.length;iTemp++){
                if(data[iTemp].level ==="SSR"){
                    SSRData[SSRTemp] = data[iTemp];
                    SSRTemp++;
                }
                if(data[iTemp].level ==="SR"){
                    SRData[SRTemp] = data[iTemp];
                    SRTemp++;
                }
                if(data[iTemp].level ==="R"){
                    RData[RTemp] = data[iTemp];
                    RTemp++;
                }
                if(data[iTemp].level ==="N"){
                    NData[NTemp] = data[iTemp];
                    NTemp++;
                }
            }
            //生成SSR
            var SSRWidth =(Math.ceil(SSRTemp/12))*804;
            $SSRRole.css("width",SSRWidth);
            var SSRRoleLiLength = Math.ceil( (SSRTemp-1)/2);
            //生成Li
            for(var k=0;k<SSRRoleLiLength;k++){
                var SSRLi = $("<li class='roleList'></li>");
                var SSRNum01 = k*2;
                var SSRNum02 = k*2+1;


                var SSRTempRole01 = $(" <div class='roleContent'>" +
                    " <img src='img/index/strategyImg/"+SSRData[SSRNum01].id+".png' />" +
                    " <a href='#' class='surface'> " +
                    "<span class='title'>"+SSRData[SSRNum01].name+"</span> " +
                    "</a> " +
                    "</div>");
                if(SSRData[SSRNum01].isNew){
                    SSRTempRole01.append("<div class='newRole'></div>")
                }
                SSRLi.append(SSRTempRole01);
                var SSRTempRole02 = $(" <div class='roleContent'>" +
                    " <img src='img/index/strategyImg/"+SSRData[SSRNum02].id+".png' />" +
                    " <a href='#' class='surface'> " +
                    "<span class='title'>"+SSRData[SSRNum02].name+"</span> " +
                    "</a> " +
                    "</div>");
                if(SSRData[SSRNum02].isNew){
                    SSRTempRole02.append("<div class='newRole'></div>")
                }
                SSRLi.append(SSRTempRole02);
                $SSRRole.append(SSRLi);
            }

            //生成SR
            var SRWidth =(Math.ceil(SRTemp/12))*804;
            $SRRole.css("width",SRWidth);
            var SRRoleLiLength = Math.ceil( (SRTemp-1)/2);
            //生成Li
            for(var j=0;j<SRRoleLiLength;j++){
                var SRLi = $("<li class='roleList'></li>");
                var SRNum01 = j*2;
                var SRNum02 = j*2+1;

                var SRTempRole01 = $(" <div class='roleContent'>" +
                    " <img src='img/index/strategyImg/"+SRData[SRNum01].id+".png' />" +
                    " <a href='#' class='surface'> " +
                    "<span class='title'>"+SRData[SRNum01].name+"</span> " +
                    "</a> " +
                    "</div>");
                if(SRData[SRNum01].isNew){
                    SRTempRole01.append("<div class='newRole'></div>")
                }
                SRLi.append(SRTempRole01);
                var SRTempRole02 = $(" <div class='roleContent'>" +
                    " <img src='img/index/strategyImg/"+SRData[SRNum02].id+".png' />" +
                    " <a href='#' class='surface'> " +
                    "<span class='title'>"+SRData[SRNum02].name+"</span> " +
                    "</a> " +
                    "</div>");
                if(SRData[SRNum02].isNew){
                    SRTempRole02.append("<div class='newRole'></div>")
                }
                SRLi.append(SRTempRole02);
                $SRRole.append(SRLi);
            }

            //生成R
            var RWidth =(Math.ceil(RTemp/12))*804;
            $RRole.css("width",RWidth);
            var RRoleLiLength = Math.ceil( (RTemp-1)/2);
            //生成Li
            for(var n=0;n<RRoleLiLength;n++){
                var RLi = $("<li class='roleList'></li>");
                var RNum01 = n*2;
                var RNum02 = n*2+1;

                var RTempRole01 = $(" <div class='roleContent'>" +
                    " <img src='img/index/strategyImg/"+RData[RNum01].id+".png' />" +
                    " <a href='#' class='surface'> " +
                    "<span class='title'>"+RData[RNum01].name+"</span> " +
                    "</a> " +
                    "</div>");
                if(RData[RNum01].isNew){
                    RTempRole01.append("<div class='newRole'></div>")
                }
                RLi.append(RTempRole01);
                var RTempRole02 = $(" <div class='roleContent'>" +
                    " <img src='img/index/strategyImg/"+RData[RNum02].id+".png' />" +
                    " <a href='#' class='surface'> " +
                    "<span class='title'>"+RData[RNum02].name+"</span> " +
                    "</a> " +
                    "</div>");
                if(RData[RNum02].isNew){
                    RTempRole02.append("<div class='newRole'></div>")
                }
                RLi.append(RTempRole02);
                $RRole.append(RLi);
            }

            //生成N
            var NWidth =(Math.ceil(NTemp/12))*804;
            $NRole.css("width",NWidth);
            var NRoleLiLength = Math.ceil( (NTemp-1)/2);
            //生成Li
            for(var m=0;m<NRoleLiLength;m++){
                var NLi = $("<li class='roleList'></li>");
                var NNum01 = m*2;
                var NNum02 = m*2+1;

                var NTempRole01 = $(" <div class='roleContent'>" +
                    " <img src='img/index/strategyImg/"+NData[NNum01].id+".png' />" +
                    " <a href='#' class='surface'> " +
                    "<span class='title'>"+NData[NNum01].name+"</span> " +
                    "</a> " +
                    "</div>");
                if(NData[NNum01].isNew){
                    NTempRole01.append("<div class='newRole'></div>")
                }
                NLi.append(NTempRole01);
                var NTempRole02 = $(" <div class='roleContent'>" +
                    " <img src='img/index/strategyImg/"+NData[NNum02].id+".png' />" +
                    " <a href='#' class='surface'> " +
                    "<span class='title'>"+NData[NNum02].name+"</span> " +
                    "</a> " +
                    "</div>");
                if(NData[NNum02].isNew){
                    NTempRole02.append("<div class='newRole'></div>")
                }
                NLi.append(NTempRole02);
                $NRole.append(NLi);
            }


            shiShenContentTitle.click(function () {
                //初始化
                roleContain.eq($(this).index()).find(".roleWrap ul").css("left",0);
                roleContain.eq($(this).index()).find(".turn .turnLeft").css("display","none");
                roleContain.eq($(this).index()).find(".turn .turnRight").css("display","block");
                tempShift = 0;
                shiftNum = 0;

                //容器的显示
                roleContain.removeClass("show");
                roleContain.eq($(this).index()).addClass("show");

                //是否显示转换
                if(roleContain.eq($(this).index()).find(".roleWrap ul").width()<805){
                    roleContain.eq($(this).index()).find(".turn .turnRight").css("display","none");
                }
                //标题的变化
                $(this).siblings().removeClass("clicked");
                $(this).addClass("clicked");
            });

            shiftRightBtn.click(function () {
                $(this).siblings().css("display","block");
                tempShift++;
                var tempUl = $(this).parent().siblings().find("ul");
                if (tempShift === (tempUl.width()/804 - 1)) {
                    $(this).css("display", "none");
                }
                shiftNum = tempShift * 804;
                shiftNum = Math.min(shiftNum, (tempUl.width()/804- 1) * 804);
                tempUl.stop().animate({
                    left:-shiftNum
                },500)

            });
            shiftLeftBtn.click(function () {
                tempShift--;
                shiftRightBtn.css("display", "block");
                if (tempShift === 0) {
                    $(this).css("display", "none");
                }
                shiftNum = tempShift * 804;
                shiftNum = Math.max(shiftNum,0);
                var tempUl = $(this).parent().siblings().find("ul");
                tempUl.last().stop().animate({
                    left:-shiftNum
                },500)
            });
        },
        error:function () {
            alert("请求数据失败！！")
        }
    });


    //主角
    var $zhujueTab = strategy.find(".strategyWrap .content .zhuJueContent .peopleList .zhujueTab");
    var $introWrap = strategy.find(".strategyWrap .content .zhuJueContent .zhujueIntro .introWrap");

    $zhujueTab.click(function () {
        $zhujueTab.removeClass("choose");
        $zhujueTab.find("div").removeClass("show");
        $(this).addClass("choose");
        $(this).find("div").addClass("show");
        $introWrap.fadeOut();
        $introWrap.eq($(this).index()).fadeIn();

    });
});

//tactic
$(function () {
    //leftBanner
    var $tactic = $("#tactic");
    var $bannerPanel = $tactic.find(".leftBanner .strategyBanner .bannerPanel");
    var $strategyBannerWrap = $tactic.find(".leftBanner .strategyBanner .strategyBannerWrap");
    var $dotNav = $tactic.find(".leftBanner .strategyBanner .strategyBannerNav .dotNav");

    var moveShift= 0;
    var tempDis = 0;
    var timer;

    timerInterval();

    $bannerPanel.hover(function () {
        clearInterval(timer);
    },function () {
        timerInterval();
    });
    $dotNav.hover(function () {
        clearInterval(timer);
        $dotNav.removeClass("choosed");
        $(this).addClass("choosed");
        moveShift = $(this).index();
        tempDis = -moveShift*368;
        $strategyBannerWrap.stop().animate({
            left:tempDis
        },400)
    },function () {
        timerInterval();
    });
    function timerInterval() {
        timer = setInterval(function () {
            moveShift++;
            moveShift = moveShift%2;
            tempDis = -moveShift*368;
            $dotNav.removeClass("choosed");
            $dotNav.eq(moveShift).addClass("choosed");
            $strategyBannerWrap.stop().animate({
                left:tempDis
            },400)
        },3000);
    }

    var $bannerContianer = $tactic.find(".rightBanner .bannerWrap .bannerContianer");
    var $bannerList = $tactic.find(".rightBanner .bannerWrap .bannerContianer .bannerList");

    $.ajax({
        type:"post",
        async:true,
        url:"data/tactic.json",
        dataType:"json",
        success:function (data) {
            for(var i=0; i<10;i++){
                (function () {
                    var tempLi = $("<li class='linkItem'>" +
                        "<a href='"+data.tactic[i].link+"'>" +
                        "<p class='linkTitle'>【"+data.tactic[i].type[0]+"】"+ data.tactic[i].title+"</p> " +
                        "<p class='author'>作者："+data.tactic[i].author+"</p> " +
                        "</a> " +
                        "</li>");
                    $bannerList.eq(0).find(".list").append(tempLi);
                })();
            }
            addList("新手",1);
            addList("式神",2);
            addList("斗技",3);
            addList("玩法",4);
            function addList(obj,num) {
                for(var j=0; j<data.tactic.length;j++){
                    for(var k=0; k<data.tactic[j].type.length;k++){
                        if(data.tactic[j].type[k] === obj &&$bannerList.eq(num).find(".list li").length <10){
                            var tempLi = $("<li class='linkItem'>" +
                                "<a href='"+data.tactic[j].link+"'>" +
                                "<p class='linkTitle'>【"+data.tactic[j].type[k]+"】"+ data.tactic[j].title+"</p> " +
                                "<p class='author'>作者："+data.tactic[j].author+"</p> " +
                                "</a> " +
                                "</li>");
                            $bannerList.eq(num).find(".list").append(tempLi);

                        }
                    }
                }
            };
        },
        error:function (msg) {
            alert("获取攻略列表信息失败！")
        }
    });

    //rightTitle
    var $item = $tactic.find(".rightBanner .rightBannerTitle li");
    var shiftNum = 0;
    $item.hover(function () {
        $item.find(".shiftBg").removeClass("show");
        $(this).find(".shiftBg").addClass("show");
        shiftNum = $(this).index(".move")-4;
        var tempLeft = -shiftNum*835;
        $bannerContianer.stop().animate({
            left:tempLeft
        },500);
    });
});

//tongren
$(function () {
    var $tongren = $("#tongren");
    var $topMove = $tongren.find(".headerTitle li.topMove");
    var $bannerWrap = $tongren.find(".bannerWrap .bannerPanel");
    var tempLeft = 0;

    $topMove.hover(function () {
        $topMove.find("p").removeClass("movetop");
        $(this).find("p").addClass("movetop");
        $topMove.find(".icon").removeClass("movetop");
        $(this).find(".icon").addClass("movetop");
        tempLeft = -$(this).index()*1200;
        $bannerWrap.stop().animate({
            left:tempLeft
        },500)
    });

    var $bannerContain =$tongren.find(".bannerWrap .bannerPanel .bannerContain");
    $.ajax({
        type:"post",
        async:true,
        url:"data/tongren.json",
        dataType:"json",
        success:function (data) {
            var tempLi;
            var typeNum = 0;
            for(var i=0; i<data.tongren.length;i++){
                tempLi = $(" <li>" +
                    "<a href='"+data.tongren[i].href+"'>" +
                    "<div class='imgTab'>" +
                    "<img src='"+data.tongren[i].url+"' alt=''>" +
                    "<div class='pop'>" +
                    "<div class='popIcon'>" +
                    "</div> " +
                    "</div> " +
                    "</div> " +
                    "</a> " +
                    "<p class='intro'>"+data.tongren[i].title+"</p> </li>");
                typeNum = data.tongren[i].type;
                $bannerContain.eq(typeNum).find(".bannerTab").append(tempLi);
            }
        }
    });

});

$(function () {
    var initArr = new Array();
    var $goTo = $("#goTo");
    var $goToTitle =$goTo.find(".goToTitle");
    var $saoWrapTitle = $goTo.find(".saoWrap .saoWrapTitle");
    var $bar = $goTo.find(".saoWrap .bar");

    init($goToTitle,$saoWrapTitle,$bar);

    $(window).scroll(function () {
        var height = $(document).scrollTop()+$(window).height();
        for(var i=0; i<initArr.length;i++){
            (function () {
                if(height>initArr[i].top){
                    $(initArr[i]).addClass("fade");
                }
            })();

        }
    });


    //获取所有动作的元素  并且进行初始化
    function init() {
        for (var i = 0; i < arguments.length; i++) {
            arguments[i].each(function () {
                this.top = $(this).offset().top;//获取元素的相对于的文档的高度
                initArr.push(this);
            });
        }
    }

});













