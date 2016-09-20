@echo off
rem echo 批处理获取当前系统日期时间

for /f "tokens=1,2,3 delims=/- " %%a in ("%date%") do @set D=%%a%%b%%c
rem echo 获取当前时间字符串
for /f "tokens=1,2,3 delims=:." %%a in ("%time%") do @set T=%%a%%b%%c
rem echo 如当前小时小于10，将空格替换为0
set T=%T: =0%
rem echo 显示输出日期时间字符串
echo %D%%T% >curPubTime.txt


for /f "delims=" %%i in (curPubTime.txt) do (
call,set t=%%i
call,echo %%t: =%%>>temp.txt
)
del /q curPubTime.txt & ren temp.txt curPubTime.txt

set num=0
setlocal enabledelayedexpansion
for /f "delims=" %%i in (curPubTime.txt) do (
    set /a num+=1
    set str=%%i
    if !num! equ 5 echo !str! 
)
echo %str%

pause

egret publish client -compile --runtime native --version %str% -log

pause
