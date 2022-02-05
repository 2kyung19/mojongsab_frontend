#!/bin/bash

echo "> 현재 실행중인 Container 확인"
RUNNING_CONTAINER=$(docker ps -a | grep mojongsab_frontend)

if [ -z "$RUNNING_CONTAINER" ]
then
        echo -e "\n> 현재 실행중인 Container가 없으므로 종료하지 않습니다."
else
        echo -e "\n> 현재 실행중인 Conatiner를 종료합니다."
        docker rm -f mojongsab_frontend

        echo -e "\n> 기존의 Docker Image를 삭제합니다."
        docker rmi godgaji/mojongsab_frontend:latest
fi

echo -e "\n> 최신 버전의 컨테이너로 배포합니다."
docker run -d -p 3000:3000 --name mojongsab_frontend godgaji/mojongsab_frontend:latest