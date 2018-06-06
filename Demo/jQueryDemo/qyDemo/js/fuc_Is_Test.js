/**
 * Created by wanglijun on 2016/11/8.
 */
/**
 * jquery对象有一个函数 is
 * 根据选择器、DOM元素或 jQuery 对象来检测匹配元素集合，如果其中至少有一个元素符合这个给定的表达式就返回true。
 如果没有元素符合，或者表达式无效，都返回'false'。 '''注意：'''在jQuery 1.3中才对所有表达式提供了支持。
 在先前版本中，如果提供了复杂的表达式，比如层级选择器（比如 + , ~ 和 > ），始终会返回true
 expr StringV1.0

 字符串值，包含供匹配当前元素集合的选择器表达式。
 jQuery objectobjectV1.6

 现有的jQuery对象，以匹配当前的元素。
 element ExpressionV1.6

 一个用于匹配元素的DOM元素。
 function(index) FunctionV1.6

 一个函数用来作为测试元素的集合。它接受一个参数index，这是元素在jQuery集合的索引。在函数， this指的是当前的DOM元素。

 */
$(function(){
    var isForm=$("input[type='checkbox']").parent().is("form");
    console.log(isForm);
    $("li").click(function() {
        var $li = $(this),
            isWithTwo = $li.is(function() {
                return $('strong', this).length === 2;
            });
        if ( isWithTwo ) {
            $li.css("color", "green");
        } else {
            $li.css("color", "red");
        }
    });
})

$("div[instanceid='25455506'] div.J_htmlContent a").click();