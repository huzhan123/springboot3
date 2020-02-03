package cn.com.huzhan.springboot.interceptor;

import cn.com.huzhan.springboot.entity.User;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/*
* 自定义拦截器   登录-->首页
* */
public class MyInterceptor implements HandlerInterceptor {

   //拦截器核心方法
    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
       // System.out.println("执行了核心方法");
        //根据请求对象得到session容器
        HttpSession session = httpServletRequest.getSession();
        //从session中得到登录的用户
        User loginUser = (User) session.getAttribute("loginUser");
        if (loginUser!=null){
            return true; //放行,继续执行其他的拦截器
        }else {
            httpServletRequest.setAttribute("loginMsg","loginMsg"); //存session
            httpServletRequest.getRequestDispatcher("/model/toLogin").forward(httpServletRequest,httpServletResponse);
            return false; //拦截请求
        }
    }

    //拦截POST请求执行的方法
    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
     //   System.out.println("执行了POST请求方法");
    }

    //拦截之后执行的方法
    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
        //System.out.println("执行了拦截之后的方法");
    }
}
