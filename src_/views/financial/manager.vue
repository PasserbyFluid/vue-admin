<template>
    <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收支列表" name="first">
                <shou-zhi></shou-zhi>
            </el-tab-pane>
            <el-tab-pane label="财务报表" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="收款对账表" name="fourth">定时任务补偿</el-tab-pane>
            <el-tab-pane label="送货单对账表" name="five">定时任务补偿</el-tab-pane>
            <el-tab-pane label="付款对账表" name="six">定时任务补偿</el-tab-pane>
            <el-tab-pane label="采购订单到货对账表" name="seven">定时任务补偿</el-tab-pane>
            <el-tab-pane label="应收账款总表" name="eight">定时任务补偿</el-tab-pane>
            <el-tab-pane label="应付账款总表" name="nine">定时任务补偿</el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script>
import ShouZhi from "@/components/financial/shouzhi";

export default {
    components:{ShouZhi},
    data() {
        return {
            activeName: 'first'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>