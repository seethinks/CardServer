package com.saiqu.mjtest;
import android.app.Activity;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Paint.Style;
import android.net.Uri;
import android.view.Display;
import android.view.LayoutInflater;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.MediaController;
import android.widget.VideoView;


public class PlayerH5 extends View {
	//private View playerView;
	private Context root;
	
	public PlayerH5(Context context) {
		super(context);
		root = context;
		//playerView = LayoutInflater.from(context).inflate(R.layout.player_layout, null);
		FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(sqgbmjtest.swidth,sqgbmjtest.sheight);

		Canvas canvas = new Canvas();
		Paint paint = new Paint();    
		// 缁樺埗鐭╁舰鍖哄煙-瀹炲績鐭╁舰    
		// 璁剧疆棰滆壊    
		paint.setColor(Color.WHITE);    
		// 璁剧疆鏍峰紡-濉厖    
		paint.setStyle(Style.FILL);    
		// 缁樺埗涓�涓煩褰�    
		canvas.drawRect(new Rect(0, 0,sqgbmjtest.swidth, sqgbmjtest.sheight), paint);

		((Activity)context).addContentView(this,params);
	}
	
	public void showUrl(String url)
	{
//		sqgbmj.video1.setVideoURI(Uri.parse("http://192.168.2.237/hls-live/livepkgr/_definst_/liveevent/880.m3u8"));   // mvdView鏄竴涓獀ideoView鎺т欢  
//		sqgbmj.video1.setMediaController(new MediaController(root));  
//		sqgbmj.video1.start();  
	}

}
