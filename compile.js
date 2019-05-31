function Compile (vm){
    this.vm = vm
    this.$el = document.querySelector(vm.options.el)
    this.$fragment = this.createFragment()
    this.compile()
    this.$el.appendChild(this.$fragment)
}
Compile.prototype.createFragment=function(){
    var fragment=document.createDocumentFragment(),child
        while(child = this.$el.firstChild){
            fragment.appendChild(child)
        }
        return fragment
}
Compile.prototype.compile=function(nodes){
    //对文档进行解析，拿出来{{}}指令，并替换成对应的值
    var self = this
    nodes = nodes || this.$fragment.childNodes
    nodes.forEach(function(node) {
        if(node.nodeType === 1){
            // self.compileNode(node)
        }else if(node.nodeType === 3){
            //文字节点
            self.compileText(node)
        }
        if(node.childNodes && node.childNodes.length){
            self.compile(node.childNodes)
        }
    })
}
Compile.prototype.compileNode=function(node){
    //遍历属性获取指令，遍历值
    // console.log(node.attributes)
    // node.attributes.forEach(function(attr){
    //     console.log(attr)
    // })
    this.compileText(node)
}
Compile.prototype.compileText=function(node){
    // 遍历值
    var reg = /\{\{(.*)}\}/
    if(reg.test(node.textContent)){
        const key = node.textContent.match(reg)[1]
        node.textContext = node.textContent.replace(reg,this.vm[key])
    }
}