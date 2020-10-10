const Module= require('webpack/lib/Module');
const {RawSource} = require('webpack-sources');
class DllModule extends Module {
    constructor(context,dependencies,name,type){
        super('javascript/dynamic',context);
        this.dependencies=dependencies;//[SingleEntryDependency,SingleEntryDependency]
        this.name = name;
        this.type = type;
    }
    identifier(){
        return `dll ${this.name}`;//dll utils
    }
    readableIdentifier(){
        return `dll ${this.name}`;//dll utils
    }
    size(){
        return 12;
    }
    source(){
        //return new RawSource(`module.exports = __webpack_require__;`);
        return {
            source(){
                return `module.exports = __webpack_require__;`;
            }
        }
    }
    //实现模块的编译
    //options选项 compilation resolver解析路径的工作 fs callback
    build(options,compilation,resolver,fs,callback){
        this.built=true;//built是build过去式 do done
        this.buildMeta={};
        this.buildInfo={};//描述编译信息
        return callback();
    }
}
module.exports = DllModule;