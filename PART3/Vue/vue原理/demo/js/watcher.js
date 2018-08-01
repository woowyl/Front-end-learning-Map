function Watcher(vm, expOrFn, cb) {
    this.cb = cb;
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.depIds = {};

    if (typeof expOrFn === 'function') {
        this.getter = expOrFn;
    } else {
        this.getter = this.parseGetter(expOrFn);
    }

    this.value = this.get();
}

Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() { 
        var value = this.get();
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    addDep: function(dep) {
        console.log('watch.js addDep function param', dep);
        // 判断我是否已经订阅了此 发布者，如果没有订阅则继续订阅
        if (!this.depIds.hasOwnProperty(dep.id)) {
            // 在发布者的订阅者列表中加入这个订阅者
            dep.addSub(this);
            // 一个订阅者可以订阅多个发布者，将发布者放入到订阅者的dipIds中
            this.depIds[dep.id] = dep;
        }
    },

    get: function() {
        Dep.target = this;
        var value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        return value;
    },

    parseGetter: function(exp) {
        if (/[^\w.$]/.test(exp)) return;

        var exps = exp.split('.');

        return function(obj) {
            for (var i = 0, len = exps.length; i<len; i++) {
                if (!obj) return;
                obj = obj[exps[i]];
            }

            return obj;
        }
    }
}

