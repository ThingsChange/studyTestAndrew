/**
 * Created by wanglijun on 2016/12/5.
 */
(function(window,$){
   /* function debounce(method, context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function() {
            method.call(context);
        }, 1000);
    }*/

    function print() {
        console.log('hello world');
    }

    /*window.onscroll = function() {
        debounce(print);
    };*/
  /*  window.onscroll = function() {
        _.debounce(print,1000)();
    };
    $(".outParam").on("click",_.debounce());

    */
  function sayMessage(){
     var email= $(".class1").eq(0).val();
     var password=$(".class1").eq(1).val();
      console.log(email,password);
  }
    var fuc=_.debounce(sayMessage,1000,false)
$("#subBTN").on("click",_.debounce(sayMessage,1000,false))
$("#resetBTN").on("click",sayMessage)


})(window,jQuery);