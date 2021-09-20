//动画原理
// 1.获取当前元素位置 element.offsetleft
// 2.在当前元素上实现自加1操作 element.style.left = element.offsetleft + 1 +'px';
// 3.利用计时器实现重复第2步操作
    // setInterval(function(){
    //     element.style.left = element.offsetleft + 1 +'px';
    // },interval(间隔时间))
// 4.添加判断条件结束定时器
    // 清除定时器函数 clearInterval();
// 注意:要想用 element.style.left必须在当前元素上加定位

function window_animate(obj,target,interval,callback){
    // callback相当于function(){} 调用的时候用 callback();
    // 先清除以前的定时器，再执行当前的定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        // 设置步长 数字可自由调节
        var step = (target - window.pageYOffset) / 10;
        // 三元表达式 if step>0 向上取整 否则向下取整
        step = step>0 ? Math.ceil(step) : Math.floor(step);
        // 添加判断条件结束定时器
        if(window.pageYOffset == target){
            // 清除定时器
            clearInterval(obj.timer);
            // 回调函数写在结束定时器后
            if(callback){
                callback();
            }
        }
        // 添加移动距离
        // obj.style.left = obj.offsetLeft + step + 'px';
        window.scroll(0,window.pageYOffset + step);
    }, interval);
}
