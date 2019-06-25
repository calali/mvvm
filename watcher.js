var targetWatcher = null

function Watcher (vm,key,cb){
    this.depIds = []//当前watcher被放在了哪些消息订阅器里
    this.vm = vm
    this.key = key
    this.cb = cb
    this.oldValue = this.get()
}

Watcher.prototype.update=function(){
    var newValue = this.get()
    this.cb.call(this.vm,newValue,this.oldValue)
    this.oldValue = newValue
}
Watcher.prototype.get=function(){
    targetWatcher = this
    var key = this.key
    var value 
    if(/\./.test(key)){
        var exps = key.split('.')
        var self = this
        var getValue = function(obj) {
            var obj = self.vm
            for (var i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                obj = obj[exps[i]];
            }
            return obj;
        }

       value = getValue(exps)
    }else{
        value = this.vm[key]
    }
    targetWatcher = null
    return value
}