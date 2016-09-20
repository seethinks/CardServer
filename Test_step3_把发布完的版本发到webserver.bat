@echo off
set num=0
setlocal enabledelayedexpansion
for /f "delims=" %%i in (curPubTime.txt) do (
    set /a num+=1
    set str=%%i
    if !num! equ 5 echo !str! 
)
echo %str%


set ff=Android\proj.android\AndroidManifest.xml
set out=
for /f tokens^=2^ delims^=^" %%i in ('type %ff% ^| find/i "android:versionName"') do set out=%%i
echo %out%


set  x={
set  code_url="code_url":"http://gbmj.saiqu.org:1505/download/sqgbmj_m/game_code_%str%.zip",
set  update_url="update_url":"http://gbmj.saiqu.org:1505/download/sqgbmj_m/",
set  version="version":"%out%",
set  list1="list":[
set  list2={"qdid":10000,"qdname":"¹ÙÍø","zgx":1,"zgxurl":"http://gbmj.saiqu.org:1505/download/sqgbmj_m/sqgbmj_test.apk","cygx":1,"popdialog":1},
set  list3={"qdid":10001,"qdname":"xx","zgx":1,"zgxurl":"http://gbmj.saiqu.org:1505/download/sqgbmj_m/sqgbmj_test.apk","cygx":1,"popdialog":1},
set  list4={"qdid":10002,"qdname":"yy","zgx":0,"zgxurl":"http://gbmj.saiqu.org:1505/download/sqgbmj_m/sqgbmj_test.apk","cygx":0,"popdialog":1}]
set  x2=}

echo %x%%code_url%%update_url%%version%%list1%%list2%%list3%%list4%%x2% >D:\DedeAMPZ\WebRoot\Default\sqgbmj_m\ver.txt

pause

xcopy /s %cd%\egret-android-support-2.5.5_test\proj.android\src Android\proj.android\src

pause

xcopy /s %cd%\Android\proj.android\assets\egret-game D:\DedeAMPZ\WebRoot\Default\sqgbmj_m

pause
