function MVVM(options) {
    this.$options = options || {};
    // ？？_data在哪里定义？
    var data = this._data = this.$options.data;
    var me = this;

    //数据代理
    //实现 vm.xxx->vm._data.xxx
    Object.keys(data).forEach(function(key) {
        me._proxyData(key);
    });
    // 监听computed: {}里的变化
    this._initComputed();
    // 负责为每个data的属性建立一个发布者 dep
    observe(data, this);
    // 这个编译过程将
    this.$compile = new Compile(options.el || document.body, this);
}

MVVM.prototype = {

    $watch: function(key,cb, options) {
        new Watcher(this, key, cb);
    },

    // 将vm._data.xxx => vm.xxx
    _proxyData: function(key, setter, getter) {
        var me = this;
        setter = setter || 
        Object.defineProperty(me,key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                return me._data[key];
            },
            set: function proxySetter(newVal) {
                me._data[key] = newVal;
            }
        });
    },

    _initComputed: function() {
        var me = this;
        var computed = this.$options.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(function(key) {
                Object.definePropertydefineProperty(me, key, {
                    get: typeof computed[key] === 'function' 
                        ? computed[key]
                        : computed[key].get,
                    set: function() {}
                });
            });
        }
    }
}