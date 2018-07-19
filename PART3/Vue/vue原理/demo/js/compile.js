// 这是一个对象定义
function Compile(el) {
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el);
        this.init();
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    init: function() {this.compileElement(this.$fragment);},

    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(), child;
        while(child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    },

    compileElement: function(el) {
        var childNodes = el.childNodes, me =this;
        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;    //表达式文本？？
            // 按元素节点方式编译

            if (me.isElementNode(node)) {
                me.compile(node);
            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            //遍历编译子节点
            if (node.childNodes && node.firstChild.length) {
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

    isElementNode: function() {
        return node.nodeType == 1;
    },

    isTextNode: function() {
        return node.nodeType == 3;
    }
};