package com.saiqu.mjtest.danmu;

import android.content.Context;
import android.widget.TextView;

public abstract class Danmu extends TextView{
    private Context context;
    private int position;//寮瑰箷鐨勪綅缃紝鍦ㄥ睆骞曞摢涓�琛�

    public Danmu(Context context) {
        super(context);
        this.context=context;
        setSingleLine();
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public abstract void send();


}
