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
                compileUtil[order](node,self.vm,attrValue)
            }
            node.removeAttribute(attrName)
        }
    })
}
var compileUtil = {
    text:function(node,vm,key){
        domAction.text(node,getValue(vm,key))
        new Watcher(vm,key,function(value){
            domAction.text(node,getValue(vm,key))
        })
    },
    html:function(node,vm,key){
        domAction.html(node,getValue(vm,key))
        new Watcher(vm,key,function(value){
            domAction.html(node,getValue(vm,key))
        })
    },
    model:function(node,vm,key){
        var value = getValue(vm,key)
        domAction.model(node,value)
        node.addEventListener('input',function(e){
            var newValue = e.target.value
            if(newValue !== value){
                setValue(vm,key,newValue)
                domAction.model(node,newValue)
            }
        },false)
        new Watcher(vm,key,function(value){
            domAction.model(node,getValue(vm,key))
        })
    }, 
}
var domAction = {
    text:function(node,value){
        node.textContent = value
    },
    html:function(node,value){
        node.innerHTML = value
    },
    model:function(node,value){
        node.value = value
    }
}
function getValue (vm,key){
    var arr = key.split('.')
    var result = vm
    arr.forEach(function(key){
        result = result[key]
    })
    return result
}
function setValue(vm,key,value){
    var arr = key.split('.')
    var len = arr.length
    var result = vm
    arr.forEach(function(key,index){
        if(index < len - 1){
            result = result[key]
        }else{
            result[key] = value
        }
    })
}