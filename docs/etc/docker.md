---
title: Docker.
---

# Docker

## Docker 란?

- VM Waer 는 가상화 환경, CPU, 기타자원을 완전히 가상화해서 컴퓨터를 새로만드는것이지만,
  리눅스의 컨테이터 기술을 이용해서 가상화를 하지않고, 프로세스만 격리해서 빠르게 실행시키는 기술.

  - 기존의 운영체제안에서 새로운 운영체제를 새로 설치해서 독립적인 환경이 아닌,
    기존의 운영체제 안에서 프로세스를 격리시키는 기술을 이용해 가상머신을 설치한것과 거의 동일한 효과를 볼 수 있다.

  - Docker vs 가상머신
    - 가상머신을 사용하게 되면 OS를 새로 설치를 해야 하기때문에 용량이 커진다.
    - 가상머신은 속도가 느리다.
    - 가상머신은 CPU 에서 가상화 기술을 지원하면서 빨라지긴 했지만, 쪼개쓰는것은 같기때문에 느릴 수 밖에 없다.
    - Docker는 프로세스를 격리만 할 뿐, 새로운 OS를 띄우지 않는다.
    - Docker는 기존 시스템 자원을 공유 하는 것.
    - Docker는 가상머신의 효과는 내지만, 가상머신은 아니다.
    - 리얼 머신과의 성능상의 차이는 거의 없다. (벤치마킹 99.8~9%)
    - 자동 설치 스크립트 제공

- \$ `sudo wget -qO- https://get.docker.com/ | sh`

## RedHat Enterprise Linux, CentOS 설정

- CentOS 6
  - \$ `sudo yum install http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm`
  - \$ `sudo yum install docker-io`
- CentOS 7

  - \$ `sudo yum install docker`

- Docker 서비스 실행
  - \$ `sudo service docker start`
- 부팅시 자동실행
  - \$ `sudo chkconfig docker on`

## 시작하기.

- Docker 설치 확인
  - Docker 사용시에는 관리자 권한으로 실행
  - \$ `docker` , \$ `sudo docker` , \$ `docker version`
- Docker 이미지 확인

  - \$ `docker images`

- Docker는 git과 마찬가지로 push, pull 명령이 있다.

  - docker-hub 가 있다.
  - docker 와 docker-hub 의 관계는 git 과 git-hub와 비슷하다.
  - git은 리눅스토발즈가 만들었고, git-hub는 다른사람들이 만들었지만,
    docker와 docker-hub는 같이 만들어졌다.
  - \$ `docker pull ubuntu:14.04` 로 우분투 이미지를 가져올 수 있다.
  - \$ `docker search ubuntu` 로 이미지를 검색 할 수 있다.
    - ID가 붙어있는것은 clone 후 custom 해서 사용자들이 올린 이미지,
      ID가 없는것은 공식이미지

- Docker의 두가지 개념

  - image : 실행파일, 라이브러리가 조합된 것.
  - container : 이미지를 실행 한 것.(프로세스)

- Docker 실행
  - \$ docker run -i -t --name woongsik ubuntu:14.04 /bin/bash
    - -i : interactive (사용자가 입출력을 할 수 있는 상태)
    - -t : 가상 터미널 환경을 에뮬레이션 해 주는 옵션
    - -d : 백그라운드로 실행
    - --name : docker Name 설정
    - /bin/bash : Docker는 다른 가상머신과는 다르게 실행할 메인실행파일을 지정해줘야 한다. 컨테이너 안에있는 실행파일을 실행해서 실행된 상태로 만들어 놔야 컨테이너가 유지된다. 컨테이너 안에있는 메인 실행파일이 종료가 되면 컨테이너도 같이 종료된다.
    - 컨테이너 종료
      - \$ `exit`
      - 종료 확인 : \$ `docker ps -a`
      - -a : 종료된 컨테이너까지 확인 옵션
    - \$ `docker start` {docker Name} or {docker Container ID}
      - run 과 start 의 차이
        - run : docker 실행과 동시에 docker로 진입.
        - start : docker 실행 하지만 진입은 하지 않는다.
        - start 후 docker 진입 : \$ `docker attach` {docker Name} or {docker Container ID}
        - `Ctrl + P + Q` 단축키를 이용하면 컨테이너를 종료하지 않고 빠져나온다.
        - 컨테이너를 종료하지 않고 빠져나오는경우 외부에서 컨테이너를 종료 할 수 있다.
          - \$ `docker stop` {docker Name} or {docker Container ID}
    - docker를 종료 한 후 컨테이너 리스트에서 지우고 싶을경우
      - \$ `docker rm` {docker Name} or {docker Container ID}
    - docker image 삭제
      - \$ `docker rmi` {Repository Name}
    - exec (Docker로 진입하지 않아도 외부에서 Docker로 명령어 전달)
      - \$ docker `exec` hello echo 1
        - docker `exec` {docker Name} {명령어} {내용}
      - \$ docker `exec` hello touch /woongsik.txt
