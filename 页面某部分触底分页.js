// 将大量的数据拆分多份，弄成类似滚动加载的效果
    function divideDataForScroll($scroller, data, page, size, callback) {
        var nowSize = page*size;
        var nowData = data.slice(0, nowSize);
        // 每页的回调
        callback && callback(nowData, page, size);
        // 数据全部加载完毕
        if (data.slice(nowSize-size, nowSize).length < 1) {
            return $scroller.off('.scroller');
        }
        var winH = $scroller.height();
        $scroller.off('.scroller').on('scroll.scroller', function(e){
            var elemH = $scroller[0].scrollHeight;
            var sTop = e.target.scrollTop;
            if (sTop + winH + 5 > elemH) {
                divideDataForScroll($scroller, data, ++page, size, callback);
            }
        });
    }