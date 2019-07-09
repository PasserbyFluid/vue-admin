<template>
  <div class="app-container">
    <el-card class="box-card">
        <div class="btn-box">
            <el-row :gutter="20">
                <el-col :span="6">
                    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="onSubmit">确认添加</el-button>
                    <el-button @click="onCancel">取消</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;" empty-text='预览区域'>
            <el-table-column v-for="(item,index) of tableHeader" :key="index" :prop="item" :label="item"/>
        </el-table>
    </el-card>
  </div>
</template>

<script>
import UploadExcelComponent from "@/components/uploadexcel";
export default {
  components: { UploadExcelComponent },
  data() {
    return {
        tableData:[],
        tableHeader:[]
    };
  },
  methods: {
    onSubmit() {
		console.log(this.tableData)
		this.$http({
			url: '/login/login/batchaddcustomer',
			method: 'post',
			data:this.tableData
		}).then((res) => {
			if (res.code == 1) {
				this.$message.success('添加成功')
			}
			console.log(res)
		})
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
	},
	beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
		this.tableData = results
		// console.log(this.tableData)
      this.tableHeader = header
    }
  }
};
</script>

	<style scoped>
.line {
  text-align: center;
}
</style>

