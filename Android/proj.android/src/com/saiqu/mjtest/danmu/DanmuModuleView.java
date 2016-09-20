package com.saiqu.mjtest.danmu;

import java.util.HashMap;

import android.content.Context;
import android.graphics.Color;
import android.graphics.Paint;
import android.view.Gravity;
import android.widget.RelativeLayout;
import android.widget.TextView;

public class DanmuModuleView extends RelativeLayout {
	private int danmuHeight;
	private Paint paint;
	private int sWidth,sHeight;
	private int count;
	private HashMap<Integer,Boolean> sendPosition=new HashMap<Integer,Boolean>();

	private Context context;
	private int textHeight;

	public DanmuModuleView(Context context) {
		super(context);
		this.context = context;
		textHeight = 24;
		TextView textView=new TextView(context);
		textView.setTextSize(textHeight);
		paint=textView.getPaint();

		danmuHeight= (int) (DensityUtils.sp2px(context,textHeight)*1.5);
		sWidth= DensityUtils.getScreenW(context);
		sHeight=DensityUtils.getScreenH(context)*3/4;

		count= sHeight/danmuHeight;

		for(int i=0;i<count;i++)
		{
			sendPosition.put(i,false);
		}
	}

	public void setDanmu(String str)
	{
		//		String ss="鎴戞槸瀛楀箷鍚�"+Math.random()*9999999;
		//		int ll=ss.length()*DensityUtils.sp2px(this.context,15);
		//		int ran= new Random().nextInt(ss.length());
		//		//String str=ss.substring(ran);
		//		String str=ss;
		final NormalDanmu danmu=new NormalDanmu(context,sWidth,(int) -paint.measureText(str));
		//paint.setColor(0xffffffff);
		danmu.setTextSize(textHeight);
		danmu.setText(str);
		int ranColorr = (int)(1+Math.random()*(255-1+1));
		int ranColorg = (int)(1+Math.random()*(255-1+1));
		int ranColorb = (int)(1+Math.random()*(255-1+1));
		danmu.setTextColor(Color.rgb(ranColorr, ranColorg, ranColorb));
		//		TextPaint tp1 = danmu.getPaint(); 
		//		tp1.setColor(0x00000000);
		//        tp1.setStrokeWidth(2);
		//        tp1.setStyle(Style.FILL_AND_STROKE);
		//        tp1.setFakeBoldText(true);

		danmu.setOnAnimationEndListener(new NormalDanmu.OnAnimationEndListener() {
			@Override
			public void clearPosition() {

				sendPosition.put(danmu.getPosition(), false);
			}

			@Override
			public void animationEnd() {

				removeView(danmu);
			}

		});

		for(int i=0;i<count;i++)
		{
			if(sendPosition.get(i)==false)
			{
				danmu.setPosition(i);
				RelativeLayout.LayoutParams lp=new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT, danmuHeight);
				lp.addRule(RelativeLayout.ALIGN_PARENT_TOP);
				lp.topMargin=i*danmuHeight;
				danmu.setGravity(Gravity.CENTER);
				addView(danmu, lp);
				danmu.send();
				sendPosition.put(i,true);
				break;
			}

		}
	}
}
