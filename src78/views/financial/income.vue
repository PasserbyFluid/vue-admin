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
						<el-form-item label=""  label-width='0' prop="jine">
							<el-input v-model="ruleForm.jine" placeholder="收入金额"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label=""  label-width='0' prop="payment">
							<el-select v-model="ruleForm.payment" placeholder="付款方式">
							<el-option label="现金" value="现金"></el-option>
							<el-option label="支付宝" value="支付宝"></el-option>
							<el-option label="微信" value="微信"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label=""  label-width='0' required>
							<!-- <el-col :span="4"> -->
							<el-form-item prop="date">
								<el-date-picker
								type="date"
								placeholder="选择日期"
								v-model="ruleForm.date"
								style="width: 100%;"
								></el-date-picker>
							</el-form-item>
							<!-- </el-col> -->
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label=""  label-width='0' prop="name">
							<el-select v-model="ruleForm.name" placeholder="查款人">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label=""  label-width='0' prop="type">
							<el-select v-model="ruleForm.type" placeholder="收入类型">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label=""  label-width='0' prop="beizhu">
							<el-input v-model="ruleForm.beizhu" placeholder="备注"></el-input>
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
			<el-card class="box-card">
				<!-- <el-card class="box-card">
					客户：<el-select v-model="ruleForm.region" placeholder="查款人" style="width:200px;">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
					<el-checkbox v-model="isShowBeizhu">备注</el-checkbox>
					<el-input type="textarea" :rows="2" v-if="isShowBeizhu" style="width:200px;" v-model="input" placeholder="请输入内容"></el-input>
				</el-card> -->
				<el-table
					:data="tableData"
					style="width: 100%">
					<el-table-column
						prop="jine"
						label="金额"
						width="180">
					</el-table-column>
					<el-table-column
						prop="payment"
						label="付款方式"
						width="180">
					</el-table-column>
					<el-table-column
						prop="date"
						label="日期">
					</el-table-column>
					<el-table-column
						prop="name"
						label="查款人">
					</el-table-column>
					<el-table-column
						prop="type"
						label="收入类型">
					</el-table-column>
				</el-table>
				<el-pagination
					@current-change="pageChange"
					:current-page='query.page'
					:page-size="query.pageSize"
					layout="total, prev, pager, next, jumper"
					:total="total">
				</el-pagination>
			</el-card>
		</div>
	</template>

	<script>
	import { getToken,getPower } from '@/utils/auth'
	export default {
	data() {
		return {
			ruleForm: {
				name: "",
				jine: "",
				date:new Date(),
				payment: "",
				type: '',
				beizhu:'',
				uid:getToken()
			},
			rules: {
				name: [
					{ required: true, message: "请输入查款人", trigger: "blur" },
					],
				jine: [
				{ required: true, message: "请输入金额", trigger: "change" }
				],
				date: [
				{
					type: "date",
					required: true,
					message: "请选择日期",
					trigger: "change"
				}
				],
				payment: [
				{ required: true, message: "请选择收入方式", trigger: "change" }
				],
				type: [{ required: true, message: "请填写收入类型", trigger: "blur" }]
			},
			tableData: [],
			isShowBeizhu:false,
			query:{
				uid:getToken(),
				page:1,
				pageSize:10
			},
			total:0
		};
	},
	mounted(){
		this.getList()
	},
	methods: {
		pageChange(p){
            this.query.page = p;
            this.getList()
            console.log(p)
        },
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$http({
						url: '/login/login/addIncome',
						method: 'post',
						data:this.ruleForm
					}).then((res) => {
							console.log(res)
							this.getList()
					}).catch(()=>{
					})
				}
			})
		},
		getList() {
			this.$http({
                url: '/login/login/getIncomeList',
                method: 'post',
                data:this.query
            }).then((res) => {
                // this.listLoading = false
                    console.log(res)
                if (res.code == 1) {
                    this.total = res.total;
                    this.tableData = res.data;
                }else{
                    // this.$message.success('获取列表成功')
                    this.list = []
                    this.total = 0
                }
            }).catch(()=>{
                this.listLoading = false
            })
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
