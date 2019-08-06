	<template>
		<div class id="income">
			<el-card class="box-card">
				<el-form
					:model="ruleForm"
					ref="ruleForm"
					class="demo-ruleForm"
				>
				<el-row :gutter="20">
					<el-col :span="4">
						<el-form-item label=""  label-width='0'>
							<el-input v-model="queryOrder.code" placeholder="订单编号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label=""  label-width='0'>
							<el-input v-model="queryOrder.card" placeholder="卡名"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label=""  label-width='0' >
							<el-input v-model="queryOrder.chejian" placeholder="供应商"></el-input>
						</el-form-item>
					</el-col>
					<!-- <el-col :span="4">
						<el-form-item label=""  label-width='0' prop="jine">
							<el-input v-model="ruleForm.jine" placeholder="支出账户"></el-input>
						</el-form-item>
					</el-col> -->
					<el-col :span="4">
						<el-form-item label=""  label-width='0'>
							<el-input v-model="queryOrder.beizhu" placeholder="备注"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label=""  label-width='0' >
							<el-input v-model="queryOrder.beizhu1" placeholder="备注1"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item>
							<el-button size="small" @click="getOrder">查询</el-button>
							<el-button size="small" type="primary" @click="submitForm('ruleForm')">添加</el-button>
						</el-form-item>
					</el-col> 
				</el-row>
				</el-form>
				<el-table
					:data="orderDetail"
					border
					height='300px'
					fit
   					 @current-change="handleCurrentChange"
					:show-overflow-tooltip='true'
					highlight-current-row
					style="width: 100%;"
					empty-text='暂无数据'
					>
					<!-- <el-table-column
						type="selection"
						width="55">
					</el-table-column> -->
					<el-table-column label="订单编号"  align="center" width="200px">
						<template slot-scope="scope">
							<span>{{ scope.row.ordercode }}</span>
						</template>
					</el-table-column>
					<el-table-column label="订单状态"  align="center" width="80px">
						<template slot-scope="scope">
							<span>{{ scope.row.status == 1? '已下单' : '未下单'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="定稿日期"  align="center" width="100px">
						<template slot-scope="scope">
							<span>{{ scope.row.dingdate }}</span>
						</template>
					</el-table-column>
					<el-table-column label="客户归属"  align="center" width="150px">
						<template slot-scope="scope">
							<span>{{ scope.row.belong }}</span>
							<!-- <span>{{ scope.row.belong }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="客户来源"  align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.source }}</span>
							<!-- <span>{{ scope.row.source}}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="聊天旺旺"    align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.aliwwliao }}</span>
							<!-- <span class="link-type">{{ row.aliwwliao }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="付款旺旺"    align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.aliwwfu }}</span>
						<!-- <span class="link-type">{{ row.aliwwfu }}</!-->
						</template>
					</el-table-column>
					<el-table-column label="客户类型"  width="100px"  align="center" show-overflow-tooltip>
						<template slot-scope="scope">
							<span>{{ scope.row.kehu }}</span>
						<!-- <span class="link-type">{{ row.kehu }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="卡名"  align="center"  width="200px">
						<template slot-scope="scope">
							<span>{{ scope.row.card }}</span>
						<!-- <span>{{ scope.row.card }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="工艺"  align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.gy }}</span>
						<!-- <span>{{ scope.row.gy }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="数量"  align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.count }}</span>
						<!-- <span>{{ scope.row.count }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="收单价"  align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.price }}</span>
						<!-- <span>{{ scope.row.price }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="收版费"  align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.banfei }}</span>
						<!-- <span>{{ scope.row.banfei }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="收加急费"  align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.jiaji }}</span>
						<!-- <span>{{ scope.row.jiaji }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="收金额"  align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.shoumoney }}</span>
						<!-- <span>{{ (scope.row.price*scope.row.count+Number(scope.row.jiaji)+Number(scope.row.banfei)).toFixed(2)}}</span> -->
						<p v-if="scope.row.shoubeizhu">备注：{{scope.row.shoubeizhu}}</p>
						</template>
					</el-table-column>
					<el-table-column label="实际到账金额"  align="center" width=150>
						<template slot-scope="scope">
							<span>{{ scope.row.realshoumoney }}</span>
						<!-- <span>{{ scope.row.shoumoney }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="付款方式"  align="center"  width=150>
						<template slot-scope="scope">
							<span>{{ scope.row.payment }}</span>
						</template>
					</el-table-column>
					<el-table-column label="付款时间"  align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.paytime }}</span>
						</template>
					</el-table-column>
					<el-table-column label="定金"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-input v-model="scope.row.dingmoney" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.dingmoney }}</span>
						<!-- <span>{{ scope.row.dingmoney }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="定金付款方式"  align="center" width=150>
						<template slot-scope="scope">
							<span>{{ scope.row.paymentding }}</span>
						</template>
					</el-table-column>
					<el-table-column label="定金付款时间"  align="center" width=150>
						<template slot-scope="scope">
							<span>{{ scope.row.paytimeding }}</span>
						</template>
					</el-table-column>
					<el-table-column label="余款"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<span>{{ Number(scope.row.realshoumoney) - Number(scope.row.dingmoney)  }}</span>
							</template>
							<span>{{ scope.row.shengmoney }}</span>
						<!-- <span>{{ scope.row.shengmoney }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="余款付款方式"  align="center" width=150>
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-select v-model="scope.row.paymentyu" placeholder="余款付款方式" clearable filterable allow-create default-first-option>
									<el-option v-for="item in paymentList" :key="item.key" :label="item.key" :value="item.value" />
								</el-select>
							</template>
							<span>{{ scope.row.paymentyu }}</span>
						</template>
					</el-table-column>
					<el-table-column label="余款付款时间"  align="center" width=150>
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-date-picker
									v-model="scope.row.paytimeyu"
									align="right"
									type="date"
									placeholder="余款付款时间"
									value-format="yyyy-MM-dd"
									>
								</el-date-picker>
								<!-- <el-input v-model="scope.row.paytimeyu" class="edit-input" size="small" /> -->
							</template>
							<span>{{ scope.row.paytimeyu }}</span>
						</template>
					</el-table-column>
					<el-table-column label="货期"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-input v-model="scope.row.huoqi" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.huoqi }}</span>
						<!-- <span>{{ scope.row.huoqi }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="车间"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-select v-model="scope.row.chejian" placeholder="选择车间" clearable filterable allow-create default-first-option>
									<el-option v-for="item in chejianList" :key="item.key" :label="item.key" :value="item.value" >
										<span style="float: left">{{ item.key }}</span>
										<span style="float: right; color: #8492a6; font-size: 13px">{{ item.add }}</span>
									</el-option>
								</el-select>
								<!-- <el-input v-model="scope.row.chejian" class="edit-input" size="small" /> -->
							</template>
							<span>{{ scope.row.chejian }}</span>
						<!-- <span>{{ scope.row.chejian }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="出单价"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-input v-model="scope.row.price1" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.price1 }}</span>
						<!-- <span>{{ scope.row.price1 }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="出版费"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-input v-model="scope.row.banfei1" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.banfei1 }}</span>
						<!-- <span>{{ scope.row.banfei1 }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="出加急费"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-input v-model="scope.row.jiaji1" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.jiaji1 }}</span>
						<!-- <span>{{ scope.row.jiaji1 }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="卡款出"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<span >{{(Number(scope.row.price1) * Number(scope.row.count) + Number(scope.row.banfei1) + Number(scope.row.jiaji1)).toFixed(2)}}</span>
								<!-- <span>{{ scope.row.kakuan }}</span> -->
							</template>
							<!-- <span>{{ scope.row.kakuan }}</span> -->
						<span>{{ scope.row.kakuan }}</span>
						</template>
					</el-table-column>
					<el-table-column label="供应商结款 "  align="center" width="100">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-input v-model="scope.row.jiekuan" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.jiekuan }}</span>
						<!-- <span>{{ scope.row.jiekuan }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="利润"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<span>{{ Number(scope.row.realshoumoney) -(Number(scope.row.price1) * Number(scope.row.count) + Number(scope.row.banfei1) + Number(scope.row.jiaji1)).toFixed(2) }}</span>
							</template>
							<span>{{ scope.row.lirun }}</span>
						<!-- <span>{{ scope.row.lirun }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="刷卡器"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-input v-model="scope.row.shuakaqi" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.shuakaqi }}</span>
						<!-- <span>{{ scope.row.shuakaqi }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="系统"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-input v-model="scope.row.system" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.system }}</span>
						<!-- <span>{{ scope.row.system }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="邮费"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-input v-model="scope.row.youfei" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.youfei }}</span>
						<!-- <span>{{ scope.row.youfei }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="金属标签"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-input v-model="scope.row.label" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.label }}</span>
						<!-- <span>{{ scope.row.label }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="发票"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-select v-model="scope.row.fapiao" placeholder="发票税点 " clearable filterable allow-create default-first-option>
									<el-option label="普通发票6%" value="普通发票6%"/>
									<el-option label="专用发票6%" value="专用发票6%"/>
									<el-option label="专用发票13%" value="专用发票13%"/>
								</el-select>
								<!-- <el-input v-model="scope.row.fapiao" class="edit-input" size="small" /> -->
							</template>
							<span>{{ scope.row.fapiao }}</span>
						<!-- <span>{{ scope.row.fapiao }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="税额"  align="center">
						<template slot-scope="scope">
						<span>{{ scope.row.shuie }}</span>
						</template>
					</el-table-column>
					<el-table-column label="退款"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-input v-model="scope.row.tuikuan" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.tuikuan }}</span>
						<!-- <span>{{ scope.row.tuikuan }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="总支出"  align="center">
						<template slot-scope="scope">
							<!-- <template v-if="scope.row.edit">
								<el-input v-model="scope.row.zhichu" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.zhichu }}</span> -->
							<!-- <span >{{(Number(scope.row.price1) * Number(scope.row.count) + Number(scope.row.banfei1) + Number(scope.row.jiaji1)).toFixed(2)}}</span> -->
							<span>{{ ( Number(scope.row.price1) * Number(scope.row.count) + Number(scope.row.banfei1) + Number(scope.row.jiaji1)+Number(scope.row.shuakaqi) + Number(scope.row.system) +Number(scope.row.youfei)+Number(scope.row.label)+Number(scope.row.shuie)+Number(scope.row.tuikuan)).toFixed(2) }}</span>
						</template>
					</el-table-column>
					<el-table-column label="纯利"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<span>{{ scope.row.realshoumoney -( Number(scope.row.price1) * Number(scope.row.count) + Number(scope.row.banfei1) + Number(scope.row.jiaji1)+Number(scope.row.shuakaqi) + Number(scope.row.system) +Number(scope.row.youfei)+Number(scope.row.label)+Number(scope.row.shuie)+Number(scope.row.tuikuan)).toFixed(2) }}</span>
							</template>
							<span>{{ scope.row.chunli }}</span>
						<!-- <span>{{ scope.row.chunli }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="提点"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-input v-model="scope.row.tidian" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.tidian }}</span>
						<!-- <span>{{ scope.row.tidian }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="设计"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-input v-model="scope.row.sheji" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.sheji }}</span>
						<!-- <span>{{ scope.row.sheji }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="收货地址"  align="center" width="200" show-overflow-tooltip>
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-input v-model="scope.row.dizhi" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.dizhi }}</span>
						<!-- <span>{{ scope.row.dizhi }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="快递方式"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-select  v-model="scope.row.kuaidi" placeholder="快递方式" clearable filterable allow-create default-first-option>
									<el-option  v-for="item in kuaidiList" :key="item.key" :label="item.key" :value="item.value" />
								</el-select>
								<!-- <el-input v-model="scope.row.kuaidi" class="edit-input" size="small" /> -->
							</template>
							<span>{{ scope.row.kuaidi }}</span>
						<!-- <span>{{ scope.row.kuaidi }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="发货时间"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-date-picker
										v-model="scope.row.fahuotime"
										align="right"
										type="datetime"
										placeholder="选择日期"
										value-format="yyyy-MM-dd hh:mm:ss"
										>
									</el-date-picker>
								<!-- <el-input v-model="scope.row.fahuotime" class="edit-input" size="small" /> -->
							</template>
							<span>{{ scope.row.fahuotime }}</span>
						<!-- <span>{{ scope.row.kuaidi }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="物流单号"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-input v-model="scope.row.wuliucode" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.wuliucode }}</span>
						</template>
					</el-table-column>
					<el-table-column label="备注"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-input v-model="scope.row.beizhu" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.beizhu }}</span>
						</template>
					</el-table-column>
					<el-table-column label="备注1"  align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.edit">
								<el-input v-model="scope.row.beizhu1" class="edit-input" size="small" />
							</template>
							<span>{{ scope.row.beizhu1 }}</span>
						<!-- <span>{{ scope.row.beizhu }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="确认稿"  align="center" width="100">
						<template slot-scope="scope">
							<div slot="reference" class="name-wrapper" @click="showModal(scope.row.url)">
								<img :src="scope.row.url" alt="">
							</div>
						</template>
					</el-table-column>
			</el-table>
			</el-card>
			<el-card class="box-card">
				<el-row :gutter="10">
					<el-col :span="2"><div style="background:#F56C6C" class="grid-content bg-purple">未下单</div></el-col>
					<el-col :span="2"><div style="background:#409EFF" class="grid-content bg-purple">已下单</div></el-col>
					<el-col :span="2"><div style="background:#67C23A" class="grid-content bg-purple">已审单</div></el-col>
					<el-col :span="2"><div style="background:#909399" class="grid-content bg-purple">已对账</div></el-col>
				</el-row>
				<el-table
					:data="tableData"
					border
					:row-class-name="tableRowClassName"
					style="width: 100%">
					<el-table-column
						prop="ordercode"
						label="订单编号"
						width="180">
					</el-table-column>
					<el-table-column
						prop="card"
						label="卡名"
						width="180">
					</el-table-column>
					<el-table-column
						prop="chejian"
						label="供应商"
						width="180">
					</el-table-column>
					<el-table-column
						prop="payment"
						label="支出账号"
						width="180">
					</el-table-column>
					<!-- <el-table-column
						prop="date"
						label="日期">
					</el-table-column> -->
					<el-table-column
						prop="beizhu"
						label="备注">
					</el-table-column>
					<el-table-column
						prop="beizhu1"
						label="备注1">
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
			// ruleForm: {
			// 	name: "",
			// 	jine: "",
			// 	date:new Date(),
			// 	payment: "",
			// 	type: '',
			// 	beizhu:'',
			// 	uid:getToken()
			// },
			ruleForm: {
				name: "",
				jine: "",
				date:new Date(),
				payment: "",
				type: '',
				beizhu:'',
				uid:getToken()
			},
			queryOrder:{
				code:'',
				card:'',
				chejian:'',
				beizhu:'',
				beizhu1:'',
				uid:getToken()
			},
			selectRow:'',
			tableData: [],
			isShowBeizhu:false,
			query:{
				uid:getToken(),
				page:1,
				pageSize:10
			},
			total:0,
			orderDetail:[]
		};
	},
	mounted(){
		this.getList()
	},
	methods: {
		tableRowClassName({row, rowIndex}) {
			// console.log(row)
			// 已下单
			if (row.isduizhang == 1) {
				return 'yiduizhang';
			}  else if (row.isshendan == 1) {
				return 'yishendan';
			} else if (row.status == 1) {
				return 'yixiadan';
			}else if (row.status == 0) {
				return 'weixiadan';
			}
			return '';
		},
		pageChange(p){
            this.query.page = p;
            this.getList()
            // console.log(p)
		},
		getOrder(){
			this.$http({
				url: '/login/Finanical/getOrderDetail',
				method: 'post',
				data:this.queryOrder
			}).then((res) => {
				if (res.code == 1) {
					if (res.data.length > 20) {
						this.$notify({
							title: '提示',
							message: `数据过多，请输入更精准的查询条件`,
							type: 'warning'
						});
					}
					this.orderDetail = res.data;
				}else{
					this.$notify({
						title: '查询成功',
						message: `暂无符合条件的数据`,
						type: 'success'
					});
				}
					console.log(res.data)
					// this.getList()
			}).catch(()=>{
			})
		},
		handleCurrentChange(val){
			this.selectRow = val;
		},
		submitForm(formName) {
			this.selectRow.uid = getToken();
			// this.$refs[formName].validate(valid => {
			// 	if (valid) {
					this.$http({
						url: '/login/Finanical/addZhichu',
						method: 'post',
						data:this.selectRow
					}).then((res) => {
						if (res.code == 1) {
							this.$notify({
								title: '提示',
								message: `添加成功`,
								type: 'success'
							});
							this.getList()
						}else{
							this.$notify({
								title: '失败',
								message: `添加失败:${res.msg}`,
								type: 'error'
							});
						}
							console.log(res)
					}).catch(()=>{
					})
			// 	}
			// })
		},
		getList() {
			this.$http({
                url: '/login/Finanical/getPayList',
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
	 .el-row {
    margin-bottom: 20px;
    
  }
  .el-col {
    border-radius: 4px;
  }
  /* .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  } */
  .grid-content {
    border-radius: 4px;
	min-height: 36px;
	line-height: 36px;
	text-align: center;
	color: #fff
  }
  /* .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  } */
	</style>
