package com.saiqu.mjtest;

import com.saiqu.mjtest.R;

import android.content.Context;
import android.util.DisplayMetrics;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.ImageView;;

public class EgretLoadingView extends FrameLayout {

    //private ProgressBar bar;
    //private TextView tv;
    private ImageView img;

    /**
     * 濞撳憡鍨欐稉瀣祰鏉╂稑瀹抽弶锟� 娑撳﹦鍤庨崜宥堫嚞閺囨寧宕插〒鐘讳壕閼奉亜鐣鹃崚鎯扮箻鎼达附娼�
     * 
     * @param context
     */
    public EgretLoadingView(Context context,DisplayMetrics metric,String localVersion) {
        super(context);

        img = new ImageView(context);
        img.setImageResource(R.drawable.loading_bg);
        this.addView(img);
        
//        tv = new TextView(context);
//        tv.setLayoutParams(new LayoutParams(LayoutParams.WRAP_CONTENT,
//                LayoutParams.WRAP_CONTENT));
//        tv.setText("下载中....");
//        this.addView(tv);
//        tv.setVisibility(View.GONE);
        
        TextView vertv = new TextView(context);
        vertv.setText("版本号:"+localVersion);
        this.addView(vertv);
        vertv.setX(4);
        vertv.setY((metric.heightPixels-36));
        
//        bar = new ProgressBar(context, null,
//        		android.R.attr.progressBarStyleHorizontal);
//        int barWidth = (int)(metric.widthPixels*0.75);
//        bar.setLayoutParams(new LayoutParams(barWidth,24));
//        bar.setX((float)((metric.widthPixels-barWidth)*0.5));
//        bar.setY((float)((metric.heightPixels-24)*0.6));
//        this.addView(bar);
//        bar.setVisibility(View.GONE);
    }

    public void onProgress(float progress) {
//        bar.setProgress((int) progress);
//        tv.setVisibility(View.VISIBLE);
//        bar.setVisibility(View.VISIBLE);
    }

    public void onGameZipUpdateProgress(float percent) {
 //       bar.setProgress((int) percent);
    }

    public void onGameZipUpdateError() {

    }

    public void onGameZipUpdateSuccess() {

    }

}
