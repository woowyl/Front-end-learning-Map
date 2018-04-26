## 雪碧图 与 icon-font

在开始阅读前，需要对以下知识点有所掌握：
 - background-size
 - background-position
 - rem

### 为什么要雪碧图
> 为了减少网络请求个数量，提高网站的访问速度，我们一般都会把一些小的图片合并成一张sprite图，然后根据background-position来进行定位.

### 如何制作雪碧图
- 常规方法

    - 将使用次数比较多，且大小较小的图片(保证拼合后的图片大小)拼合为一张大图

    - 使用background-position去定位显示的icon

    - 雪碧图之间要留有一定的间隙，以防容器大小超过图片大小后出现临近图片

- 自动化工具  

    [spritesmith](https://github.com/Ensighten/spritesmith)
    [createsprite](https://www.npmjs.com/package/createsprite):对rem的支持

### 雪碧图与rem
直接使用px定位，没有问题，但是为了兼容不同尺寸的机型，我们在使用rem的过程中出现了问题。

透过现象看本质，是什么造成了这个问题
1. rem=>px过程中造成了的小数点问题
2. background-position %是在img大小的基础上，img大小yin
3. background-size 

> 例如： 一个设计稿在750下的设计稿，icon大小为32px。6个icon合成雪碧图后的宽度为225px,高度仍为32；


### 解决办法
- 如果是单个icon单独使用，可使用icon留边距的方式，小的位移不影响视觉效果。
- 如果是有点击选中的变化，rem+sprite的方式均会有跳动的现象，可采用单独相同比例的图片或者icon-font的方式
