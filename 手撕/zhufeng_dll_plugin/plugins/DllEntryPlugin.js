
const SingleEntryDependency = require('webpack/lib/dependencies/SingleEntryDependency');
const DllEntryDependency = require('./dependencies/DllEntryDependency');
const DllModuleFactory = require('./DllModuleFactory');
class DllEntryPlugin{
    constructor(context,entries,name){
        this.context = context;//C:\aproject\zhufeng_dll_plugin
        this.entries = entries;//['isarray','is-promise']
        this.name = name;//utils
    }
    apply(compiler){
        //每当新的一次编译开始的时候,就会触发这个事件
        //一般普通的普通模块,都会由normalModuleFactory来生产模块
        compiler.hooks.compilation.tap('DllEntryPlugin',(compilation,{normalModuleFactory})=>{
            //webpack需要什么样的依赖对应什么样的工厂,什么样的工作需要创建什么样的模块
            //如果依赖是DllEntryDependency,会交由dllModuleFactory来生产模块
            const dllModuleFactory = new DllModuleFactory();
            compilation.dependencyFactories.set(DllEntryDependency,dllModuleFactory);
            //如果是SingleEntryDependency依赖的话,会交由normalModuleFactory来生成模块
            compilation.dependencyFactories.set(SingleEntryDependency,normalModuleFactory);
        });

        // 注册make的钩子,异步注册
        // compilation代表一次编译
       compiler.hooks.make.tapAsync('DllEntryPlugin',(compilation,callback)=>{
           //开始一个新的入口编译
           //this.context根目录 this.name=utils callback 回调
          debugger 
         compilation.addEntry(this.context,
            //DllEntryDependency 
            new DllEntryDependency(
                //字符串数组变成了一个SingleEntryDependency数组
                this.entries.map(entry=>new SingleEntryDependency(entry)),
                this.name//utils
            )
            ,this.name,callback);
       });
    }
}
module.exports = DllEntryPlugin;