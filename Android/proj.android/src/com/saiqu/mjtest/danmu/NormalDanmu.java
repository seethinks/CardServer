package com.saiqu.mjtest.danmu;

import android.content.Context;
import android.view.animation.Animation;
import android.view.animation.LinearInterpolator;
import android.view.animation.TranslateAnimation;

public class NormalDanmu extends Danmu {
    private Animation animation0,animation1;
    private int fx0,tx0,fx1,tx1;
    private int duration0,duration1;
    private OnAnimationEndListener onAnimationEndListener;

    public interface OnAnimationEndListener
    {
        public void clearPosition();//绗竴涓姩鐢荤粨鏉燂紝灏嗗綋鍓嶈璁剧疆涓哄彲浠ュ彂閫佸脊骞�
        public void animationEnd();//寮瑰箷瀹屽叏绉诲嚭灞忓箷
    }

    public NormalDanmu(Context context,int fx,int tx)
    {
        super(context);
        this.fx0=fx;
        this.tx0=Math.abs(fx)-Math.abs(tx)-100;//绗竴涓姩鐢荤粨鏉熶綅缃紝褰撳熬閮ㄧ┖鍑�100鍍忕礌鏃跺氨鍙互閫氱煡鍏朵粬寮瑰箷璺熶笂浜�
        this.fx1=tx0;
        this.tx1=tx;

        duration0=4000*(Math.abs(tx0-fx0))/DensityUtils.getScreenW(context);
        duration1=4000*(Math.abs(tx1-fx1))/DensityUtils.getScreenW(context);

        initAnimation();
    }

    private void initAnimation()
    {
        animation0=new TranslateAnimation(fx0,tx0,0,0);
        animation0.setInterpolator(new LinearInterpolator());
        animation1=new TranslateAnimation(fx1,tx1,0,0);
        animation1.setInterpolator(new LinearInterpolator());
        animation0.setAnimationListener(new Animation.AnimationListener() {
            @Override
            public void onAnimationStart(Animation animation) {

            }

            @Override
            public void onAnimationEnd(Animation animation) {

                clearAnimation();
                startAnimation(animation1);
                if (onAnimationEndListener!=null)
                {
                    onAnimationEndListener.clearPosition();
                }
            }

            @Override
            public void onAnimationRepeat(Animation animation) {

            }
        });

        animation0.setFillAfter(true);
        animation0.setDuration(duration0);
        //animation0.setInterpolator(new AccelerateInterpolator());

        animation1.setAnimationListener(new Animation.AnimationListener() {
            @Override
            public void onAnimationStart(Animation animation) {

            }

            @Override
            public void onAnimationEnd(Animation animation) {

                if(onAnimationEndListener!=null)
                {
                    onAnimationEndListener.animationEnd();
                }

            }

            @Override
            public void onAnimationRepeat(Animation animation) {

            }
        });

        animation1.setFillAfter(true);
        animation1.setDuration(duration1);
        //animation1.setInterpolator(new DecelerateInterpolator());
    }

    public void setOnAnimationEndListener(OnAnimationEndListener onAnimationEndListener)
    {
        this.onAnimationEndListener=onAnimationEndListener;
    }

    @Override
    public void send() {
        startAnimation(animation0);
    }
}
