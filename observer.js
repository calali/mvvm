function Observer(data,vm){
    this.vm = vm
    this.data = data
    if(typeof data === 'object' && data !== null){
        this._proxy()
    }
}
Observer.prototype._proxy = function(){
    var self = this
    Object.keys(self.data).forEach(function(key){
        var dep = new Dep()
        Object.defineProperty(self.data,key,{
            enumerable: true,
            configurable: false,
            get : function(){
                if(Dep.target){
                    dep.depend(Dep.target)
                }
                return self.data[key]
            },
            set : function(newValue){
                dep.notice()
                self.data[key] = newValue
            },
        })
    })
}