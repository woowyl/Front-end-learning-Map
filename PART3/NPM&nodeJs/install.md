## 安装与更新
访问官方网站nodejs.org或者github.com/nodesource/distributions，查看Node的最新版本和安装方法。

官方网站提供编译好的二进制包，可以把它们解压到/usr/local目录下面。

`$ tar -xf node-someversion.tgz`
然后，建立符号链接，把它们加到$PATH变量里面的路径。

`$ ln -s /usr/local/node/bin/node /usr/local/bin/node`
`$ ln -s /usr/local/node/bin/npm /usr/local/bin/npm`
下面是Ubuntu和Debian下面安装Deb软件包的安装方法。

`$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -`
`$ sudo apt-get install -y nodejs`

`$ apt-get install nodejs`
安装完成以后，运行下面的命令，查看是否能正常运行。

`$ node --version`

`$ node -v`
更新node.js版本，可以通过node.js的n模块完成。

$ sudo npm install n -g
$ sudo n stable
上面代码通过n模块，将node.js更新为最新发布的稳定版。

n模块也可以指定安装特定版本的node。

$ sudo n 0.10.21