var targetWatcher = null
function Watcher (vm,key,cb){
    this.depIds = []//当前watcher被放在了哪些消息订阅器里
    this.cb = cb
    this.oldValue = this.get()//获取key的初始值
    this.vm = vm
    this.key = key
}

Watcher.prototype.update=function(newValue){
    this.cb(newValue)
}
Watcher.prototype.get=function(){
    var key = this.key
    return this.vm[key]
}