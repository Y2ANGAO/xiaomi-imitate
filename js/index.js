window.addEventListener('load', function () {

    // 头部js
    var headList = document.querySelector('.head-list');
    var itemList = document.querySelector('.item-list');
    var itemChildren = document.querySelector('.item-children');
    // 为每一个headList.children绑定事件
    for (var i = 0; i < headList.children.length - 2; i++) {
        moveOut(headList.children[i], itemList.children[i]);
        moveOut(itemList.children[i], itemList.children[i]);
    }
    // 鼠标移入移出li显示隐藏
    function moveOut(obja, objb) {
        obja.addEventListener('mouseenter', function () {
            for (var i = 0; i < itemList.children.length; i++) {
                itemList.children[i].style['z-index'] = -1;
            }
            objb.style['z-index'] = 3;
            itemChildren.style.height = 260 + 'px';
            itemChildren.style['border-top'] = '1px solid #b0b0b0';
        })
        obja.addEventListener('mouseleave', function () {
            itemChildren.style.height = 0 + 'px';
            itemChildren.style['border-top'] = '1px solid transparent';
        })
    }


    // 头部焦点图text商品列表
    var textChildrens = document.querySelectorAll('.text-childrens');
    // 根据孩子个数动态设置textChildrens宽度
    for (var i = 0; i < 10; i++) {
        textChildrens[i].style.width = Math.ceil(textChildrens[i].children.length / 6) * 248 + 'px';
    }


    // 侧边导航
    var main = document.querySelector('.main');
    var clickTop = document.querySelector('.click-top');
    // 获取主体距离一面顶部的高度
    var mainTop = main.offsetTop;
    // 绑定scroll函数
    document.addEventListener('scroll', function () {
        if (window.pageYOffset >= mainTop) {
            clickTop.style.display = 'block';
        }
        else {
            clickTop.style.display = 'none';
        }
    })
    // 为click绑定点击事件，缓慢回顶部
    clickTop.addEventListener('click', function () {
        window_animate(window, 0, 20);
    })


    // 轮播图模块
    var focus = document.querySelector('.focus');
    var focusUl = focus.querySelector('ul');
    var focusOl = focus.querySelector('ol');

    // 在focusUl中将第一个li复制添加到最后
    focusUl.appendChild(focusUl.children[0].cloneNode(true));

    // 为focusUl动态生成宽度
    focusUl.style.width = focusUl.children.length * 100 + '%';
    // 为每一个focusUl li 设置宽度
    for (var i = 0; i < focusUl.children.length; i++) {
        focusUl.children[i].style.width = focus.offsetWidth + 'px';
    }
    // 获取focusUl li的宽度
    var liWidth = focus.offsetWidth;
    // 动态生成小圆点
    for (var i = 0; i < focusUl.children.length - 1; i++) {
        // 创建li
        var Li = document.createElement('li');
        // 为每一个Li设置index值
        Li.setAttribute('index', i);
        // 向focusOl添加li
        focusOl.appendChild(Li);
        // 为第一个小圆点设置class
        focusOl.children[0].className = 'point-hover';
        // 为每一个Li绑定事件
        Li.addEventListener('click', function () {
            // 排他思想，去除其它li样式，为当前li添加样式
            for (var i = 0; i < focusOl.children.length; i++) {
                focusOl.children[i].className = "";
            }
            this.className = 'point-hover';
            // 获取Li的index值
            var index = this.getAttribute('index');
            // 将index的值赋给num，为解决下面小圆点跟随变化
            num = index;
            // 调用缓动动画
            animate(focusUl, -index * liWidth, 15);
        })

    }
    // 拿到左右按钮
    var leftArrow = focus.querySelector('.left-arrow');
    var rightArrow = focus.querySelector('.right-arrow');
    var num = 0;
    var flag = true;
    // 右箭头绑定点击事件
    rightArrow.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num >= focusUl.children.length - 1) {
                num = 0;
                focusUl.style.left = 0 + 'px';
            }
            num++;
            animate(focusUl, -num * liWidth, 15, function () {
                flag = true;
            });
            // 设置小圆点跟随变化
            for (var i = 0; i < focusOl.children.length; i++) {
                focusOl.children[i].className = "";
            }
            if (num == focusUl.children.length - 1) {
                focusOl.children[0].className = 'point-hover';
            }
            else {
                focusOl.children[num].className = 'point-hover';
            }
        }
    })
    // 左箭头绑定点击事件
    leftArrow.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = focusUl.children.length - 1;
                focusUl.style.left = -num * liWidth + 'px';
            }
            num--;
            animate(focusUl, -num * liWidth, 15, function () {
                flag = true;
            });
            // 设置小圆点跟随变化
            for (var i = 0; i < focusOl.children.length; i++) {
                focusOl.children[i].className = "";
            }
            focusOl.children[num].className = 'point-hover';
        }
    })
    // 添加定时器，实现自动播放轮播图
    var timer = setInterval(function () {
        rightArrow.click();
    }, 5000)
    // 鼠标移入focus暂停播放轮播图
    focus.addEventListener('mouseenter', function () {
        clearInterval(timer);
        timer = null;
    })
    // 鼠标移出focus继续播放轮播图
    focus.addEventListener('mouseleave', function () {
        timer = setInterval(function () {
            rightArrow.click();
        }, 5000)
    })


    // 主体内容切换
    // 拿到
    var listText = document.querySelectorAll('.list-text');
    var listItems = document.querySelectorAll('.list-items');
    // 为每一个listText中的每一个li绑定鼠标移入事件
    for (var j = 0; j < listText.length; j++) {
        for (var i = 0; i < listText[j].children.length; i++) {
            // 调用函数
            underMove(listText[j].children[i], listItems[j].children[i], j);
        }
    }
    // 鼠标移入listText.children切换对应listItems.children函数
    function underMove(obja, objb, number) {
        obja.addEventListener('mouseenter', function () {
            // listItems排他class
            for (var i = 0; i < listItems[number].children.length; i++) {
                listItems[number].children[i].style['z-index'] = -1;
            }
            objb.style['z-index'] = 3;
            // listText排他class
            for (var i = 0; i < listText[number].children.length; i++) {
                listText[number].children[i].className = '';
            }
            obja.className = 'underline';
        })
    }


    // 底部切换
    var bottomHandoff = document.querySelector('.bottom-handoff');
    var HandoffImg = bottomHandoff.querySelectorAll('img');
    setInterval(function(){
        if (HandoffImg[1].style.opacity == '1'){
            HandoffImg[1].style.opacity = '0';
        }
        else{
            HandoffImg[1].style.opacity = '1';
        }
    },2000)


    // 头部搜索框自动切换placeholder
    var headForm = document.querySelector('.head-form');
    var headSerch = document.querySelector('.head-serch');
    headSerch.placeholder = '手机';
    var SerchValus = [
        '手机',
        '冰箱',
        '笔记本',
        '空调',
        '小米10S',
        '电视'
    ];
    var Valus = 0;
    var SerchTime = setInterval(function(){
        headSerch.placeholder = SerchValus[Valus];
        Valus = Valus < SerchValus.length - 1 ? Valus + 1 : Valus = 0;
    },2000)
    headForm.addEventListener('mouseenter',function(){
        clearInterval(SerchTime);
        SerchTime = null;
    })
    headForm.addEventListener('mouseleave', function () {
        SerchTime = setInterval(function () {
            headSerch.placeholder = SerchValus[Valus];
            Valus = Valus < SerchValus.length - 1 ? Valus + 1 : Valus = 0;
        }, 3000)
    })
})