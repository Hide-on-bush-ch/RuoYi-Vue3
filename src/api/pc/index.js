import request from "@/utils/request";
import { parseStrEmpty } from "@/utils/ruoyi";

export default {
  // 文件检查
  fileCheck(data) {
    return request({
      url: "/file/check/doc",
      method: "post",
      data
    });
  },
  // 文件目录
  fileContent(data) {
    return request({
      url: "/file/check/path",
      method: "post",
      data
    });
  },
  // 启动指令
  start(query) {
    return request({
      url: "/check/event/start/" + parseStrEmpty(query),
      method: "get",
    });
  },
  // 下发指令
  send(query) {
    return request({
      url: "/check/event/send/" + parseStrEmpty(query),
      method: "get",
    });
  },
  // 查询基本表格
  getPcInfo(query) {
    return request({
      url: "/system/info/list",
      method: "get",
      params: query,
    });
  },
  // 新增基本表格
  addPcInfo(data) {
    return request({
      url: "/system/info",
      method: "post",
      data,
    });
  },
  // 查询基本信息
  getBasicInfo(ip) {
    return request({
      url: "/file/parsing?ip="+ip,
      method: "post",
    });
  },
  // 查询操作系统信息
  getSystemInfo(ip) {
    return request({
      url: "/file/system?ip="+ip,
      method: "post",
    });
  },
  // 查询CPU信息
  getCpuInfo(ip) {
    return request({
      url: "/file/cpu?ip="+ip,
      method: "post",
    });
  },
  // 查询存储设备信息
  getStorageInfo(ip) {
    return request({
      url: "/file/storage?ip="+ip,
      method: "post",
    });
  },
  // // 查询存储设备信息
  // getStorageInfo2() {
  //   return request({
  //     url: "/check/event/send/1",
  //     method: "get",
  //   });
  // },
  // 查询usb设备信息
  getUsbInfo(ip) {
    const data = {
      aaa: "a",
    };
    return request({
      url: "/file/usb?ip="+ip,
      method: "post",
      data,
    });
  },
};
