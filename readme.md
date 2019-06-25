### 本项目的主题
学习并实现vuejs的双向绑定。即下面的代码实现和vuejs同样的效果：
![code](./image/code.png)

### vuejs的双向绑定是如何实现的？

vuejs通过Object.defineProperty对data中数据进行劫持，结合订阅者-发布者模式实现了对数据的双向绑定。

本项目将用5个类实现双向绑定。

1，MVVM类是其他类的执行入口。功能主要为初始化其他类。

2，Observer类对data中的数据的每一个key进行监听劫持，并且如果有对象嵌套，也会对嵌套的key进行劫持。对每一个key，存在一个闭包的值value保存它的值；存在一个订阅器dep，用来存放当key发生变化的时候，触发订阅器告诉订阅器里面的watcher，watcher进行更新视图。

3，Dep类是订阅器，有两个实例属性:id是当前订阅器的id,data中的每个key都有一个唯一对应的dep的id;
subs是数组，存放需要订阅这个key的watcher。
每个dep有两个方法，一个用来往订阅器里添加watcher；一个用来通知watcher进行更新。

4，Compile是编译类。对html模板进行解析，然后遍历节点解析指令，如：对{{text}}，替换成data中的text的值，并且对text添加watcher，当text变化时，更新视图中的文字。由此可见，watcher是在Compile
类解析指令时候进行初始化的。

5，Watcher是订阅者。需要在html编译时初始化，当data中对应的key发生变化时，调用watcher的update方法更新视图。
update方法执行初始化传入的回调方法，比如对{{text}}更新节点的文字内容。
watcher在自己实例的时候，调用data的get,将自己放入对应key的订阅器里。

### 如何自己实现vuejs的双向绑定？
参见项目中每个类的实现

### 其他问题
1，dep和watcher是什么关系？
对mvvm实例中的_data的数据进行代理，每一个key都有一个对应的消息订阅器dep。
dep每一个实例有一个id和一个订阅队列subs，subs存放watcher
depid是订阅器的id

当对模板解析需要监听变化时，实例watcher，需要传入cb,vm，监听的改变的key,还有depids，表示当前wacher已经被放在了哪些dep里，以避免重复放入。

### 感谢
本项目是在学习[DMQ](https://github.com/DMQ/mvvm)项目的基础上，对自己不易理解的地方，写成了自己容易理解的方式。非常感谢DMQ。

感谢阅读。欢迎交流提出意见！


