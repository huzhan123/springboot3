package cn.com.huzhan.springboot.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *   日期字符串转换的工具类
 */
public class DateUtil {

    private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

    //字符串---->日期
    public static Date stringToDate(String dateStr){
        try {
            return sdf.parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    //日期------>字符串
    public static String dateToString(Date date){
        return sdf.format(date);
    }

}
