#!/usr/bin/env bash

# it should be installed by yqg-web-setup.sh
node_version=6.9.1

print_intro()
{
    echo '''

    1.启动服务器:
            ./make.sh run [stage_name] [port]

    2.打印说明文档:
            ./make.sh help
    '''
}

setup_node_version()
{
    source ~/.nvm/nvm.sh
    nvm use ${node_version}
}

setup_npm_registry()
{
    nrm ls
    if [ $? != 0 ] ; then
        npm i -g nrm
    fi
    nrm use taobao
}

# set mode
mode=$1

case ${mode} in
"run")
    stage=$2
    port=$3
    setup_node_version
    NODE_ENV=${stage} NODE_CONFIG="{\"run\":{\"port\":$port}}" node build/server.js 
    ;;
*)
    print_intro
    ;;
esac
