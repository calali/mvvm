function Mvvm(options){
    this.options = options
    this._data = this.options.data()
    //this.text 代理为this._data.text
    this._proxy()
    //代理this._data
    new Observer(this._data,this)
    this.$compile = new Compile(this)
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