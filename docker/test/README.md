# 📝 Docker 记录

一些 Docker 的使用记录。

# 构建镜像

```bash
# 构建 镜像
# -t  -t 参数表示 tag 标签的意思，就是给镜像起了一个名字叫做 docify/blog
# 这个 . 表示把当前目录下的文件及文件夹作为 Dockerfile 配置文件中的上下文
docker build -t docify/blog .
```

# 构建容器

```bash
# 构建容器
# -d 参数表示后台运行容器。对于前端应用来说，是启用了 nginx 作为 web 服务器，nginx 是一直需要保持后台运行，而不是只启动一次就结束了，所以需要加上 -d 的参数。
# -p 参数表示端口映射，将容器内部的 80 端口映射到宿主机的 80 端口
# --name 参数表示容器的名字，这里取名为 blog
docker run -d -p 80:80 --name blog docify/blog
```

# 参考文章
- https://juejin.cn/post/7157662419681017870