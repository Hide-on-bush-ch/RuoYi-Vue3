import request from "@/utils/request";

export default {
  // 查询基本信息
  getBasicInfo() {
    return request({
      url: "/file/parsing",
      method: "post",
    });
  },
  // 查询操作系统信息
  getSystemInfo() {
    return request({
      url: "/file/system",
      method: "post",
    });
  },
  // 查询CPU信息
  getCpuInfo() {
    return request({
      url: "/file/cpu",
      method: "post",
    });
  },
  // 查询存储设备信息
  getStorageInfo() {
    return request({
      url: "/file/storage",
      method: "post",
    });
  },
  // 查询usb设备信息
  getUsbInfo() {
    return request({
      url: "/file/usb",
      method: "post",
    });
  },
};
