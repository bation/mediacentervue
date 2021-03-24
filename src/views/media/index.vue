<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <h4>目录</h4>
        <div class="dir-c">
          <div v-for="(item,index) in dirList" :key="index" @click="handleDirClicked(item)">
            <el-card :class="'dir-list '+item.selected">
              <div class="text">
                {{item.path}}
              </div>
            </el-card>
          </div>

        </div>


      </el-col>
      <el-col :span="18">
        <el-table :data="videoList" style="width: 100%">
          <el-table-column prop="filename" label="文件名" align="center" />
          <el-table-column prop="path" label="路径" align="center" />
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="primary">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="media-list" v-for="(item,index) in videoList" :key="index">
          <div>{{item.filename}}</div>
          <media-component-inline :videoSrc="item.path" />

        </div> -->

      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible" v-if="dialogVisible" width="70%" top="10" :before-close="handleClose">
      <media-component-inline :videoSrc="videoSrc" />

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getMediaList,
    getDirList
  } from "@/api/media"
  import mediaComponentInline from './mediaComponentInline.vue'
  export default {
    components: {
      mediaComponentInline
    },
    data() {
      return {
        dirList: [],
        videoList: [],
        videoSrc: '',
        dialogVisible: false,
      }
    },

    mounted() {

      getDirList({
        path: "G:\\BaiduNetdiskDownload"
      }).then(res => {
        this.dirList = res
      });
    },
    methods: {
      handleDirClicked(item) {
        for (let i = 0; i < this.dirList.length; i++) {
          const item = this.dirList[i];
          item.selected = ''
        }
        item.selected = "selected"
        getMediaList({
          path: item.path
        }).then(res => {
            for (let i = 0; i < res.length; i++) {
                const item = res[i];
                item.path = item.path.replace("G:\\BaiduNetdiskDownload",'http://192.168.31.27/media')
            }
          this.videoList = res
        });
      },
      handleClick(row) {
        console.log(row.path)
        this.dialogVisible = true
        this.videoSrc = row.path
      },
      handleClose() {
        this.dialogVisible = false
      }
    }
  }

</script>

<style lang="scss">
  .app-container {
    .dir-c {
      height: 80vh;
      overflow: auto;

      .dir-list {
        cursor: pointer;
        margin: 5px;

        .text {
          padding: 5px;
        }

        .selected {
          color: gainsboro;
          background: gray;
        }

        &:hover {
          color: gainsboro;
          background: gray;
        }
      }
    }


    .media-list {
      width: 30%;
      display: inline-block;
      margin: 10px;
    }
  }

</style>
