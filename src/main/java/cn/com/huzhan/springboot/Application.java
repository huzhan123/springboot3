package cn.com.huzhan.springboot;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

/*
* 项目启动类
* */
@SpringBootApplication(scanBasePackages = "cn.com.huzhan.springboot.*")
@MapperScan("cn.com.huzhan.springboot.mapper") //扫描mapper接口对应的mapper.xml文件,并实例化
@ServletComponentScan //开启servlet的扫描器,包括servlet或者其子类
public class Application {
    //启动项目的方法
    public static void main(String[] args) {
        SpringApplication.run(Application.class,args);
    }
}
