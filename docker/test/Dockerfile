# 第一阶段
# 从 docker 官方的 Docker hub上拉取对应的 node 镜像
FROM node:16-buster-slim as builder 

LABEL description="A demo Dockerfile for build Docsify."

# 复制当前目录下的所有文件到容器的 /var/web/ 目录下
COPY . /var/web/

# RUN 指的是 执行 linux 命令
RUN set -x \
  && cd /var/web
#   && npm install \
#   && npm run build

# 第二阶段
# 从 docker 官方的 Docker hub上拉取对应的 nginx 镜像
# as prod 指定了这个阶段的名字为 prod
FROM nginx:1.23.1-alpine as prod

# 暴露 80 端口
EXPOSE 80
# 第0阶段生成的结果，复制到 nginx 的默认目录下
COPY --from=0 /var/web/ /usr/share/nginx/html
CMD [ "nginx", "-g", "daemon off;" ]