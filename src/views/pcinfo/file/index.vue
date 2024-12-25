<template>
  <div class="container">
    <div class="main" v-if="isMain">
      <h1 class="title">文件内容检查策略</h1>
      <el-divider />
      <div>
        <div style="font-weight: bold">检查策略</div>
        <el-radio-group v-model="radio">
          <el-radio :value="1">搜到文件名且搜到文件内容</el-radio>
          <el-radio :value="2">仅搜到文件名</el-radio>
          <el-radio :value="3">仅搜到文件内容</el-radio>
        </el-radio-group>
      </div>
      <div class="keywords">
        <div class="keyword">
          <div v-if="radio === 1 || radio === 2" style="margin-left: 10px">
            <span style="font-weight: bold">文件名关键字</span>
            <el-input v-model="fileName" placeholder="请输入"></el-input>
          </div>
          <div v-if="radio === 1 || radio === 3" style="margin-left: 10px">
            <span style="font-weight: bold">文件内容关键字</span>
            <el-input v-model="fileContent" placeholder="请输入"></el-input>
          </div>
        </div>
      </div>
      <div class="fileType">
        <div style="font-weight: bold">检查文件类型</div>
        <div class="">
          <div>
            <el-radio-group v-model="fileType">
              <el-radio :value="1"
                >文档文件（*.doc,*.docx,*.txt*,*.rtf,*.xis,
                *._xsx,*.wps,*.dps,*.pps,*.et,*.ppt,*.pptx,*.pdf）</el-radio
              >
              <el-radio :value="2"
                >图片文件(*.tbmp,*.jpg,*.jpeg,*.db,*.png,*.gif,
                *.tf,*.t)</el-radio
              >
              <el-radio :value="4">压缩文件(*.zip,*.7z,*.iso,*.tar)</el-radio>
              <el-radio :value="16"
                >邮箱文件(*.dbx,*.box.*.pst,*.emllt,*.dm)</el-radio
              >
            </el-radio-group>
          </div>
          <div>
            <el-radio-group v-model="fileType">
              <el-radio :value="'customer'">自定义后缀</el-radio>
              <el-input v-model="suffix" placeholder="请输入"></el-input>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="positions">
        <div style="font-weight: bold">检查位置</div>
        <div class="position">
          <el-button plain :icon="Plus" @click="addPath">添加路径</el-button>
          <div class="text">
            <span style="margin: 0 40px 0 10px">{{ currentPath }}</span>
            <Delete
              style="
                width: 1em;
                height: 1em;
                margin-right: 8px;
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
                cursor: pointer;
              "
              @click="deletePath"
            ></Delete>
          </div>
          <!-- <div style="border: 1px solid #ccc; padding: 10px 20px">
            {{ currentPath }}
          </div>
          <div>
            <div @click="addPath">添加路径</div>
            <div @click="removePath">删除路径</div>
          </div> -->
        </div>
      </div>

      <div class="submit">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button type="danger">取消</el-button>
      </div>
    </div>

    <div class="fileContent" v-else>
      <Back style="width: 1em; height: 1em; margin-right: 8px" @click="back" />
      <div>
        <span>文件目录：</span><span>{{ currentPath }}</span>
        <el-button size="mini" type="primary" @click="confirm">确定</el-button>
      </div>
      <ul>
        <li v-for="item in fileList" :key="item" @click="getPath(item)">
          <FolderOpened
            style="width: 1em; height: 1em; margin-right: 4px"
            @click="back"
          />
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import http from "@/api/pc";
import { useRoute } from "vue-router";
import { Delete, Plus } from "@element-plus/icons-vue";

const route = useRoute();

const radio = ref(1);

const fileName = ref("");
const fileContent = ref("");
const suffix = ref("");

const fileType = ref(1);

const isMain = ref(true);

const currentPath = ref("");

const fileList = ref([]);

const getFileList = async (path) => {
  currentPath.value = path;
  const data = {
    path,
  };
  const res = await http.fileContent(data);
  console.log(res);
  fileList.value = res;
};
getFileList("/");

const getPath = (val) => {
  currentPath.value = currentPath.value + "/" + val;
  if (currentPath.value !== "/") {
    currentPath.value = currentPath.value.replace("//", "/");
  }
  getFileList(currentPath.value);
};

const back = () => {
  if (currentPath.value === "/") {
    return;
  }
  const arr = currentPath.value.split("/");
  arr.pop();
  const path = arr.join("/");
  currentPath.value = path === "" ? "/" : path;
  getFileList(currentPath.value);
};

console.log(route);

const addPath = () => {
  getFileList("/");
  isMain.value = false;
};
const deletePath = () => {
  currentPath.value = "/";
};
const confirm = () => {
  isMain.value = true;
};
const submit = async () => {
  const data = {
    keywords: [fileContent.value],
    checkFile: [fileName.value],
    path: [currentPath.value],
    checkPolicy: radio.value,
    checkType: fileType.value,
    suffix: "",
  };
  console.log(data);
  const res = await http.fileCheck(data);
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: auto;
  .main {
    .title {
      // text-align: center;
    }
    .keywords {
      margin-top: 20px;
      .keyword {
        display: flex;
        // justify-content: space-around;
        align-items: center;
      }
    }
    .fileType {
      margin-top: 20px;
    }
    .positions {
      margin-top: 20px;
      .position {
        // display: flex;
        // justify-content: space-around;
        // align-items: center;
        .el-button {
          margin-top: 10px;
        }
        .text {
          width: fit-content;
          border: 1px solid #ccc;
          padding: 10px;
          position: relative;
          margin: 10px 0;
        }
      }
    }
    .submit {
      margin-top: 50px;
      display: flex;
      // justify-content: center;
      align-items: center;
    }
  }
  // display: flex;
  // justify-content: space-around;
  // align-items: center;
  .fileContent {
    .el-button{
      margin-left: 20px;
    }
    ul {
      list-style-type: none;
      li {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }
}
</style>
