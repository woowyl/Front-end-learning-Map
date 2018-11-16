function fast(array) {
    var sortTimes = 0;
    function sort(start, end) {
        if (array.length < 2) return;
        if (start!=undefined && end!=undefined && start>=end) return;
        var i = (start==undefined?1:start), j = (end==undefined?array.length-1:end);
        var baseEle = array[start];
        while(i!=j) {
            while(array[j]>=baseEle && i<j) {
                j--;
            }
            while((array[i]<=baseEle) && i<j) {
                i++;
            }
            
            if (i<j) {
                 var changeEle = array[i];
                    array[i] = array[j];
                    array[j] = changeEle;
            }
        }
        console.log(sortTimes++);
        
        array[start] = array[i];
        array[i] = baseEle;
        sort(0,i);//继续处理左边的，这里是一个递归的过程 
        sort(i+1,end);//继续处理右边的 ，这里是一个递归的过程 
    }

    sort(0, array.length-1);
    return array;
}

function quickSort(array) {
    var sortTimes = 0;
    function sort(prev, numsize) {
        var nonius = prev;
        var j = numsize - 1;
        var flag = array[prev];
        if ((numsize - prev) > 1) {
            while (nonius < j) {
                for (; nonius < j; j--) {
                    if (array[j] < flag) {
                        array[nonius++] = array[j];　//a[i] = a[j]; i += 1;
                        break;
                    };
                }
                for (; nonius < j; nonius++) {
                    if (array[nonius] > flag) {
                        array[j--] = array[nonius];
                        break;
                    }
                }
            }
            console.log('quickSort'+sortTimes++);
            array[nonius] = flag;
            sort(0, nonius);
            sort(nonius + 1, numsize);
        }
    }
    sort(0, array.length);
    return array;
 }
 function quickSort2(array) {
     var index = 0;
    function sort(prev, end) { 
               
        var flag = array[prev];
        var fontCoord= prev;
        var backCoord= end
        if (prev < end-1) {

            console.log('quickSort2', index++);
            while (fontCoord < backCoord) {
                // 从小到大排序 这里要求把大的留在右边
                while (fontCoord < backCoord && array[backCoord] > flag) {
                    backCoord--;
                }
                array[fontCoord] = array[backCoord];
                // array[j] = mark;
                while (fontCoord < backCoord && array[fontCoord] < flag) {
                    fontCoord++;
                }
                array[backCoord] = array[fontCoord];
            }
            array[fontCoord] = flag;
            console.log(fontCoord);
            
            sort(0,fontCoord);
            sort(fontCoord+1,end);
                    
        }
    }
    sort(0, array.length-1)
    return array;
 }