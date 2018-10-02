#!/bin/bash

echo "Run install tools"
sleep 1
echo "Updating repositories.."

comprobate_gpl(){
    local return_=1
    which $1 >/dev/null 2>&1 || { local return_=0; }
    echo "$return_"
}

yum=$(comprobate_gpl "yum")
apt=$(comprobate_gpl "apt")
if [ $apt -eq "1" ]; then
    sudo apt update
  elif [ $yum -eq "1" ]; then
    sudo yum update
fi

tools_requirements=(curl nodejs npm)

echo_fail(){
  printf "\e[31m✘ ${1} No Installed"
  printf "\033[0m \n"
}

echo_pass(){
  printf "\e[32m✔ ${1} Installed"
  printf "\033[0m \n"
}

check_tool_and_install(){
    if type "$1" &>/dev/null; then
        echo_pass $1
    else
        echo_fail $1
        if [  $apt -eq "1" ]; then
            sudo apt install $1 -y
          elif [  $yum -eq "1" ]; then
            sudo yum install $1 -y
        fi
    fi
}

install_requirements(){
    echo "Install Requirements"
    for tool in ${tools_requirements[*]}
    do
        check_tool_and_install $tool
    done

#    instalar jasmine
    sudo npm install jasmine -g
}
install_requirements

clear
echo "######## Run Test ########"
sleep 2
echo "Test ---> Injector.js"
jasmine spec/warp-drive/InjectorSpec.js
echo ""
echo "Test ---> Motor.js"
jasmine spec/warp-drive/MotoSpec.js
sleep 1

printf "\n######## Run app Warp ########\n"
sleep 3
printf "\nInyetores=('0,0,0') Velocidad=100\n"
/usr/bin/node ./lib/warp-drive/Warp.js "0,0,0" 100

printf "\nInyetores=('0,0,0') Velocidad=90\n"
/usr/bin/node ./lib/warp-drive/Warp.js "0,0,0" 90

printf "\nInyetores=('0,0,0') Velocidad=30\n"
/usr/bin/node ./lib/warp-drive/Warp.js "0,0,0" 30

printf "\nInyetores=('20,10,0') Velocidad=100\n"
/usr/bin/node ./lib/warp-drive/Warp.js "20,10,0" 100

printf "\nInyetores=('0,0,100') Velocidad=80\n"
/usr/bin/node ./lib/warp-drive/Warp.js "0,0,100" 80

printf "\nInyetores=('0,0,0') Velocidad=150\n"
/usr/bin/node ./lib/warp-drive/Warp.js "0,0,0" 150

printf "\nInyetores=('0,0,30') Velocidad=140\n"
/usr/bin/node ./lib/warp-drive/Warp.js "0,0,30" 140

printf "\nInyetores=('20,50,40') Velocidad=170\n"
/usr/bin/node ./lib/warp-drive/Warp.js "20,50,40" 170
