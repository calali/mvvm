var id = 0

function Dep(){
    this.id = id++
    this.subs = []
}
Dep.prototype.notice = function(){
    this.subs.forEach(function(watcher){
        watcher.update()
    })
}