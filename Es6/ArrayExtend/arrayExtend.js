/**
 * Created by wanglijun on 2016/12/21.
 */
(function(){
    function countSymbols(string){
        return Array.from(string).length;
    }
    document.write("'王'字的长度是"+countSymbols('汉'));
    console.log(countSymbols('王'));
    console.log(Array.of(3,4,5,6));

    Array.of=Array.of||function(){
        return [].slice.call(arguments);
    }
    //这三个数应该都是值，如果不是，会自动转换成值。
    //同样是含头不含尾啊
    //Array.prototype.copyWithin(target,start=0,end=this.length);
    var a=[1,2,3,4,5,6];
    a.copyWithin(0,3,4);
    console.log("a===="+a);
            // [1,2,3,4,5,6].copyWithin(0,3);
    [].copyWithin.call({length:5,3:1},0,3);

    [].copyWithin.call(new Int32Array([1,2,3,4,5]),0,3,4);
    console.log([NaN,1,2,3].indexOf(NaN));
    console.log([NaN,1,2,3].findIndex(y=>Object.is(NaN,y)));
    for(let index of['a','b'].keys()){
        console.log("index===="+index);
    };
    /*for (let elem of ['a', 'b'].values()){
        console.log(elem);
    };*/
    for (let [index,elem] of ['a','b'].entries()){
        console.log(index,elem);
    }
    let array=['a','b'];
    let entries=array.entries();
    console.log(entries.next().value);

})();