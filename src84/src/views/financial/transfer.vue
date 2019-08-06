<template>
    <el-card class="box-card">
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
                        <el-input v-model="ruleForm.name" placeholder="金额"></el-input>
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="4">
                    <el-form-item label=""  label-width='0' prop="region">
                        <el-select v-model="ruleForm.region" placeholder="付款方式">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col> -->
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
                <el-col :span="1">
                    <div class="to">→</div>
                </el-col>
                <el-col :span="4">
                    <el-form-item label=""  label-width='0' prop="region">
                        <el-select v-model="ruleForm.region" placeholder="收入类型">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label=""  label-width='0' prop="name">
                        <el-input type="textarea" :rows="2" v-model="ruleForm.name" placeholder="备注"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                    </el-form-item>
                </el-col> 
            </el-row>
            </el-form>
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
</template>
<script>
export default {
    data(){
        return{
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
        }
    },
    methods:{
        onSubmit(){

        }
    }
}
</script>
<style>
.to{
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
</style>
