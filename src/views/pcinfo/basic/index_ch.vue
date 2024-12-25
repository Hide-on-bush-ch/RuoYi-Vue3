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
    name: "system",
    label: "操作系统信息",
    tableHead: [
      { prop: "installTime", label: "安装时间" },
      { prop: "name", label: "主机名" },
      { prop: "path", label: "安装路径" },
      { prop: "version", label: "系统版本" },
      { prop: "isMultiple", label: "是否安装多个操作系统" },
    ],
    tableData: [],
  },
  {
    name: "cpu",
    label: "CPU信息",
    tableHead: [
      { prop: "处理器", label: "cpu型号" },
      { prop: "处理器数量", label: "cpu数量" },
      { prop: "cpu主频", label: "cpu频率" },
    ],
    tableData: [],
  },
  {
    name: "user",
    label: "用户信息",
    tableHead: [
      { prop: "createDatetime", label: "创建时间" },
      { prop: "groupId", label: "分组ID" },
      { prop: "homeName", label: "家庭名称" },
      { prop: "name", label: "用户名" },
      { prop: "password", label: "密码" },
      { prop: "userId", label: "用户ID" },
    ],
    tableData: [],
  },
  {
    name: "networkCard",
    label: "网卡信息",
    tableHead: [
      { prop: "DNS", label: "DNS" },
      { prop: "IP", label: "IP" },
      { prop: "MAC", label: "MAC" },
      { prop: "defaultGateway", label: "默认网关" },
      { prop: "isRealObtain", label: "是否真实获取" },
      { prop: "mask", label: "子网掩码" },
      { prop: "name", label: "名称" },
    ],
    tableData: [],
  },
]);

const currentTabs = ref("");

const getDataInfo = async (val) => {
  if (val === "system") {
    const res = await http.getSystemInfo();
    return res;
  } else if (val === "cpu") {
    const res = await http.getCpuInfo();
    const obj = {};
    res.forEach((item) => {
      item.description
        .split(";")
        .map((ite, i) => {
          if (i === 0) {
            ite = ite.replace(": ", "");
          }
          return ite.trim();
        })
        .forEach((ite, i) => {
          obj[ite.split(":")[0]] = ite.split(":")[1];
        });
    });
    return [obj];
  } else if (val === "user") {
    const res = await http.getBasicInfo();
    return JSON.parse(res["用户信息"]);
  } else if (val === "networkCard") {
    const res = await http.getBasicInfo();
    return JSON.parse(res["网卡信息"]);
  }
};

const tabsChange = async () => {
  loading.value = true;
  const data = await getDataInfo(currentTabs.value);
  loading.value = false;
  tabs.value.find((item) => item.name === currentTabs.value).tableData = data;
};
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
