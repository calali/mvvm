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
Dep.prototype.add = function(watcher){
    if(watcher.depIds.join(",").indexOf(this.id) === -1){
        this.subs.push(watcher)
    }
}