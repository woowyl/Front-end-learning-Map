# docker

## 初识
 - 下载并安装对应系统的客户端   
    官方链接不稳定，推荐[阿里云镜像](http://mirrors.aliyun.com/docker-toolbox/)

 - 下载demo事例  

    `git clone https://github.com/docker/doodle.git`

 - build and tag 一个docker 镜像

    `cd doodle/cheers2019 && docker build -t woowyl/cheers2019 .`

 - run a container

    `docker run -it --rm woowyl/cheers2019`

 - share image on docker hub

    `docker login && docker push woowyl/cheers2019`