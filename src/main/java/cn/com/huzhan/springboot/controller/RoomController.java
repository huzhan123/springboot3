package cn.com.huzhan.springboot.controller;

import cn.com.huzhan.springboot.entity.Rooms;
import cn.com.huzhan.springboot.utils.QiNiuUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

/**
 *   房屋的控制器层
 */
@Controller
@RequestMapping("/rooms")
public class RoomController extends BaseController<Rooms> {

    //上传房间封面图
    @RequestMapping("/uploadPic")
    public @ResponseBody
    Map<String, Object> uploadPic(MultipartFile myFile) {
        //return QiNiuUtils.upload(myFile);
        return QiNiuUtils.upload(myFile);
    }
}
