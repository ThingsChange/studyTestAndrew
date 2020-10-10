const Dependency = require('webpack/lib/Dependency');

class DllEntryDependency extends Dependency{
    constructor(dependencies,name){
        super();
        //[SingleEntryDependency,SingleEntryDependency]
        //[isarray,is-promise]
        this.dependencies = dependencies;
        this.name = name;//utils
    }
    get type(){
        return 'dll entry';
    }
}

module.exports = DllEntryDependency;
