
/**
 *
 * @author  56477
 * @create 2018-03-22 10:54
 * @note 干什么的呢？
 **/

var getJSON = function(url) {
    var promise = new Promise(function(resolve, reject){
        var client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();
        function handler() {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
    });
    return promise;
};
getJSON("/posts.json").then(function(json) {
    console.log('Contents: ' + json);
}, function(error) {
    console.error('出错了', error);
});


async function  abc() {
    return new Promise((resolve,reject)=>{
        function  a() {
            console.log(123);
        }
        setTimeout( resolve(a),0)
    })
}
(async function () {
   let a= await abc().then((data)=>{console.log(data);});
   console.log(a);
    console.log(2);
})();
