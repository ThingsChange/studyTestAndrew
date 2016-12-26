/**
 * Created by Andrew on 2016/12/24.
 */
/**
 * 部门：前端，后端，测试，人事             产品类型(0:全部 1：单团 2：散拼  3：游学 4：大客户 5：自由行 6：签证 7：机票 10：游轮)，
 * 绩效等级：s,a,b,c,d                    分析类型//orderNum：订单数，peopleNo：收客人数，orderCurrency：订单金额
 * 每个部门的级别对应得系数也是不同的        时间区间
 * 部门的基准也是不一样的                  是否有多选按钮
 * 绩效=系数*基准
 *
 */
// orderNum ,orderType,searchDate,startDate,endDate,unit
//把某部门的规则以对象形式传进去 生成具体部门的计算函数
//参数对象本身什么形式 不重要 商量着来  这里假设是这样

var paramObj={
    orderNum:function(obj2){
        return getPic(obj2);
    },
    peopleNo:function(obj2){
        return getPic(obj2);
    },
    orderCurrency:function(obj2){
        return getPic(obj2);
    }
}

var paramObj2={
    q:function(){
        return function(searchDate,startDate,endDate,unit){
            console.log(searchDate);
            return getPic2(searchDate,startDate,endDate,unit);
        }
    },
    d:function(searchDate,startDate,endDate,unit){
        return function(){
            return getPic2(searchDate,startDate,endDate,unit);
        }
    },
    s:function(searchDate,startDate,endDate,unit){
        return function(){
            return getPic2(searchDate,startDate,endDate,unit);
        }
    }
}

var execute = function(diff) {
    return function(analysisType, orderType,searchDate,startDate,endDate,unit) {
        return diff[analysisType](orderType,searchDate,startDate,endDate,unit);
    };
};
var getPic=function(cpAndTime){
    return function (orderType,searchDate,startDate,endDate,unit) {
        return cpAndTime[orderType](searchDate,startDate,endDate,unit);
    }
}








var rules=execute(paramObj)(paramObj2);
rules(orderNum,1,2,3,4);



$traceurRuntime.ModuleStore.getAnonymousModule(function() {
    "use strict";
    var execute = function(diff) {
        return function(stage, salary) {
            return diff[stage](salary);
        };
    };
    var diffStage = {
        'S': function(salary) {
            return 3.5 * salary;
        },
        'A': function(salary) {
            return 2.3 * salary;
        },
        'B': function(salary) {
            return 1.9 * salary;
        },
        'C': function(salary) {
            return 1.5 * salary;
        },
        'D': function(salary) {
            return 1.2 * salary;
        }
    };
    var rules = execute(diffStage);
    console.log(rules('S', 20000));
    console.log(execute(diffStage)('S', 20000));
    return {};
});
//# sourceURL=traceured.js



//假设第一行是你要写的函数 后面是你提供的使用方式
const execute = diff => (stage,salary) => diff[stage](salary)


//把某部门的规则以对象形式传进去 生成具体部门的计算函数
//参数对象本身什么形式 不重要 商量着来  这里假设是这样
const diffStage = {
            'S': salary => 3.5*salary,
    'A': salary => 2.3*salary,
    'B': salary => 1.9*salary,
    'C': salary => 1.5*salary,
    'D': salary => 1.2*salary
}
//得到函数
const rules =  execute(diffStage)

//开始使用
console.log(rules('S',20000))


//等熟练后直接调用
console.log(execute(diffStage)('S',20000))



