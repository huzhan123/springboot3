package cn.com.huzhan.springboot.configurerAdaper;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/*
* 设置访问首页index.jsp
*
* */
@Configuration //实例化此类,项目在启动过程中读取自定义的工具类或者配置类
public class ToIndexView extends WebMvcConfigurerAdapter {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        System.out.println("这是配置访问登录页面的工具类");
        //   /为访问路径,   /WEB-INF/jsp/index.jsp为文件的实际路径
        registry.addViewController("/").setViewName("index");
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
        super.addViewControllers(registry);
    }
}
