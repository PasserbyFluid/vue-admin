<template>
    <div class id="income">
        <el-card class="box-card">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                class="demo-ruleForm"
            >
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-form-item label=""  label-width='0' prop="name">
                        <el-input v-model="ruleForm.name" placeholder="支出金额"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label=""  label-width='0' prop="region">
                        <el-select v-model="ruleForm.region" placeholder="付款方式">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label=""  label-width='0' required>
                        <!-- <el-col :span="4"> -->
                        <el-form-item prop="date1">
                            <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="ruleForm.date1"
                            style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                        <!-- </el-col> -->
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label=""  label-width='0' prop="region">
                        <el-select v-model="ruleForm.region" placeholder="查款人">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label=""  label-width='0' prop="region">
                        <el-select v-model="ruleForm.region" placeholder="支出类型">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                    </el-form-item>
                </el-col> 
            </el-row>
            </el-form>
        </el-card>
        <el-card class="box-card">
            <el-card class="box-card">
                客户：<el-select v-model="ruleForm.region" placeholder="查款人" style="width:200px;">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                <el-checkbox v-model="isShowBeizhu">备注</el-checkbox>
                <el-input v-if="isShowBeizhu" style="width:200px;" v-model="input" placeholder="请输入内容"></el-input>
            </el-card>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: new Date(),
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
        isShowBeizhu:false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
.box-card+.box-card{
    margin-top: 20px;
}
</style>
