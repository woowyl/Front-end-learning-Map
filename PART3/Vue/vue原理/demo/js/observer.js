// Observe 对象
function Observe(data) {
    this.data = data;
    console.log(data,'data');
    this.walk(data);
    console.log(this,'observe');
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
    
        // 通过defineProperty监听属性的变化
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: function() {
                if (Dep.target) {
                    console.log('observe.js Dep.target is true');
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
        console.log(Dep.target,'observe.js dep target');
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