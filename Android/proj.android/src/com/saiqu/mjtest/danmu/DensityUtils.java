/*
 * Copyright (c) 2014,KJFrameForAndroid Open Source Project,寮犳稕.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.saiqu.mjtest.danmu;

import android.content.Context;
import android.util.DisplayMetrics;

public final class DensityUtils {

    /**
     * 鏍规嵁鎵嬫満鐨勫垎杈ㄧ巼浠� dp 鐨勫崟浣� 杞垚涓� px(鍍忕礌)
     */
    public static int dip2px(Context context, float dpValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dpValue * scale + 0.5f);
    }

    /**
     * 鏍规嵁鎵嬫満鐨勫垎杈ㄧ巼浠� px(鍍忕礌) 鐨勫崟浣� 杞垚涓� dp
     */
    public static int px2dip(Context context, float pxValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (pxValue / scale + 0.5f);
    }

    /**
     * 鏍规嵁鎵嬫満鐨勫垎杈ㄧ巼浠� px(鍍忕礌) 鐨勫崟浣� 杞垚涓� sp
     */
    public static int px2sp(Context context, float pxValue) {
        float fontScale = context.getResources().getDisplayMetrics().scaledDensity;
        return (int) (pxValue / fontScale + 0.5f);
    }

    /**
     * 鏍规嵁鎵嬫満鐨勫垎杈ㄧ巼浠� sp 鐨勫崟浣� 杞垚涓� px
     */
    public static int sp2px(Context context, float spValue) {
        float fontScale = context.getResources().getDisplayMetrics().scaledDensity;
        return (int) (spValue * fontScale + 0.5f);
    }

    /**
     * 鑾峰彇dialog瀹藉害
     */
    public static int getDialogW(Context aty) {
        DisplayMetrics dm = new DisplayMetrics();
        dm = aty.getResources().getDisplayMetrics();
        int w = dm.widthPixels - 100;
        // int w = aty.getWindowManager().getDefaultDisplay().getWidth() - 100;
        return w;
    }

    /**
     * 鑾峰彇灞忓箷瀹藉害
     */
    public static int getScreenW(Context aty) {
        DisplayMetrics dm = new DisplayMetrics();
        dm = aty.getResources().getDisplayMetrics();
        int w = dm.widthPixels;
        // int w = aty.getWindowManager().getDefaultDisplay().getWidth();
        return w;
    }

    /**
     * 鑾峰彇灞忓箷楂樺害
     */
    public static int getScreenH(Context aty) {
        DisplayMetrics dm = new DisplayMetrics();
        dm = aty.getResources().getDisplayMetrics();
        int h = dm.heightPixels;
        // int h = aty.getWindowManager().getDefaultDisplay().getHeight();
        return h;
    }
}