function Mvvm(options){
    this.options = options
    this._data = this.options.data()
    this.methods = this.options.methods
    //this.text 代理为this._data.text
    this._proxy()
    //代理this._data
    new Observer(this._data,this)
    this._initComputed()
    this._created()
    new Compile(this)
    this._mounted()
    this._watch()

}

Mvvm.prototype._proxy = function(){
    var self = this
    Object.keys(self._data).forEach(function(key){
        Object.defineProperty(self,key,{
            enumerable: true,
            configurable: false,
            get : function(){
                return self._data[key]
            },
            set : function(newValue){
                self._data[key] = newValue
            },
        })
    })
}

Mvvm.prototype._initComputed = function(){
    var self = this
    var computed = this.options.computed
    Object.keys(computed).forEach(function(key){
        Object.defineProperty(self,key,{
            enumerable: true,
            configurable: false,
            get : function(){
                return computed[key].call(self)
            },
            set : function(){
            },
        })
    })
}

Mvvm.prototype._created = function(){
    var created = this.options.created
    created && created.call(this)
    
}

Mvvm.prototype._mounted = function(){
    var self = this
    var mounted = this.options.mounted
    mounted && mounted.call(this)
}

Mvvm.prototype._watch = function(){
    var self = this
    var watch = this.options.watch
    Object.keys(watch).forEach(function(key){
        new Watcher(self,key,watch[key])
    })  
}