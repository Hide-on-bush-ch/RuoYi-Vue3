<template>
  <div class="container">
    <el-tabs v-model="currentTabs" type="card" @tab-change="tabsChange">
      <el-tab-pane
        v-for="item in tabs"
        :key="item.name"
        :name="item.name"
        :label="item.label"
      >
        <template #default="scope">
          <div
            class="client"
            v-if="item.name === 'device'"
            v-for="ite in item.data"
            :key="ite.ip"
          >
            <div class="header">
              <div class="left">
                <img src="@/assets/404_images/404.png" alt="" />
              </div>
              <div class="right">
                <div class="top">
                  <span>5678</span>
                  <el-tag type="info">存储设备</el-tag>
                </div>
                <div class="bottom">
                  <span>4464846131774641</span>
                </div>
              </div>
            </div>
            <el-divider />
            <div class="content">
              <div class="top">
                <div class="item">
                  <div>描述</div>
                  <div>-</div>
                </div>
                <div class="item">
                  <div>描述</div>
                  <div>-</div>
                </div>
                <div class="item">
                  <div>描述</div>
                  <div>-</div>
                </div>
              </div>
              <div class="middle">
                <div class="item">
                  <div>描述</div>
                  <div>-</div>
                </div>
                <div class="item">
                  <div>描述</div>
                  <div>-</div>
                </div>
                <div class="item">
                  <div>描述</div>
                  <div>-</div>
                </div>
              </div>
              <div class="bottom">
                <div class="item">
                  <div>描述</div>
                  <div>-</div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="item.name === 'log'" class="log">
            <div class="item" v-for="item in 10" :key="item">
              <div>121212</div>
              <el-timeline style="max-width: 600px">
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :icon="activity.icon"
                  :type="activity.type"
                  :color="activity.color"
                  :size="activity.size"
                  :hollow="activity.hollow"
                  :timestamp="activity.timestamp"
                  placement="top"
                >
                  {{ activity.content }}
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import http from "@/api/pc";
import { useRoute } from "vue-router";

const route = useRoute();

const loading = ref(false);

const activities = [
  {
    content: "Custom color",
    timestamp: "2018-04-03 20:46",
    color: "#0bbd87",
  },
  {
    content: "Custom color",
    timestamp: "2018-04-03 20:46",
    color: "red",
  },
];

const tabs = ref([
  {
    name: "device",
    label: "usb设备信息",
    // tableHead: [
    //   { prop: "PID", label: "PID" },
    //   { prop: "SN", label: "序列号" },
    //   { prop: "busNum", label: "总线号" },
    //   { prop: "company", label: "厂商" },
    //   { prop: "description", label: "描述" },
    //   { prop: "deviceName", label: "设备名称" },
    //   { prop: "deviceNum", label: "设备编号" },
    //   { prop: "id", label: "设备ID" },
    //   { prop: "type", label: "设备类型" },
    //   { prop: "usbStore", label: "USB存储" },
    // ],
    data: [
      {
        ip: "192.168.1.1",
        powerOnStatus: 0,
        checkedList: [],
      },
      {
        ip: "192.168.1.1",
        powerOnStatus: 0,
        checkedList: [],
      },
      {
        ip: "192.168.1.1",
        powerOnStatus: 0,
        checkedList: [],
      },
    ],
  },
  {
    name: "log",
    label: "使用记录",
    // tableHead: [
    //   { prop: "firstDate", label: "开始使用时间" },
    //   { prop: "lastDate", label: "结束使用时间" },
    // ],
    data: [],
  },
]);

const currentTabs = ref("");

const getDataInfo = async (val) => {
  const res = await http.getUsbInfo(route.query.ip);
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

const getFileList = async () => {
  const res = await http.fileContent({ path: "/lib/firmware" });
  console.log(res);
};
getFileList();
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
      width: 100%;
      height: 100%;
      .el-tab-pane {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .client {
          width: 300px;
          height: 250px;
          padding: 10px;
          border: 1px solid #ccc;
          position: relative;
          display: flex;
          flex-direction: column;
          .header {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .left {
              width: 60px;
              img {
                width: 100%;
                // height: 100%;
              }
            }
            .right {
              // width: 50%;
            }
          }
          .el-divider {
            width: 100%;
            margin: 10px 0;
          }
          .content {
            width: 100%;
            flex: 1;
            border: 1px solid #ccc;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            // align-items: center;
            .top,
            .middle {
              height: 30%;
              // background-color: rgba($color: #000000, $alpha: 0.5);
              display: flex;
              justify-content: space-between;
              align-items: center;
              .item {
                width: 30%;
                height: 100%;
                background-color: rgba($color: #000000, $alpha: 0.5);
              }
            }
            .middle {
            }
            .bottom {
              height: 30%;
              // background-color: rgba($color: #000000, $alpha: 0.5);
              .item {
                width: 100%;
                height: 100%;
                background-color: rgba($color: #000000, $alpha: 0.5);
              }
            }
          }
        }
        .log {
          width: 800px;
          .item {
            display: flex;
              // justify-content: space-between;
              // align-items: center;
              margin: 10px 0;
            background-color: rgba($color: #000000, $alpha: 0.5);
          }
        }
      }
    }
  }
}
</style>
