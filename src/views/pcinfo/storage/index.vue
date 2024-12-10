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
    label: "存储设备信息",
    tableHead: [
      { prop: "SN", label: "序列号" },
      { prop: "detail", label: "分区信息" },
      { prop: "company", label: "厂商" },
      { prop: "product", label: "产品型号" },
      { prop: "type", label: "类型" },
    ],
    tableData: [],
  },
  {
    name: "hardDisk",
    label: "硬盘挂载情况",
    tableHead: [
      { prop: "bootTimes", label: "启动次数" },
      { prop: "controllerPosition", label: "控制器位置" },
      { prop: "masterSlave", label: "主从关系" },
    ],
  },
  {
    name: "dataProtection",
    label: "数据保护分区",
    tableHead: [
      { prop: "totalDiskSpace", label: "总容量" },
      { prop: "usedSize", label: "已使用容量" },
      { prop: "Using", label: "是否正在使用" },
      { prop: "status", label: "运行状态" },
    ],
  },
]);

const currentTabs = ref("");

const getDataInfo = async (val) => {
  const res = await http.getStorageInfo();
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
  } else if (val === "hardDisk") {
    return res.map((item) => {
      const obj = {};
      for (let key in item) {
        if (tabs.value[1].tableHead.map((item) => item.prop).includes(key)) {
          obj[key] = item[key];
        }
      }
      return obj;
    });
  } else if (val === "dataProtection") {
    return res.map((item) => {
      const obj = {};
      for (let key in item) {
        if (tabs.value[2].tableHead.map((item) => item.prop).includes(key)) {
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
