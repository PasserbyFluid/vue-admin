<template>
    <el-card class="box-card">
        <el-card class="box-card">
            <strong style="margin-right:20px;">总计：<span style="color:#ff12d6;">2222</span>元</strong>
            <el-date-picker
                v-model="date"
                type="datetimerange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" @click="onSubmit">筛选</el-button>
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
            date:'',
            tableData:[]
        }
    },
    methods:{
        onSubmit(){

        }
    }
}
</script>
