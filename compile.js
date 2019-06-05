function Compile (vm){
    this.vm = vm
    this.$el = document.querySelector(vm.options.el)
    this.$fragment = this.createFragment()
    this.compile(this.$fragment.childNodes)
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
    nodes.forEach(function(node) {
        if(node.nodeType === 1){
            self.compileNode(node)
        }else if(node.nodeType === 3){
            //文字节点
            var reg = /\{\{(.*)}\}/
            if(reg.test(node.textContent)){
                const key = node.textContent.match(reg)[1]
                compileUtil.text(node,self.vm,key)
            }
        }
        if(node.childNodes && node.childNodes.length){
            self.compile(node.childNodes)
        }
    })
}
Compile.prototype.compileNode=function(node){
    // 遍历属性获取指令，遍历值
    var self = this
    var nodeAttributes = node.attributes
    var arr = new Array()
    arr.slice.call(nodeAttributes).forEach(function(attr){
        var attrName = attr.name
        var attrValue = attr.value
        if(/v\-/.test(attrName)){
            //自定义指令
            var order = attrName.split('-')[1]
            if(/on/.test(order)){
                //事件指令
                var eventType = order.split(":")[1]
                var method = self.vm.methods[attrValue]
                node.addEventListener(eventType,function(){
                    method.call(self.vm)
                },false)
            }else{
                //普通指令
                if(order === 'text'){
                    compileUtil.text(node,self.vm,attrValue)
                }
            }
            node.removeAttribute(attrName)
        }
    })
}

var compileUtil = {
    text:function(node,vm,key){
        node.textContent = vm[key]
        new Watcher(vm,key,function(value){
            node.textContent = vm[key]
        })
    }
}