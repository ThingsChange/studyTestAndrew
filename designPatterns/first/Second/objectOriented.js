/**
 * Created by Andrew on 2016/12/25.
 */
var Book=function () {
    //私有属性
    var id=1;
    //私有方法
    function checkId() {
        console.log(id===1);
    }
    //特权方法//不但可以访问类的共有属性和共有方法，而且还能访问这些类的或者对象自身的私有属性和私有方法，权利极大。
    this.setName=function () {};
    this.setPrice=function () {};
    this.getName=function () {};
    this.getPrice=function () {};
    //共有属性
    //共有方法
    this.name=name;
    this.print=function () {};
    //构造器，在对象创建的时候使用这些个特权方法，我们可以初始化一些实例对象的一些属性，好像java实体类中的set方法啊
    this.setName(name);
}
Book.prototype={
    //公有属性
    type:'javaScript',
    //公有方法
    sayType:function () {
    }
}
//类静态公有属性（所实例化的对象是无权访问的）
Book.pageType='page';
//类静态公有属性（所实例化的对象是无权访问的）
Book.sayPageType=function () {

}