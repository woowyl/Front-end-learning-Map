// Observe 对象
function Observe(data) {
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
        var dep = new dep();
        var childObj = observe(val);
    
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: function() {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
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
// 通过defineProperty监听每个属性的变化
function defineReactive(data, key, val){
    var dep = new dep();
    var childObj = observe(val);

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get: function() {
            if (Dep.target) {
                dep.depend();
            }
            return val;
        },
        set: function(newVal) {
            if (val === newVal) return;
            val = newVal;
            // 新值是obj的话，进行监听
            childObj = observe(newVal);
            dep.notify();//通知所有订阅者
        }
    });
}


var uid = 0;
function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    depend: function() {
        Dep.target.addDep(this);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
}
