## git

## 1. 已掌握的

### 1.1 日常操作

- ### git status

- ### git diff

- ### git add 

- ### git pull

- ### git push

### 撤销相关

- ### git checkout
- ### git reset
- ### git revert

### 分支和合并相关
- ### git merge
    - fast-forward: 默认是fast-forward, 在没有冲突的前提下，被合并分支的提交会直接并入合并分支，在log里无法跟随到。

    - --no-ff : 表示不使用fast-forward，会在log里显示在被合并分支的操作

    没有冲突的情况下：
    ![](./image/fast-forward.png)
    有冲突的情况下，使用fast-forward仍然会保留分支上的信息
    ![](./image/log_squence.png)

    会在master上多加一个提交，但是如果是没有冲突的情况下，这次提交就会被消除掉。
### 远程相关
- ### git clone
- ### git push origin [branchname]

### 其他

- ### git stash



### 2. 未掌握的

- ### git rebase


### 3. 理解git 需要掌握的几个概念

- ### 3.1 集中式和分布式

先说集中式版本控制系统，版本库是集中存放在中央服务器的，而干活的时候，用的都是自己的电脑，所以要先从中央服务器取得最新的版本，然后开始干活，干完活了，再把自己的活推送给中央服务器。中央服务器就好比是一个图书馆，你要改一本书，必须先从图书馆借出来，然后回到家自己改，改完了，再放回图书馆。

![](./image/centralize_svn.jpeg)

集中式版本控制系统最大的毛病就是必须联网才能工作，如果在局域网内还好，带宽够大，速度够快，可如果在互联网上，遇到网速慢的话，可能提交一个10M的文件就需要5分钟，这还不得把人给憋死啊。

那分布式版本控制系统与集中式版本控制系统有何不同呢？首先，分布式版本控制系统根本没有“中央服务器”，每个人的电脑上都是一个完整的版本库，这样，你工作的时候，就不需要联网了，因为版本库就在你自己的电脑上。既然每个人电脑上都有一个完整的版本库，那多个人如何协作呢？比方说你在自己电脑上改了文件A，你的同事也在他的电脑上改了文件A，这时，你们俩之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。

和集中式版本控制系统相比，分布式版本控制系统的安全性要高很多，因为每个人电脑里都有完整的版本库，某一个人的电脑坏掉了不要紧，随便从其他人那里复制一个就可以了。而集中式版本控制系统的中央服务器要是出了问题，所有人都没法干活了。

在实际使用分布式版本控制系统的时候，其实很少在两人之间的电脑上推送版本库的修改，因为可能你们俩不在一个局域网内，两台电脑互相访问不了，也可能今天你的同事病了，他的电脑压根没有开机。因此，分布式版本控制系统通常也有一台充当“中央服务器”的电脑，但这个服务器的作用仅仅是用来方便“交换”大家的修改，没有它大家也一样干活，只是交换修改不方便而已。 

![](./image/distributed_git.jpeg) 

#### 常见的SVN路径
```
    > svn checkout [path] (server address)            //获取服务器上项目
    > svn add [file]                                  //要添加的文件
    > svn update -r [version] [certain paht or file]  //提交前更新 可简化为 svn up
    > svn commit -m “LogMessage“ [-N] [--no-unlock] PATH //提交 可简化为svn ci
``` 
#### 常见的Git路径
```
    > git clone [path] (server address)            //获取服务器上项目
    > git status                                   //获取服务器上项目
    > git add [file]                               //要添加的文件
    > svn commit -m “LogMessage“                   //提交至本地repository
    > git pull                                     //获取远程Repository更新
    > git push                                     //将更新推送至远程Repository
``` 
 注意区分两者在commit前（svn:update）后(git:pull)的操作，这是两者集中和分布差异的体现。


- ### 3.2 工作区和暂存区
一张图理解清晰明了
![](./image/git.jpg)

工作区（workspace）即本地工作的目录，不在git控制范围，不会被跟踪。index即暂存区，这里的修改没有提交到仓库，它是未了对代码进行版本的管理如回溯等等，又避免了多次琐碎的commit提交。

- ### 3.3 HEAD



## reference
 - [廖雪峰git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)