// 这是一个对象定义
function Compile(el, vm) {
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
        // 转为fragment对象  减少appenChild操作 
        this.$fragment = this.node2Fragment(this.$el);
        this.init();
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    init: function() {
        this.compileElement(this.$fragment);
    },

    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(), 
            child;
        // 将原生节点拷贝到fragement
        while(child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    compileElement: function(el) {
        var childNodes = el.childNodes,
             me =this;
        /**
         * [].slice.call(arrays)  arrays.slice的区别？？
         * 
         */
        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            // 判断双大括号的表达式
            var reg = /\{\{(.*)\}\}/;    //表达式文本？？
            // 按元素节点方式编译

            if (me.isElementNode(node)) {
                me.compile(node);
            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            //遍历编译子节点
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        })
    },

    compile: function(node) {
        var nodeAttrs = node.attributes,
            me = this;
        
            [].slice.call(nodeAttrs).forEach(function(attr){
                var attrName = attr.name;
                if (me.isDirective(attrName)) {
                    var exp = attr.value;
                    console.log('compile 文件 在逐个编译每一个表达式：这次是exp==',exp);
                    
                    var dir = attrName.substring(2);
                    //事件指令
                    if (me.isEventDirective(dir)) {
                        compileUtil.eventHandler(node, me.$vm, exp, dir);
                        //普通指令
                    } else {
                        compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                    }

                    node.removeAttribute(attrName);
                }
            });
    },

    compileText: function(node, exp) {
        compileUtil.text(node, this.$vm, exp);
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理合集
var compileUtil = {
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        
        node.addEventListener('input', function(e) {
            console.log('add event listener function');
            
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },
    // 在这里绑定订阅者 页面的每次引用都是一次订阅
    bind: function(node, vm, exp, dir) {
        var updaterFn = updater[dir + 'Updater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        })
    },

    //事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        var val = vm;
        exp = exp.split(':');
        exp.forEach(function(k) {
            // 这个赋值语句会触发 vm的get事件
            val = val[k];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm;
        exp = exp.split(':');
        
        exp.forEach(function(k, i) {
            //非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};

var updater = {
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefind' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
}