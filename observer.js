function Observer(data,vm){
    this.vm = vm
    this._proxy(data)
}
Observer.prototype._proxy = function(data){
    if(typeof data === 'object' && data !== null){
        var self = this
        Object.keys(data).forEach(function(key){
            var dep = new Dep()
            var value = data[key]
            self._proxy(value)
            Object.defineProperty(data,key,{
                enumerable: true,
                configurable: false,
                get : function(){
                    if(targetWatcher){
                        dep.add(targetWatcher)
                    }
                    return value
                },
                set : function(newValue){
                    if(value !== newValue){
                        value = newValue
                        // self._proxy(value)
                        dep.notice()
                    }
                },
            })
        })
    }
}
