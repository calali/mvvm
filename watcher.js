function Watcher (vm,key,cb){
    this.depIds = []//当前watcher被放在了哪些key的消息订阅器里
    this.cb = cb
    this.oldValue = this.get()//获取key的初始值
}

Watcher.prototype.update=function(newValue){
    this.cb(newValue)
}
Watcher.prototype.get=function(){
    return vm[key]
}