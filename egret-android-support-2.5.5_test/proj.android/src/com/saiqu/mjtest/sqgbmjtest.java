package com.saiqu.mjtest;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Date;
import java.util.HashMap;
//import java.util.Timer;
//import java.util.TimerTask;

import org.egret.egretframeworknative.EgretRuntime;
import org.egret.egretframeworknative.engine.EgretGameEngine;
import org.egret.egretframeworknative.engine.IGameExternalInterface;
import org.json.JSONArray;
import org.json.JSONObject;

import com.saiqu.mjtest.R;
import com.saiqu.mjtest.danmu.DanmuModuleView;
import com.tencent.mm.sdk.modelmsg.SendMessageToWX;
import com.tencent.mm.sdk.modelmsg.WXMediaMessage;
import com.tencent.mm.sdk.modelmsg.WXWebpageObject;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.WXAPIFactory;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.media.MediaPlayer;
import android.media.MediaPlayer.OnCompletionListener;
import android.media.MediaPlayer.OnErrorListener;
import android.media.MediaPlayer.OnPreparedListener;
import android.net.ConnectivityManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.os.StrictMode;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.MediaController;
import android.widget.RelativeLayout;
import android.widget.Toast;
import android.widget.VideoView;

public class sqgbmjtest extends Activity {
	private static final String EGRET_ROOT = "egret";
	// TODO: egret
	// publish濞戞柨顑呴幃妤呮晬鐏炲吋鍙忛柡锟介柅娑楃鞍濞戞挸顑呴悥鍫曟煂韫囧氦绀嬮柣銏㈠枑閸ㄦ岸鎯冮崚顪e_code闁告熬鎷�
	private static final String EGRET_PUBLISH_ZIP = "game_code_0123456789.zip";

	private EgretGameEngine gameEngine;
	private View gameEngineView;
	private String egretRoot;
	private String gameId;
	private String loaderUrl;
	private String updateUrl;
	public static int swidth; // 閻忕偛绻愮粻椋庯拷纭呮鐎规娊鏁嶉崼婵嗗壖缂佽京濯寸槐锟�
	public static int sheight; // 閻忕偛绻愮粻閿嬵殗濡搫顔婇柨娑樼墕閸庢氨妲愰悪鍛

	public String serverVersion;
	public String localVersion;
	public String apkDownloadPath;

	private View playerView;
	private VideoView video1;
	private DanmuModuleView dmView;
	private CheckVersionTask cv;
	private int runSpeed = 100;

	private DisplayMetrics metric;

	private int qdid = 10000;

	private final BroadcastReceiver mApplicationsReceiver = new ApplicationsIntentReceiver();

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		getWindow().setFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON,
				WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
		try {
			localVersion = getVersionName();
		} catch (Exception e1) {
			e1.printStackTrace();
		}

		metric = new DisplayMetrics();
		getWindowManager().getDefaultDisplay().getMetrics(metric);
		swidth = metric.widthPixels;
		sheight = metric.heightPixels;

		setContentView(new GameLoadingView(this, metric, localVersion));

		registerIntentReceivers();

		new Handler().postDelayed(new Runnable() {

			public void run() {
				if (android.os.Build.VERSION.SDK_INT > 9) {
					StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder()
							.permitAll().build();
					StrictMode.setThreadPolicy(policy);
				}

				egretRoot = new File(getFilesDir(), EGRET_ROOT)
						.getAbsolutePath();
				gameId = "local";

				initCheckNet();
				checkEgretVersion();
			}
		}, 1500);
	}

	private void registerIntentReceivers() {
		IntentFilter filter;

		filter = new IntentFilter(Intent.ACTION_PACKAGE_ADDED);
		filter.addAction(Intent.ACTION_PACKAGE_REMOVED);
		filter.addAction(Intent.ACTION_PACKAGE_CHANGED);
		filter.addDataScheme("package");
		registerReceiver(mApplicationsReceiver, filter);
	}

	private void initCheckNet() {
		if (!NetState.isNetConnet(this)) {
			AlertDialog.Builder ab = new AlertDialog.Builder(this);
			ab.setMessage("(づ￣3￣)づ╭❤～ ，你还没有连接网络唷。");
			ab.setPositiveButton("系统提示", new DialogInterface.OnClickListener() {
				@Override
				public void onClick(DialogInterface dialog, int which) {
					// TODO Auto-generated method stub
					dialog.dismiss();
					android.os.Process.killProcess(android.os.Process.myPid());
					System.exit(0);
				}
			}).show();
			return;
		}
		NetState receiver = new NetState(this);
		IntentFilter filter = new IntentFilter();
		filter.addAction(ConnectivityManager.CONNECTIVITY_ACTION);
		this.registerReceiver(receiver, filter);
		receiver.onReceive(this, null);
	}

	private void checkEgretVersion() {
		/**
		 * 闁告帇鍊栭弻鍣�gret闁汇劌瀚Ο濠傤嚕閸屾稒绾柡鍌︽嫹
		 */
		try {
			Date date = new Date();
			long times = date.getTime();
			String retStr = NetTool.readTxtFile(
					"http://gbmj.saiqu.org:1505/download/sqgbmj_m/ver.txt?"
							+ times, "UTF-8");
			JSONObject jsonObject = new JSONObject(retStr);
			// jsonObject.get("code_url");
			// jsonObject.get("update_url");
			serverVersion = jsonObject.getString("version");
			apkDownloadPath = jsonObject.getString("version");

			JSONArray nameList = jsonObject.getJSONArray("list");
			int length = nameList.length();
			for (int i = 0; i < length; i++) {// 閬嶅巻JSONArray
				JSONObject oj = nameList.getJSONObject(i);
				if (Integer.parseInt(oj.getString("qdid")) == qdid) {
					apkDownloadPath = oj.getString("zgxurl");
				}
				// Log.d("debugTest",Integer.toString(i)+"  aa-- "+apkDownloadPath);
			}
			loaderUrl = jsonObject.getString("code_url");
			updateUrl = jsonObject.getString("update_url");

			Log.d("debugTest", "serverVersion:" + serverVersion
					+ "  localVersion-- " + localVersion);
			if (serverVersion.equals(localVersion)) {
				setLoaderUrl(1);
				showEgret();
			} else {
				cv = new CheckVersionTask();
				new Thread(cv).start();
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
	}

	private String getVersionName() throws Exception {
		// getPackageName()鏄綘褰撳墠绫荤殑鍖呭悕锛�0浠ｈ〃鏄幏鍙栫増鏈俊鎭�
		PackageManager packageManager = getPackageManager();
		PackageInfo packInfo = packageManager.getPackageInfo(getPackageName(),
				0);
		return packInfo.versionName;
	}

	private void showDanmu(String str) {
		if (dmView != null)
			dmView.setDanmu(str);
	}

	public void showEgret() {
		if (gameEngine == null) {
			gameEngine = new EgretGameEngine();
			HashMap<String, Object> options = getGameOptions();
			gameEngine.game_engine_set_options(options);
			gameEngine.game_engine_set_loading_view(new EgretLoadingView(this,
					metric, localVersion));
			gameEngine.game_engine_init(this);
			gameEngineView = gameEngine.game_engine_get_view();
			setContentView(gameEngineView);
			// addContentView(gameEngineView,new
			// LayoutParams(LayoutParams.MATCH_PARENT,
			// LayoutParams.MATCH_PARENT));
			IGameExternalInterface externalInterface = gameEngine
					.game_engine_get_externalInterface();
			externalInterface
					.addCallBack(
							"doAndroidShowVideo",
							new IGameExternalInterface.IGameExternalInterfaceCallBack() {
								public void callBack(String url) {
									showH5Video(url);
								}
							});

			externalInterface
					.addCallBack(
							"doNativeOpenWeixin1",
							new IGameExternalInterface.IGameExternalInterfaceCallBack() {
								public void callBack(String url) {
									openWeixin1(url);
								}
							});
			externalInterface
					.addCallBack(
							"doNativeOpenWeixin2",
							new IGameExternalInterface.IGameExternalInterfaceCallBack() {
								public void callBack(String url) {
									openWeixin2(url);
								}
							});
			externalInterface
					.addCallBack(
							"doAndroidShowDanmu",
							new IGameExternalInterface.IGameExternalInterfaceCallBack() {
								public void callBack(String str) {
									showDanmu(str);
								}
							});

			externalInterface
					.addCallBack(
							"doAndroidExitApp",
							new IGameExternalInterface.IGameExternalInterfaceCallBack() {
								public void callBack(String str) {
									android.os.Process
											.killProcess(android.os.Process
													.myPid());
									System.exit(0);
								}
							});

			externalInterface
					.addCallBack(
							"doAndroidReLoadGame",
							new IGameExternalInterface.IGameExternalInterfaceCallBack() {
								public void callBack(String str) {
									gameEngine.reLoadGame();
								}
							});
		}
	}

	// private PlayerH5 playerH5View;
	private ImageView showPlayerLoading;

	public void showH5Video(String url) {
		if (playerView == null) {
			// gameEngine.game_engine_onPause();
			gameEngineView.scrollTo(5000, 5000);

			playerView = LayoutInflater.from(this).inflate(
					R.layout.player_layout, null);
			FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(
					sqgbmjtest.swidth, sqgbmjtest.sheight);

			addContentView(playerView, params);

			showPlayerLoading = (ImageView) findViewById(R.id.imageView1);

			video1 = (VideoView) findViewById(R.id.video1);
			video1.setBackgroundColor(Color.argb(255, 96, 96, 96));
			video1.setOnCompletionListener(new OnCompletionListener() {

				@Override
				public void onCompletion(MediaPlayer mp) {
					// 闁革负鍔嶉幐閬嶅绩閹呮殮婵絾娲濋～锕傚炊閻愬墎娈�
					Log.i("info",
							"played .....................................");
				}
			});
			video1.setOnErrorListener(new OnErrorListener() {

				@Override
				public boolean onError(MediaPlayer mp, int what, int extra) {
					// 闁告瑦鍨归弫鎾绘煥濞嗘帩鍤栭梺鎻掔У閺屽﹪骞橀鐔告澒
					Log.i("info",
							"eeeeeeeeeeeeeeeeeeee .....................................");
					return false;
				}
			});

			video1.setOnPreparedListener(new OnPreparedListener() {
				@Override
				public void onPrepared(MediaPlayer mp) {
					video1.setBackgroundColor(Color.argb(0, 0, 255, 0));
					Log.i("info",
							"setOnPreparedListenersetOnPreparedListenersetOnPreparedListenersetOnPreparedListener .....................................");
				}
			});

			int cx = (int) (sqgbmjtest.swidth * .5 - 46);
			int cy = (int) (sqgbmjtest.sheight * .5 - 46 * 3);
			showPlayerLoading.setX(cx);
			showPlayerLoading.setY(cy);
			handler.postDelayed(runnable, runSpeed); // 婵絽绻樺▓锟�.5s闁圭瑳鍡╂斀
			video1.setVideoURI(Uri.parse(url)); // mvdView闁哄嫷鍨粩瀛樼▔閻涳拷ideoView闁硅矇鍌涱偨
												// 192.168.2.232/sqgbmj/test1.mp4
			video1.setMediaController(new MediaController(this));
			video1.start();
		}

		if (dmView == null) {
			RelativeLayout.LayoutParams relativeParams = new RelativeLayout.LayoutParams(
					sqgbmjtest.swidth, sqgbmjtest.sheight);
			dmView = new DanmuModuleView(this);
			addContentView(dmView, relativeParams);
		}

	}

	Handler handler = new Handler();
	Runnable runnable = new Runnable() {
		@Override
		public void run() {
			// handler闁煎浜滈悽顐﹀棘鐟欏嫮銆婇悗鍦仧楠炲洨锟借纰嶅鍌炲闯閿燂拷
			try {
				handler.postDelayed(this, runSpeed);
				showPlayerLoading
						.setRotation(showPlayerLoading.getRotation() - 20);
				if (!video1.isPlaying()) {
					showPlayerLoadingImage(true);
				} else {
					showPlayerLoadingImage(false);
					handler.removeCallbacks(runnable);
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				System.out.println("exception...");
			}
		}
	};

	public static final String APP_ID = "wx456f7ec1187148e0";
	private IWXAPI api;

	public void openWeixin1(String url) {
		openWeixin(url, SendMessageToWX.Req.WXSceneSession);
	}
	public void openWeixin2(String url) {
		openWeixin(url, SendMessageToWX.Req.WXSceneTimeline);
	}
	
	public void openWeixin(String url, int reqtype) {
		api = WXAPIFactory.createWXAPI(this, APP_ID, false);
		api.registerApp(APP_ID);

		WXWebpageObject webpageObject = new WXWebpageObject();
		webpageObject.webpageUrl = url;

		WXMediaMessage msg = new WXMediaMessage(webpageObject);
		msg.title = "专业国标选手邀请季";
		msg.description = "快来一起玩国标麻将赢话费吧";
		Bitmap thumb = BitmapFactory.decodeResource(getResources(),
				R.drawable.weixin);
		msg.thumbData = Util.bmpToByteArray(thumb, true);
		SendMessageToWX.Req req = new SendMessageToWX.Req();
		req.transaction = buildTransaction("webpage");
		req.message = msg;
		req.scene = reqtype;
		api.sendReq(req);
	}

	private String buildTransaction(final String type) {
		return (type == null) ? String.valueOf(System.currentTimeMillis())
				: type + System.currentTimeMillis();
	}

	private void showPlayerLoadingImage(Boolean b) {
		if (!video1.isPlaying()) {
			showPlayerLoading.setVisibility(View.VISIBLE);
		} else {
			showPlayerLoading.setVisibility(View.GONE);
		}
	}

	private HashMap<String, Object> getGameOptions() {
		HashMap<String, Object> options = new HashMap<String, Object>();
		options.put(EgretRuntime.OPTION_EGRET_GAME_ROOT, egretRoot);
		options.put(EgretRuntime.OPTION_GAME_ID, gameId);
		options.put(EgretRuntime.OPTION_GAME_LOADER_URL, loaderUrl);
		options.put(EgretRuntime.OPTION_GAME_UPDATE_URL, updateUrl);
		return options;
	}

	private void setLoaderUrl(int mode) {
		switch (mode) {
		case 2:
			// local DEBUG mode
			// 闁哄牜鍓欏﹢纰奅BUG婵☆垪锟藉磭纭�闁挎稑鑻ぐ鍌滄暜閸愵収鍤炲ù锝堟硶閺侊拷0闁哄牜鍓欏﹢纾焛p闁挎稑鏈崹銊╂嚀閿燂拷1缂傚啯鍨圭划鍫曟嚔瀹勬澘绲縵ip
			loaderUrl = "";
			updateUrl = "";
			break;
		case 1:
			// http request zip RELEASE mode, use permission INTERNET
			// 閻犲洭鏀遍惇鎵磾閹寸姷鎹晍ip闁告牕鎳庤ぐ鍌滄暜閸愨敔浣割嚕韫囥儳绀夐梻鍥锋嫹閻熸洑鐒﹀鍫ユ⒔閿燂拷 INTERNET
			Log.i("info", loaderUrl);
			Log.i("info", updateUrl);
			break;
		default:
			// local zip RELEASE mode, default mode, `egret publish -compile
			// --runtime native`
			// 缂佸鐒﹀﹢浣虹矚濞差亝锛焭ip闁告牕鎳庤ぐ鍌滄暜閸愨敔浣割嚕閿燂拷, 濮掓稒顭堥璇参熼垾宕囩, `egret publish
			// -compile --runtime native`
			loaderUrl = EGRET_PUBLISH_ZIP;
			updateUrl = "";
			break;
		}
	}

	@Override
	public void onPause() {
		super.onPause();
		if (gameEngine != null) {
			IGameExternalInterface externalInterface = gameEngine
					.game_engine_get_externalInterface();
			externalInterface.call("shellPause", "");
			//gameEngine.game_engine_onPause();

			// IGameExternalInterface externalInterface =
			// gameEngine.game_engine_get_externalInterface();
			// externalInterface.call( "shellPause", "" );
		}
	}

	@Override
	public void onResume() {
		super.onResume();
		if (gameEngine != null) {
			//gameEngine.game_engine_onResume();
			IGameExternalInterface externalInterface = gameEngine
					.game_engine_get_externalInterface();
			externalInterface.call("shellResume", "");
			// gameEngine.reLoadGame();
//			TimerTask task = new TimerTask() {
//
//				public void run() {
//					// execute the task
//					// gameEngine.reLoadGame();
//					IGameExternalInterface externalInterface = gameEngine
//							.game_engine_get_externalInterface();
//					externalInterface.call("shellResume", "");
//				}
//
//			};
//
//			Timer timer = new Timer();
//
//			timer.schedule(task, 100);
		}
	}

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		switch (keyCode) {
		case KeyEvent.KEYCODE_BACK:
			if (gameEngine != null) {
				IGameExternalInterface externalInterface = gameEngine
						.game_engine_get_externalInterface();
				externalInterface.call("clickAndroidBack", "");

				// gameEngine.game_engine_onStop();
			}
			// finish();
			return true;
		default:
			return super.onKeyDown(keyCode, event);
		}
	}

	/**
	 * 閺夆晜鏌ㄥú鏍с�掗崨濠傜亞闁伙絽鐭傚锟�
	 */
	public void backToGame(View view) {
		if (playerView != null) {
			// gameEngine.game_engine_onResume();
			IGameExternalInterface externalInterface = gameEngine
					.game_engine_get_externalInterface();
			externalInterface.call("liveToGamefromAndroid", "");
			gameEngineView.scrollTo(0, 0);
			((ViewGroup) playerView.getParent()).removeView(playerView);
			playerView.destroyDrawingCache();
			playerView = null;
			handler.removeCallbacks(runnable);
		}
		if (dmView != null) {
			((ViewGroup) dmView.getParent()).removeView(dmView);
			dmView.destroyDrawingCache();
			dmView = null;
		}
	}

	// check version update
	private final int UPDATA_NONEED = 0;
	private final int UPDATA_CLIENT = 1;
	private final int GET_UNDATAINFO_ERROR = 2;
	// private final int SDCARD_NOMOUNTED = 3;
	private final int DOWN_ERROR = 4;
	private final String VERTAG = "Version info:";

	public class CheckVersionTask implements Runnable {
		public void run() {
			try {
				if (serverVersion.equals(localVersion)) {
					// Log.i(VERTAG, "鐗堟湰鍙风浉鍚�");
					// Message msg = new Message();
					// msg.what = UPDATA_NONEED;
					// handlerVer.sendMessage(msg);
				} else {
					Message msg = new Message();
					msg.what = UPDATA_CLIENT;
					handlerVer.sendMessage(msg);
				}
			} catch (Exception e) {
				Log.i("info 1->", serverVersion);
				Log.i("info 2->", localVersion);
				Message msg = new Message();
				msg.what = GET_UNDATAINFO_ERROR;
				handlerVer.sendMessage(msg);
				e.printStackTrace();
			}
		}
	}

	Handler handlerVer = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			// TODO Auto-generated method stub
			super.handleMessage(msg);
			Log.i("Info", "msg.what:" + msg.what);
			switch (msg.what) {
			case UPDATA_NONEED:
				// Toast.makeText(getApplicationContext(), "涓嶉渶瑕佹洿鏂�",
				// Toast.LENGTH_SHORT).show();
			case UPDATA_CLIENT:
				// 瀵硅瘽妗嗛�氱煡鐢ㄦ埛鍗囩骇绋嬪簭
				showUpdataDialog();
				break;
			case GET_UNDATAINFO_ERROR:
				// 鏈嶅姟鍣ㄨ秴鏃�
				Toast.makeText(getApplicationContext(), "获取更新列表出错", 1).show();
				break;
			case DOWN_ERROR:
				// 涓嬭浇apk澶辫触
				Toast.makeText(getApplicationContext(), "下载出错", 1).show();
				break;
			}
		}
	};

	/*
	 * 
	 * 寮瑰嚭瀵硅瘽妗嗛�氱煡鐢ㄦ埛鏇存柊绋嬪簭
	 * 
	 * 寮瑰嚭瀵硅瘽妗嗙殑姝ラ锛� 1.鍒涘缓alertDialog鐨刡uilder. 2.瑕佺粰builder璁剧疆灞炴��,
	 * 瀵硅瘽妗嗙殑鍐呭,鏍峰紡,鎸夐挳 3.閫氳繃builder 鍒涘缓涓�涓璇濇 4.瀵硅瘽妗唖how()鍑烘潵
	 */
	protected void showUpdataDialog() {
		AlertDialog.Builder builer = new AlertDialog.Builder(this);
		builer.setTitle("系统提示");
		builer.setMessage("请下载最新版本");
		builer.setCancelable(false);
		// 褰撶偣纭畾鎸夐挳鏃朵粠鏈嶅姟鍣ㄤ笂涓嬭浇 鏂扮殑apk 鐒跺悗瀹夎 装
		builer.setPositiveButton("更新", new DialogInterface.OnClickListener() {
			public void onClick(DialogInterface dialog, int which) {
				Log.i(VERTAG, "涓嬭浇apk,鏇存柊");
				downLoadApk();
			}
		});
		builer.setNegativeButton("拒绝", new DialogInterface.OnClickListener() {
			public void onClick(DialogInterface dialog, int which) {
				// TODO Auto-generated method stub
				// do sth
				dialog.dismiss();
				android.os.Process.killProcess(android.os.Process.myPid());
				System.exit(0);
			}
		});
		AlertDialog dialog = builer.create();
		dialog.show();
	}

	// /*
	// * 浠庢湇鍔″櫒涓笅杞紸PK
	// */
	protected void downLoadApk() {
		final ProgressDialog pd; // 杩涘害鏉″璇濇
		pd = new ProgressDialog(this);
		pd.setCancelable(false);
		pd.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
		pd.setMessage("正在下载...");
		pd.show();
		new Thread() {
			@Override
			public void run() {
				try {
					File file = getFileFromServer(apkDownloadPath, pd);
					sleep(3000);
					installApk(file);
					pd.dismiss(); // 缁撴潫鎺夎繘搴︽潯瀵硅瘽妗�
				} catch (Exception e) {
					Message msg = new Message();
					msg.what = DOWN_ERROR;
					handlerVer.sendMessage(msg);
					e.printStackTrace();
				}
			}
		}.start();
	}

	// 瀹夎apk
	protected void installApk(File file) {
		Intent intent = new Intent();
		// 鎵ц鍔ㄤ綔
		intent.setAction(Intent.ACTION_VIEW);
		// 鎵ц鐨勬暟鎹被鍨�
		intent.setDataAndType(Uri.fromFile(file),
				"application/vnd.android.package-archive");
		startActivity(intent);
	}

	public static File getFileFromServer(String path, ProgressDialog pd)
			throws Exception {
		// 濡傛灉鐩哥瓑鐨勮瘽琛ㄧず褰撳墠鐨剆dcard鎸傝浇鍦ㄦ墜鏈轰笂骞朵笖鏄彲鐢ㄧ殑
		if (Environment.getExternalStorageState().equals(
				Environment.MEDIA_MOUNTED)) {
			URL url = new URL(path);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setConnectTimeout(5000);
			// 鑾峰彇鍒版枃浠剁殑澶у皬
			pd.setMax(conn.getContentLength());
			InputStream is = conn.getInputStream();
			File file = new File(Environment.getExternalStorageDirectory(),
					"updata.apk");
			FileOutputStream fos = new FileOutputStream(file);
			BufferedInputStream bis = new BufferedInputStream(is);
			byte[] buffer = new byte[1024];
			int len;
			int total = 0;
			while ((len = bis.read(buffer)) != -1) {
				fos.write(buffer, 0, len);
				total += len;
				// 鑾峰彇褰撳墠涓嬭浇閲�
				pd.setProgress(total);
			}
			fos.close();
			bis.close();
			is.close();
			return file;
		} else {
			return null;
		}
	}
}
