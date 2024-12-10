<template>
  <div class="container">
    <el-tabs v-model="currentTabs" type="card" @tab-change="tabsChange">
      <el-tab-pane
        v-for="item in tabs"
        :key="item.name"
        :name="item.name"
        :label="item.label"
      >
        <div>
          <el-table
            v-loading="loading"
            element-loading-text="数据正在加载中..."
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="item.tableData"
          >
            <el-table-column
              v-for="ite in item.tableHead"
              :key="ite.prop"
              :prop="ite.prop"
              :label="ite.label"
            >
              <template #default="scope">
                <span>{{ scope.row[ite.prop] }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import http from "@/api/pc";

const loading = ref(false);

const tabs = ref([
  {
    name: "device",
    label: "usb设备信息",
    tableHead: [
      { prop: "PID", label: "PID" },
      { prop: "SN", label: "序列号" },
      { prop: "busNum", label: "总线号" },
      { prop: "company", label: "厂商" },
      { prop: "description", label: "描述" },
      { prop: "deviceName", label: "设备名称" },
      { prop: "deviceNum", label: "设备编号" },
      { prop: "id", label: "设备ID" },
      { prop: "type", label: "设备类型" },
      { prop: "usbStore", label: "USB存储" },
    ],
    tableData: [],
  },
  {
    name: "log",
    label: "使用记录",
    tableHead: [
      { prop: "firstDate", label: "开始使用时间" },
      { prop: "lastDate", label: "结束使用时间" },
    ],
    tableData: [],
  },
]);

const currentTabs = ref("");

const getDataInfo = async (val) => {
  const res = await http.getUsbInfo();
  if (val === "device") {
    return res.map((item) => {
      const obj = {};
      for (let key in item) {
        if (tabs.value[0].tableHead.map((item) => item.prop).includes(key)) {
          obj[key] = item[key];
        }
      }
      return obj;
    });
  } else if (val === "log") {
    return res.map((item) => {
      const obj = {};
      for (let key in item) {
        if (tabs.value[1].tableHead.map((item) => item.prop).includes(key)) {
          obj[key] = item[key];
        }
      }
      return obj;
    });
  }
};

const tabsChange = async () => {
  loading.value = true;
  const data = await getDataInfo(currentTabs.value);
  loading.value = false;
  tabs.value.find((item) => item.name === currentTabs.value).tableData = data;
};
getDataInfo();
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  // display: flex;
  // justify-content: space-around;
  // align-items: center;

  :deep(.el-tabs) {
    .el-tabs__nav {
      margin: 0 auto;
    }

    .el-tabs__content {
      height: 100%;

      .el-table {
        height: 100%;
      }
    }
  }
}
</style>
