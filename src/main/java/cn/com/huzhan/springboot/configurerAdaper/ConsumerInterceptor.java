package cn.com.huzhan.springboot.configurerAdaper;

import cn.com.huzhan.springboot.interceptor.MyInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/*
* Description:配置URLInterceptor拦截器，以及拦截路径  引用自定义的拦截器
* */
@Configuration //实例化此拦截器 读取其配置
public class ConsumerInterceptor extends WebMvcConfigurerAdapter {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        System.out.println("这是拦截器的配置工具类");

       registry.addInterceptor(new MyInterceptor()).addPathPatterns("/*/**").excludePathPatterns("/user/**").excludePathPatterns("/model/toLogin");
        super.addInterceptors(registry);
    }
}
