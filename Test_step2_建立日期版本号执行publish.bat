@echo off
rem echo �������ȡ��ǰϵͳ����ʱ��

for /f "tokens=1,2,3 delims=/- " %%a in ("%date%") do @set D=%%a%%b%%c
rem echo ��ȡ��ǰʱ���ַ���
for /f "tokens=1,2,3 delims=:." %%a in ("%time%") do @set T=%%a%%b%%c
rem echo �統ǰСʱС��10�����ո��滻Ϊ0
set T=%T: =0%
rem echo ��ʾ�������ʱ���ַ���
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
