<template>
	<div class="app-container" id="customer-add">
		<el-card class="box-card">
			<el-form ref="form" :model="form" label-width="120px" :inline="true">
				<el-row :gutter="20">
					<el-col :span="6" v-for="(item,index) in labels" :key="index">
						<el-form-item :label="item.content" v-if="item.type == 'input'">
							<el-input v-model="item.value" />
						</el-form-item>
						<el-form-item :label="item.content" v-else-if="item.type == 'date'">
							<el-date-picker
								v-model="item.value"
								align="right"
								type="date"
								placeholder="选择日期"
								value-format="yyyy-MM-dd"
								>
							</el-date-picker>
						</el-form-item>
						<el-form-item :label="item.content" v-else>
							<el-select v-model="item.value" :placeholder="item.content" >
								<el-option label="淘宝" value="淘宝"/>
								<el-option label="天猫" value="天猫"/>
							</el-select>
						</el-form-item>
					</el-col>
					<!-- <el-col :span="6">
						<el-form-item label="定稿日期">
							<el-date-picker
								v-model="form.dingdate"
								align="right"
								type="date"
								placeholder="选择日期"
								value-format="yyyy-MM-dd"
								>
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="客户来源">
						<el-select v-model="form.source" placeholder="选择客户来源">
							<el-option label="淘宝" value="淘宝"/>
							<el-option label="天猫" value="天猫"/>
						</el-select>
						</el-form-item>
					</el-col> -->
				</el-row>
				<!-- <el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="订单编号">
							<el-input v-model="form.ordercode" disabled />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="定稿日期">
							<el-date-picker
								v-model="form.dingdate"
								align="right"
								type="date"
								placeholder="选择日期"
								value-format="yyyy-MM-dd"
								>
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="客户来源">
						<el-select v-model="form.source" placeholder="选择客户来源">
							<el-option label="淘宝" value="淘宝"/>
							<el-option label="天猫" value="天猫"/>
						</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="聊天旺旺">
						<el-input v-model="form.aliwwliao"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="付款旺旺">
						<el-input v-model="form.aliwwfu"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="客户类型">
							<el-select v-model="form.kehu" placeholder="选择客户类型">
								<el-option label="店面" value="店面"/>
								<el-option label="公司" value="公司"/>
								<el-option label="印刷广告" value="印刷广告"/>
								<el-option label="设计" value="设计"/>
								<el-option label="软件公司" value="软件公司"/>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="卡名">
						<el-input v-model="form.card"/>
						<el-button >删除</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="工艺">
						<el-input v-model="form.gy"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="数量">
						<el-input v-model="form.count"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="单价">
						<el-input v-model="form.price"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="版费">
						<el-input v-model="form.banfei"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="加急费">
						<el-input v-model="form.jiaji"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="收金额">
						<el-input v-model="form.shoumoney"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="定金">
						<el-input v-model="form.dingmoney"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="余款">
						<el-input v-model="form.shengmoney"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="付款方式">
						<el-input v-model="form.payment"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="拍款时间">
							<el-date-picker
								v-model="form.paytime"
								align="right"
								type="date"
								placeholder="选择日期"
								value-format="yyyy-MM-dd"
								>
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="货期">
						<el-input v-model="form.huoqi"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车间">
						<el-input v-model="form.chejian"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="单价">
						<el-input v-model="form.price1"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="版费">
						<el-input v-model="form.banfei1"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="加急费">
						<el-input v-model="form.jiaji1"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="卡款出">
						<el-input v-model="form.kakuan"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="供应商结款">
						<el-input v-model="form.jiekuan"/>
						<el-button >删除</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="利润">
						<el-input v-model="form.lirun"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="刷卡器">
						<el-input v-model="form.shuakaqi"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="系统">
						<el-input v-model="form.system"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="邮费">
						<el-input v-model="form.youfei"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="金属标签">
						<el-input v-model="form.label"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="发票类型">
							<el-select v-model="form.fapiao" placeholder="发票税点 ">
								<el-option label="普通发票6%" value="普通发票6%"/>
								<el-option label="专用发票6%" value="专用发票6%"/>
								<el-option label="专用发票13%" value="专用发票13%"/>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="退款">
						<el-input v-model="form.tuikuan"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="总支出">
						<el-input v-model="form.zhichu"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="纯利">
						<el-input v-model="form.chunli"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="提点">
						<el-input v-model="form.tidian"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="设计">
						<el-input v-model="form.sheji"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="收货地址">
						<el-input v-model="form.dizhi"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="快递方式">
						<el-input v-model="form.kuaidi"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="备注">
						<el-input v-model="form.beizhu"/>
						</el-form-item>
					</el-col>
				</el-row> -->
				<el-row :gutter="20">
					<el-col :span="6" style="text-align:center;">
						<el-form-item>
						<div class="btn-box">
							<el-button type="primary" @click="onSubmit">确认</el-button>
							<el-button @click="onCancel">取消</el-button>
						</div>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
	</template>

	<script>
	import { getToken} from '@/utils/auth'
	export default {
	data() {
		return {
			form: {
				ordercode:new Date().format("yyyyMMddhhmmssS"),
				dingdate:'',
				source: "",
				aliwwliao: "",
				aliwwfu: "",
				kehu: "",
				card:'',
				gy:'',
				count:'',
				price:'',
				banfei: "",
				jiaji: "",
				shoumoney: '',
				dingmoney: '',
				shengmoney: '',
				payment:'',
				paytime:'',
				huoqi:'',
				chejian:'',
				price1:'',
				banfei1:'',
				jiaji1:'',
				kakuan:'',
				jiekuan:'',
				lirun:'',
				shuakaqi:'',
				system:'',
				youfei:'',
				label:'',
				fapiao:'',
				tuikuan:'',
				zhichu:'',
				chunli:'',
				tidian:'',
				sheji:'',
				dizhi:'',
				kuaidi:'',
				beizhu:'',
				uid:getToken()
			},
			pickerOptions: {
			disabledDate(time) {
				return time.getTime() > Date.now();
			},
			shortcuts: [{
				text: '今天',
				onClick(picker) {
				picker.$emit('pick', new Date());
				}
			}, {
				text: '昨天',
				onClick(picker) {
				const date = new Date();
				date.setTime(date.getTime() - 3600 * 1000 * 24);
				picker.$emit('pick', date);
				}
			}, {
				text: '一周前',
				onClick(picker) {
				const date = new Date();
				date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
				picker.$emit('pick', date);
				}
		  	}]
			},
			labels:[]
		};
	},
	mounted(){
		this.getLabels()
	},
	methods: {
		getLabels() {
			this.$http({
				url: '/login/Consumer/getLabels',
				method: 'post',
				data:this.form
			}).then((res) => {
				this.labels = res.data;
				// if (res.code == 1) {
				// 	this.$notify({
				// 		title: '成功',
				// 		message: '添加成功',
				// 		type: 'success'
				// 	});
				// 	this.form.ordercode = new Date().format("yyyyMMddhhmmssS")
				// 	// this.$message.success('添加成功')
				// }
				console.log(res)
			})
		},
		onSubmit() {
			console.log(this.labels)
			this.$http({
				url: '/login/login/addcustomer',
				method: 'post',
				data:this.form
			}).then((res) => {
				if (res.code == 1) {
					this.$notify({
						title: '成功',
						message: '添加成功',
						type: 'success'
					});
					this.form.ordercode = new Date().format("yyyyMMddhhmmssS")
					// this.$message.success('添加成功')
				}
				console.log(res)
			})
		},
		onCancel() {
			this.$router.go(-1)
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
			console.log(results, header)
		this.tableData = results
		this.tableHeader = header
		},
	}
	};
	</script>

		<style scoped>
	.line {
	text-align: center;
	}
	</style>

