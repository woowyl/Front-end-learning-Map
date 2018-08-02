// Observe 对象 发布者对象
function Observe(data) {
    // 这里的data 就是Vue的data对象,用于订阅
    /**
     * {
     *      key: 'value'
     * }
     */
    this.data = data;
    this.walk(data);
}


Observe.prototype = {
    walk: function(data) {
        var me = this;
        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        })
    },
    convert: function(key, val) {
        this.defineReactive(this.data, key, val);
    },
    defineReactive: function(data, key, val) {
        var dep = new Dep();
        var childObj = observe(val);
        console.log('deeep', dep);
        
        // 通过defineProperty监听属性的变化
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: function() {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            // !!!!!!!!!!!!!第二个关键 第一个关键是addEventListener
            set: function(newVal) {
                if (val === newVal) return;
                val = newVal;
                // 新值是obj的话，进行监听
                childObj = observe(newVal);
                dep.notify();//通知所有订阅者
            }
        });
    }
}


function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }

   return new Observe(value);
}


var uid = 0;

// 这里是发布者
function Dep() {
    this.id = uid++;
    this.subs = [];
}
/**
 * 发布者中常出现的几个方法
 * addSub() ：添加订阅者
 * removeSub() : 删除订阅者
 * notify(): 遍历订阅者列表，并触发订阅者的 某个方法（update()）
 * 
 * depend 向订阅者的发布者列表里添加自己。
 */
Dep.prototype = {
    // 这里并没有做重复判断，那么会不会有重复的订阅者
    // 并不会！！
    // 因为这个订阅动作 是订阅者发起的（订阅者在调用发布者的方法）
    // 在订阅者（这个demo里的watcher.js）的addDep()方法里
    // 注意！！！为了使发布者里的订阅者列表和订阅者的发布者列表统一，不要直接调用发布者的addSub()方法
    addSub: function(sub) {
        this.subs.push(sub);
    },
    depend: function() {
        Dep.target.addDep(this);
    },
    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
}

Dep.target = null;