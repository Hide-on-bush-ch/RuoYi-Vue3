<template>
  <div class="container">
    <div class="client" v-for="item in itemList" :key="item.ip">
      <div class="header">
        <div class="left">
          <img src="@/assets/404_images/404.png" alt="" />
        </div>
        <div class="right">
          <div>{{ item.ip }}</div>
          <el-tag type="danger" v-if="item.powerOnStatus === 0">关机</el-tag>
          <el-tag type="success" v-if="item.powerOnStatus === 1">开机</el-tag>
        </div>
      </div>
      <el-divider />
      <el-checkbox-group v-model="item.checkedList">
        <el-checkbox
          v-for="ite in checkList"
          :key="ite.value"
          :label="ite.label"
          :value="ite.value"
        />
      </el-checkbox-group>
      <el-button color="#626aef" :dark="isDark" plain size="mini"
      @click="check(item)"
        >检查</el-button
      >
    </div>
  </div>
</template>

<script setup>
import http from "@/api/pc";
import tab from "@/plugins/tab";
import deepClone from "@/utils/deepClone";

const itemList = ref([]);
// const itemList = ref([
//   {
//     ip: "192.168.1.1",
//     powerOnStatus: 0,
//     checkedList: [],
//   },
//   {
//     ip: "192.168.1.1",
//     powerOnStatus: 0,
//     checkedList: [],
//   },
//   {
//     ip: "192.168.1.1",
//     powerOnStatus: 0,
//     checkedList: [],
//   },
//   {
//     ip: "192.168.1.1",
//     powerOnStatus: 0,
//     checkedList: [],
//   },
//   {
//     ip: "192.168.1.1",
//     powerOnStatus: 0,
//     checkedList: [],
//   },
//   {
//     ip: "192.168.1.1",
//     powerOnStatus: 0,
//     checkedList: [],
//   },
// ]);

const checkList = ref([
  {
    label: "计算机基本信息检查",
    value: "/pcinfo/pc",
  },
  {
    label: "存储设备信息检查",
    value: "/pcinfo/storage",
  },
  {
    label: "USB设备使用记录检查",
    value: "/pcinfo/usb",
  },
]);

// const checkList = ref([
//   {
//     label: "操作系统信息",
//     value: "systemInfo",
//   },
//   {
//     label: "硬件信息",
//     value: "hardwareInfo",
//   },
//   {
//     label: "网卡信息",
//     value: "networkInfo",
//   },
// ]);

const getPcinfo = async () => {
  const data = {
    pageNum: 1,
    pageSize: 10,
  };
  const res = await http.getPcInfo(data);
  res.rows.forEach((item) => {
    item.checkList = deepClone(checkList);
  });
  itemList.value = res.rows;
};

const addPcInfo = async () => {
  const res = await http.getPcInfo(data);
  if (res.code == 200) {
    proxy.$modal.msgSuccess("新增成功");
    open.value = false;
    getList();
  }
};
getPcinfo();

const check = (item) => {
  if (item.checkedList.length > 0) {
    console.log(item.checkedList[0], item.ip);
    tab.changeMenu(item.checkedList[0], { ip: item.ip });
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .client {
    width: 250px;
    height: 280px;
    padding: 10px;
    border: 1px solid #ccc;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    .header {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .left {
        width: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        width: 50%;
      }
    }
    .el-divider {
      width: 100%;
      margin: 10px 0;
    }
    .el-checkbox-group {
      .el-checkbox {
        width: 100%;
        margin: 5px 0;
        background-color: #ccc;
      }
    }
    .el-button {
      position: relative;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
