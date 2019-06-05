var targetWatcher = null
function Watcher (vm,key,cb){
    this.depIds = []//当前watcher被放在了哪些消息订阅器里
    this.vm = vm
    this.key = key
    this.cb = cb
    this.oldValue = this.get()
}

Watcher.prototype.update=function(){
    this.cb.call(this.vm)
}
Watcher.prototype.get=function(){
    targetWatcher = this
    var key = this.key
    var value = this.vm[key]
    targetWatcher = null
    return value
}