package com.saiqu.mjtest;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.util.Log;

public class ApplicationsIntentReceiver extends BroadcastReceiver {

	@Override
	public void onReceive(Context context, Intent intent) 
	{   
		Log.i("debugTrace","============================RETURN VALUE ");      
		if(Intent.ACTION_PACKAGE_ADDED.equals(intent.getAction())){   
			PackageManager pm = context.getPackageManager();
			String packageName = intent.getData().getSchemeSpecificPart();
			if(packageName.indexOf("saiqu") != -1)
			{ 
				Intent myIntent = pm.getLaunchIntentForPackage(packageName);
	            if (myIntent != null){
	            	context.startActivity(myIntent);
	            }
			}
			Log.i("debugTrace","+++++++++++++++++++++++RETURN VALUE "+packageName);    
		}   
		else  if(Intent.ACTION_PACKAGE_REMOVED.equals(intent.getAction())){   
			Uri uri = null;
			uri = intent.getData();
			Log.i("debugTrace","----------------------------RETURN VALUE "+uri);      
		}   
	}

}
