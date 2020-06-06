<template>
  <div class="mod-log">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <!--<el-form-item>-->
      <!--<el-input v-model="dataForm.key" placeholder="工程师编号／工程师姓名" clearable></el-input>-->
      <!--</el-form-item>-->
      <el-form-item>
        <!-- <span class="demonstration"></span> -->
        <el-date-picker v-model="selecteTime" type="daterange" format="yyyy-MM-dd" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
        </el-date-picker>
        <!-- <el-date-picker value-format="yyyy-MM-dd" v-model="startDay" type="date" @blur="timeChecked" placeholder="选择开始日期:"></el-date-picker> -->
        <!-- <span class="demonstration">&minus; &minus;</span> -->
        <!-- <el-date-picker value-format="yyyy-MM-dd" @blur="timeChecked" v-model="endDay" type="date" placeholder="选择结束日期" width="50"></el-date-picker> -->

        <el-button @click="getDataList()">查询</el-button>
        <el-button @click="output">导出数据</el-button>
      </el-form-item>
    </el-form>
    <!-- 导出表 -->
    <div class="out-data">
      <el-table id="outTable" ref="multipleTable" :data="outList">
        <el-table-column prop="gcsbh" label="工程师编码"></el-table-column>
        <el-table-column prop="gcsxm" label="工程师姓名"></el-table-column>
        <el-table-column prop="subscribe" sortable label="扫关数"></el-table-column>
        <el-table-column prop="unsubscribe" sortable label="取关数"></el-table-column>
        <el-table-column prop="puresubscribe" sortable header-align="center" label="净扫关"></el-table-column>
      </el-table>
    </div>

    <el-table :data="dataList" border v-loading="dataListLoading" style="width: 100%">
      <el-table-column prop="gcsbh" label="工程师编码"></el-table-column>
      <el-table-column prop="gcsxm" label="工程师姓名"></el-table-column>
      <el-table-column prop="subscribe" sortable label="扫关数"></el-table-column>
      <el-table-column prop="unsubscribe" sortable label="取关数"></el-table-column>
      <el-table-column prop="puresubscribe" sortable header-align="center" label="净扫关"></el-table-column>
    </el-table>

    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
  </div>
</template>

<style lang='less'  >
.out-data {
  display: none;
}
.el-popper[x-placement^="bottom"] {
  margin-left: 15%;
}
</style>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
            // console.log(start.setTime(start.getTime() - 3600 * 1000 * 24 * 7))
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const start = new Date();

            const end = new Date();
            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      // value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      selecteTime: ['2020-04-1', ''],
      outList: [],
      isOut: false,
      startDay: "2020-04-1",
      endDay: "",
      dataForm: {
        key: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      selectionDataList: []
    };
  },
  created() {
    this.endDay = this.endtime()
    this.selecteTime[1] = this.endtime()
    this.getDataList();
  },
  methods: {
    //动态默认结束时间
    endtime() {
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
        : nowDate.getMonth() + 1;
      var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
        .getDate() - 1;
      var dateStr = year + "-" + month + "-" + day;
      return dateStr
    },
    outEx() {
      var wb = XLSX.utils.table_to_book(document.querySelector("#outTable")); //mytable为表格的id名
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "API工程师扫关.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log();
        // console.log(e, wbout);
      }
      return wbout;
    },
    timeChecked() {
      // console.log(this.startDay + "=======" + this.endDay);
    },
    //数据导出
    output() {
      let isExport = "export";
      let _this = this;
      this.getDataList(isExport);
      setTimeout(function () {
        _this.outEx();
      }, 1000);
    },

    // 获取数据列表
    getDataList(isExport) {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/rpt/gcsscan/list"),
        method: "get",
        params: this.$http.adornParams({
          queryType: isExport,
          startDay: this.selecteTime[0],
          endDay: this.selecteTime[1],
          page: this.pageIndex,
          limit: this.pageSize,
          key: this.dataForm.key
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          if (isExport && isExport == "export") {
            this.outList = data.page.list;
          } else {
            this.dataList = data.page.list;
            this.totalPage = data.page.totalCount;
          }
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    }
  }
  //数据导出函数
};
</script>
