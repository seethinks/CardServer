package com.saiqu.mjtest;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;

import android.os.Environment;
import android.util.Log;

/**
 * NetTool:灏佽涓�涓被鎼炲畾90%瀹夊崜瀹㈡埛绔笌鏈嶅姟鍣ㄧ浜や簰
 * 
 * @author 鏉庡潳 浜旀湡淇℃伅鎶�鏈彁楂樼彮
 */
public class NetTool {
	private static final int TIMEOUT = 10000;// 10绉�

	/**
	 * 浼犻�佹枃鏈�,渚嬪Json,xml绛�
	 */
	public static String sendTxt(String urlPath, String txt, String encoding)
			throws Exception {
		byte[] sendData = txt.getBytes();
		URL url = new URL(urlPath);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("POST");
		conn.setConnectTimeout(TIMEOUT);
		// 濡傛灉閫氳繃post鎻愪氦鏁版嵁锛屽繀椤昏缃厑璁稿澶栬緭鍑烘暟鎹�
		conn.setDoOutput(true);
		conn.setRequestProperty("Content-Type", "text/xml");
		conn.setRequestProperty("Charset", encoding);
		conn.setRequestProperty("Content-Length", String
				.valueOf(sendData.length));
		OutputStream outStream = conn.getOutputStream();
		outStream.write(sendData);
		outStream.flush();
		outStream.close();
		if (conn.getResponseCode() == 200) {
			// 鑾峰緱鏈嶅姟鍣ㄥ搷搴旂殑鏁版嵁
			BufferedReader in = new BufferedReader(new InputStreamReader(conn
					.getInputStream(), encoding));
			// 鏁版嵁
			String retData = null;
			String responseData = "";
			while ((retData = in.readLine()) != null) {
				responseData += retData;
			}
			in.close();
			return responseData;
		}
		return "sendText error!";
	}

	/**
	 * 涓婁紶鏂囦欢
	 */
	public static String sendFile(String urlPath, String filePath,
			String newName) throws Exception {
		String end = "\r\n";
		String twoHyphens = "--";
		String boundary = "*****";

		URL url = new URL(urlPath);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		/* 鍏佽Input銆丱utput锛屼笉浣跨敤Cache */
		con.setDoInput(true);
		con.setDoOutput(true);
		con.setUseCaches(false);
		/* 璁剧疆浼犻�佺殑method=POST */
		con.setRequestMethod("POST");
		/* setRequestProperty */

		con.setRequestProperty("Connection", "Keep-Alive");
		con.setRequestProperty("Charset", "UTF-8");
		con.setRequestProperty("Content-Type", "multipart/form-data;boundary="
				+ boundary);
		/* 璁剧疆DataOutputStream */
		DataOutputStream ds = new DataOutputStream(con.getOutputStream());
		ds.writeBytes(twoHyphens + boundary + end);
		ds.writeBytes("Content-Disposition: form-data; "
				+ "name=\"file1\";filename=\"" + newName + "\"" + end);
		ds.writeBytes(end);

		/* 鍙栧緱鏂囦欢鐨凢ileInputStream */
		FileInputStream fStream = new FileInputStream(filePath);
		/* 璁剧疆姣忔鍐欏叆1024bytes */
		int bufferSize = 1024;
		byte[] buffer = new byte[bufferSize];

		int length = -1;
		/* 浠庢枃浠惰鍙栨暟鎹嚦缂撳啿鍖� */
		while ((length = fStream.read(buffer)) != -1) {
			/* 灏嗚祫鏂欏啓鍏ataOutputStream涓� */
			ds.write(buffer, 0, length);
		}
		ds.writeBytes(end);
		ds.writeBytes(twoHyphens + boundary + twoHyphens + end);

		/* close streams */
		fStream.close();
		ds.flush();

		/* 鍙栧緱Response鍐呭 */
		InputStream is = con.getInputStream();
		int ch;
		StringBuffer b = new StringBuffer();
		while ((ch = is.read()) != -1) {
			b.append((char) ch);
		}
		/* 鍏抽棴DataOutputStream */
		ds.close();
		return b.toString();
	}

	/**
	 * 閫氳繃get鏂瑰紡鎻愪氦鍙傛暟缁欐湇鍔″櫒
	 */
	public static String sendGetRequest(String urlPath,
			Map<String, String> params, String encoding) throws Exception {

		// 浣跨敤StringBuilder瀵硅薄
		StringBuilder sb = new StringBuilder(urlPath);
		sb.append('?');

		// 杩唬Map
		for (Map.Entry<String, String> entry : params.entrySet()) {
			sb.append(entry.getKey()).append('=').append(
					URLEncoder.encode(entry.getValue(), encoding)).append('&');
		}
		sb.deleteCharAt(sb.length() - 1);
		// 鎵撳紑閾炬帴
		URL url = new URL(sb.toString());
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Content-Type", "text/xml");
		conn.setRequestProperty("Charset", encoding);
		conn.setConnectTimeout(TIMEOUT);
		// 濡傛灉璇锋眰鍝嶅簲鐮佹槸200锛屽垯琛ㄧず鎴愬姛
		if (conn.getResponseCode() == 200) {
			// 鑾峰緱鏈嶅姟鍣ㄥ搷搴旂殑鏁版嵁
			BufferedReader in = new BufferedReader(new InputStreamReader(conn
					.getInputStream(), encoding));
			// 鏁版嵁
			String retData = null;
			String responseData = "";
			while ((retData = in.readLine()) != null) {
				responseData += retData;
			}
			in.close();
			return responseData;
		}
		return "sendGetRequest error!";

	}

	/**
	 * 閫氳繃Post鏂瑰紡鎻愪氦鍙傛暟缁欐湇鍔″櫒,涔熷彲浠ョ敤鏉ヤ紶閫乯son鎴杧ml鏂囦欢
	 */
	public static String sendPostRequest(String urlPath,
			Map<String, String> params, String encoding) throws Exception {
		StringBuilder sb = new StringBuilder();
		// 濡傛灉鍙傛暟涓嶄负绌�
		if (params != null && !params.isEmpty()) {
			for (Map.Entry<String, String> entry : params.entrySet()) {
				// Post鏂瑰紡鎻愪氦鍙傛暟鐨勮瘽锛屼笉鑳界渷鐣ュ唴瀹圭被鍨嬩笌闀垮害
				sb.append(entry.getKey()).append('=').append(
						URLEncoder.encode(entry.getValue(), encoding)).append(
						'&');
			}
			sb.deleteCharAt(sb.length() - 1);
		}
		// 寰楀埌瀹炰綋鐨勪簩杩涘埗鏁版嵁
		byte[] entitydata = sb.toString().getBytes();
		URL url = new URL(urlPath);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("POST");
		conn.setConnectTimeout(TIMEOUT);
		// 濡傛灉閫氳繃post鎻愪氦鏁版嵁锛屽繀椤昏缃厑璁稿澶栬緭鍑烘暟鎹�
		conn.setDoOutput(true);
		// 杩欓噷鍙缃唴瀹圭被鍨嬩笌鍐呭闀垮害鐨勫ご瀛楁
		conn.setRequestProperty("Content-Type",
				"application/x-www-form-urlencoded");
		// conn.setRequestProperty("Content-Type", "text/xml");
		conn.setRequestProperty("Charset", encoding);
		conn.setRequestProperty("Content-Length", String
				.valueOf(entitydata.length));
		OutputStream outStream = conn.getOutputStream();
		// 鎶婂疄浣撴暟鎹啓鍏ユ槸杈撳嚭娴�
		outStream.write(entitydata);
		// 鍐呭瓨涓殑鏁版嵁鍒峰叆
		outStream.flush();
		outStream.close();
		// 濡傛灉璇锋眰鍝嶅簲鐮佹槸200锛屽垯琛ㄧず鎴愬姛
		if (conn.getResponseCode() == 200) {
			// 鑾峰緱鏈嶅姟鍣ㄥ搷搴旂殑鏁版嵁
			BufferedReader in = new BufferedReader(new InputStreamReader(conn
					.getInputStream(), encoding));
			// 鏁版嵁
			String retData = null;
			String responseData = "";
			while ((retData = in.readLine()) != null) {
				responseData += retData;
			}
			in.close();
			return responseData;
		}
		return "sendText error!";
	}

	/**
	 * 鍦ㄩ亣涓奌TTPS瀹夊叏妯″紡鎴栬�呮搷浣渃ookie鐨勬椂鍊欎娇鐢℉TTPclient浼氭柟渚垮緢澶� 浣跨敤HTTPClient锛堝紑婧愰」鐩級鍚戞湇鍔″櫒鎻愪氦鍙傛暟
	 */
	public static String sendHttpClientPost(String urlPath,
			Map<String, String> params, String encoding) throws Exception {
		// 闇�瑕佹妸鍙傛暟鏀惧埌NameValuePair
		List<NameValuePair> paramPairs = new ArrayList<NameValuePair>();
		if (params != null && !params.isEmpty()) {
			for (Map.Entry<String, String> entry : params.entrySet()) {
				paramPairs.add(new BasicNameValuePair(entry.getKey(), entry
						.getValue()));
			}
		}
		// 瀵硅姹傚弬鏁拌繘琛岀紪鐮侊紝寰楀埌瀹炰綋鏁版嵁
		UrlEncodedFormEntity entitydata = new UrlEncodedFormEntity(paramPairs,
				encoding);
		// 鏋勯�犱竴涓姹傝矾寰�
		HttpPost post = new HttpPost(urlPath);
		// 璁剧疆璇锋眰瀹炰綋
		post.setEntity(entitydata);
		// 娴忚鍣ㄥ璞�
		DefaultHttpClient client = new DefaultHttpClient();
		// 鎵цpost璇锋眰
		HttpResponse response = client.execute(post);
		// 浠庣姸鎬佽涓幏鍙栫姸鎬佺爜锛屽垽鏂搷搴旂爜鏄惁绗﹀悎瑕佹眰
		if (response.getStatusLine().getStatusCode() == 200) {
			HttpEntity entity = response.getEntity();
			InputStream inputStream = entity.getContent();
			InputStreamReader inputStreamReader = new InputStreamReader(
					inputStream, encoding);
			BufferedReader reader = new BufferedReader(inputStreamReader);// 璇诲瓧绗︿覆鐢ㄧ殑銆�
			String s;
			String responseData = "";
			while (((s = reader.readLine()) != null)) {
				responseData += s;
			}
			reader.close();// 鍏抽棴杈撳叆娴�
			return responseData;
		}
		return "sendHttpClientPost error!";
	}

	/**
	 * 鏍规嵁URL鐩存帴璇绘枃浠跺唴瀹癸紝鍓嶆彁鏄繖涓枃浠跺綋涓殑鍐呭鏄枃鏈紝鍑芥暟鐨勮繑鍥炲�煎氨鏄枃浠跺綋涓殑鍐呭
	 */
	public static String readTxtFile(String urlStr, String encoding)
			throws Exception {
		StringBuffer sb = new StringBuffer();
		String line = null;
		BufferedReader buffer = null;
		try {
			// 鍒涘缓涓�涓猆RL瀵硅薄
			URL url = new URL(urlStr);
			// 鍒涘缓涓�涓狧ttp杩炴帴
			HttpURLConnection urlConn = (HttpURLConnection) url
					.openConnection();
			// 浣跨敤IO娴佽鍙栨暟鎹�
			buffer = new BufferedReader(new InputStreamReader(urlConn
					.getInputStream(), encoding));
			while ((line = buffer.readLine()) != null) {
				sb.append(line);
			}
		} catch (Exception e) {
			throw e;
		} finally {
			try {
				if(buffer != null) buffer.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return sb.toString();
	}

	/**
	 * 璇ュ嚱鏁拌繑鍥炴暣褰� -1锛氫唬琛ㄤ笅杞芥枃浠跺嚭閿� 0锛氫唬琛ㄤ笅杞芥枃浠舵垚鍔� 1锛氫唬琛ㄦ枃浠跺凡缁忓瓨鍦�
	 */
	public static int downloadFile(String urlStr, String path, String fileName)
			throws Exception {
		InputStream inputStream = null;
		try {
			inputStream = getInputStreamFromUrl(urlStr);
			File resultFile = write2SDFromInput(path, fileName, inputStream);
			if (resultFile == null) {
				return -1;
			}

		} catch (Exception e) {
			return -1;
		} finally {
			try {
				inputStream.close();
			} catch (Exception e) {
				throw e;
			}
		}
		return 0;
	}

	/**
	 * 鏍规嵁URL寰楀埌杈撳叆娴�
	 * 
	 * @param urlStr
	 * @return
	 * @throws MalformedURLException
	 * @throws IOException
	 */
	public static InputStream getInputStreamFromUrl(String urlStr)
			throws MalformedURLException, IOException {
		URL url = new URL(urlStr);
		HttpURLConnection urlConn = (HttpURLConnection) url.openConnection();
		InputStream inputStream = urlConn.getInputStream();
		return inputStream;
	}

	/**
	 * 灏嗕竴涓狪nputStream閲岄潰鐨勬暟鎹啓鍏ュ埌SD鍗′腑
	 */
	private static File write2SDFromInput(String directory, String fileName,
			InputStream input) {
		File file = null;
		String SDPATH = Environment.getExternalStorageDirectory().toString();
		FileOutputStream output = null;
		File dir = new File(SDPATH + directory);
		if (!dir.exists()) {
			dir.mkdir();
		}
		try {
			file = new File(dir + File.separator + fileName);
			file.createNewFile();
			output = new FileOutputStream(file);
			byte buffer[] = new byte[1024];
			while ((input.read(buffer)) != -1) {
				output.write(buffer);
			}
			output.flush();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				output.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return file;
	}
}