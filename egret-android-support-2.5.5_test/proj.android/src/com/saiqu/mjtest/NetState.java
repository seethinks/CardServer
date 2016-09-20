package com.saiqu.mjtest;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.res.Configuration;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;

class NetState extends BroadcastReceiver{
	sqgbmjtest instance;
	public NetState(sqgbmjtest i)
	{
		instance = i;
	}

	public static boolean isTablet(Context context) {
		return (context.getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) >= Configuration.SCREENLAYOUT_SIZE_LARGE;
	}

	public static boolean isNetConnet(Context context)
	{
		if(isTablet(context))
		{
			ConnectivityManager manager = (ConnectivityManager)context.getSystemService(Context.CONNECTIVITY_SERVICE);
			NetworkInfo wifi = manager.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
			if(!wifi.isConnected())
			{
				return false;
			}else
			{
				return true;
			}
		}else
		{
			ConnectivityManager manager = (ConnectivityManager)context.getSystemService(Context.CONNECTIVITY_SERVICE);
			NetworkInfo gprs = manager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE);
			NetworkInfo wifi = manager.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
			if(!gprs.isConnected() && !wifi.isConnected())
			{
				return false;
			}else
			{
				return true;
			}
		}

	}

	@Override
	public void onReceive(Context context, Intent arg1) {
		ConnectivityManager manager = (ConnectivityManager)context.getSystemService(Context.CONNECTIVITY_SERVICE);
		if(isTablet(context))
		{
			NetworkInfo wifi = manager.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
			if(!wifi.isConnected())
			{
				AlertDialog.Builder ab = new AlertDialog.Builder(context);
				ab.setMessage("亲，你的网络断开了，请连接好再进入吧。");
				ab.setPositiveButton("系统提示", new DialogInterface.OnClickListener() {
					@Override
					public void onClick(DialogInterface dialog, int which) {
						// TODO Auto-generated method stub
						dialog.dismiss();
						//                    Intent intent = new Intent(instance,sqgbmj.class);  
						//                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);  
						//                    instance.startActivity(intent);  
						//                    android.os.Process.killProcess(android.os.Process.myPid());  //缁撴潫杩涚▼涔嬪墠鍙互鎶婁綘绋嬪簭鐨勬敞閿�鎴栬�呴��鍑轰唬鐮佹斁鍦ㄨ繖娈典唬鐮佷箣鍓� 
						android.os.Process.killProcess(android.os.Process.myPid());
						System.exit(0);
					}
				}).show();
			}
			else{
				//            AlertDialog.Builder ab = new AlertDialog.Builder(context);
				//            ab.setMessage("缃戠粶杩炴帴鎴愬姛");
				//            ab.setPositiveButton("纭畾", new DialogInterface.OnClickListener() {
				//                @Override
				//                public void onClick(DialogInterface dialog, int which) {
				//                    // TODO Auto-generated method stub
				//                    dialog.dismiss();
				//                }
				//            }).show();               

			}
		}else
		{
			NetworkInfo gprs = manager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE);
			NetworkInfo wifi = manager.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
			if(!gprs.isConnected() && !wifi.isConnected())
			{
				AlertDialog.Builder ab = new AlertDialog.Builder(context);
				ab.setMessage("亲，你的网络断开了，请连接好再进入吧。");
				ab.setPositiveButton("系统提示", new DialogInterface.OnClickListener() {
					@Override
					public void onClick(DialogInterface dialog, int which) {
						// TODO Auto-generated method stub
						dialog.dismiss();
						//                    Intent intent = new Intent(instance,sqgbmj.class);  
						//                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);  
						//                    instance.startActivity(intent);  
						//                    android.os.Process.killProcess(android.os.Process.myPid());  //缁撴潫杩涚▼涔嬪墠鍙互鎶婁綘绋嬪簭鐨勬敞閿�鎴栬�呴��鍑轰唬鐮佹斁鍦ㄨ繖娈典唬鐮佷箣鍓� 
						android.os.Process.killProcess(android.os.Process.myPid());
						System.exit(0);
					}
				}).show();
			}
			else{
				//            AlertDialog.Builder ab = new AlertDialog.Builder(context);
				//            ab.setMessage("缃戠粶杩炴帴鎴愬姛");
				//            ab.setPositiveButton("纭畾", new DialogInterface.OnClickListener() {
				//                @Override
				//                public void onClick(DialogInterface dialog, int which) {
				//                    // TODO Auto-generated method stub
				//                    dialog.dismiss();
				//                }
				//            }).show();               

			}
		}




	}
}
