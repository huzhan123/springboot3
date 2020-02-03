package cn.com.huzhan.springboot.utils;

import java.io.FileWriter;
import java.io.IOException;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：  ksfxhw3818@sandbox.com   111111
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class AlipayConfig {
	
//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

	// 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
	public static String app_id = "2016101600701380";
	
	// 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCTSfsTgMdGDyxpKxd5pbTsRlvsVtsYlhMtuacwdtI9IH2uAU5fPgm6snJKA18wKRw53MNxF6aBzkwuHqMyflZDBs1FoU1ffCNPhjwxTgShROu7VQmIUShV2eGHm/WoQ33zHpEyR9c/kH7t7ZGkdMmPjD8h5Ar5kpb63iym8cq8BwuIvPhzFZKhDbrRsTwNXlZtIALFk+pPn0TRS6CM6yApo9NELHEezcQkUG/OAASDcXZCV4VO/aBMfwbIRaV0TyG+dctuGdk01bKbS8/Ry6HT+jxr4yLtx/1XHqf8Rn8CGnuuJS3qw6gTqEqXyKM+jENsev3v9xe9DO8ESAgZchWLAgMBAAECggEAOWdN6W35PD7RqjNXNNv2RVeun8/CGDT1SI7gsCy/B3/QO67aopgFJrRBgsMJqDV9gLefnEYBaPnECv150UYXzIusGQUiqKIzCN1iPD0R5OB9l0cvLeejdsIx+a448dlMDyLMp/ID3AwuzAAZESVLIR0hxc2g0V/mY+OPN4lo4BquTANJsVu0OBZtq3Vk+2UhcV5cnPKKx2TeDgF7q3ZrIq+09mvJ3279E6Z4QfYdXJnk5ApcyZDL48yeIiLlqca1zgPo7R3qYYjM6lOUjJS+Ozlyan4wk86XgfSNF8/tsIBqrdVJXeEHTFQ9gooXcgs2o5h4pzAxfXcvpvobDQeL4QKBgQDbnwLfGzbuXA6KkVIJr6d4w7fQDThx+q7+MVmOkz71kp6mCMlKN9gQxKF9h1eJSxewOcYYrdolSIDQJHhgz6+zc+BjYvYH38XNmYHinC7OgbEz+OiFmIODJJuMHgAv7YRd2MKZ5xXGFIb/5rvO0lGeV0guRkGMCrHvI3T2TSPT0wKBgQCrr71ejbe83gl+h6mpOjuZJDosjZa/QMvmIzADiHmlW2WO/gAvTxtryQGsu/Cr8X9iRKGxYs0wwuum7TznL0DM9WS6Cf0ntqbAeRL2m+52WeK+rr+R8oMWBl8d6MSo//VmjkjJqg1eC0g92s8HqFGR6UmzV5g7hLmu0BvqDoJ8aQKBgBERMWLvNXyekM657lssWGJtK0qyzFEnPxQn96K51Km25DdY9XOcFWFwNnCP5QCZYlTimH9we0Rsdv4151j2qtvSRHzUwvPnsvKAXHSk2IpZz9CPJlrDeGznmmLwLemLlr7ISo81Qx7ql3cpkizHcWpRtB1MfmmIpz1DTyKY6hDbAoGBAI1ERFhZ2baBKGTBcdu5+7INugRQ2Joz0dJiX654jEeARbd7zmEfAVwV/9fGqMiCJKOR/027E0UtDcPDbxp2qiY7QI9HitMzmk/DD9R1B6jAWy81EJIhbrUftwIgNjksqxqgtsmgr/ES7XVf5nvRhpS91RPJXoySsEpkGKPlHn8JAoGBALpisBynMavD49XznPh9i0wJ9N98G52r92lYOM09CO+dR7YiFKkSzs/3GrFSI9TLED46Vi41K7FnoIY5m6QpE2/1ttnHFETvh0FFVt3axCI03X7buBGvHsIrE9icNLgSSnDgH5Q1LnX3tnR7CVQJqsAovDcHhqI8aYS6fCjJDKAP";

	// 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAk0n7E4DHRg8saSsXeaW07EZb7FbbGJYTLbmnMHbSPSB9rgFOXz4JurJySgNfMCkcOdzDcRemgc5MLh6jMn5WQwbNRaFNX3wjT4Y8MU4EoUTru1UJiFEoVdnhh5v1qEN98x6RMkfXP5B+7e2RpHTJj4w/IeQK+ZKW+t4spvHKvAcLiLz4cxWSoQ260bE8DV5WbSACxZPqT59E0UugjOsgKaPTRCxxHs3EJFBvzgAEg3F2QleFTv2gTH8GyEWldE8hvnXLbhnZNNWym0vP0cuh0/o8a+Mi7cf9Vx6n/EZ/Ahp7riUt6sOoE6hKl8ijPoxDbHr97/cXvQzvBEgIGXIViwIDAQAB";
	// 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String notify_url = "http://工程公网访问地址/alipay.trade.page.pay-JAVA-UTF-8/notify_url.jsp";

	// 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String return_url = "http://localhost:8080/orders/myOrdersPay";

	// 签名方式
	public static String sign_type = "RSA2";
	
	// 字符编码格式
	public static String charset = "utf-8";
	
	// 支付宝网关
	public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
	
	// 支付宝网关
	public static String log_path = "C:\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /** 
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

