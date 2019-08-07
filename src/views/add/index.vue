<template>
	<div class="app-container" id="customer-add">
		<el-card class="box-card">
			<el-form ref="addform" :model="form"  :rules="rules" label-width="120px" :inline="true">
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="订单编号">
							<el-input v-model="form.ordercode" disabled />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="定稿日期" prop='dingdate'>
							<el-date-picker
								v-model="form.dingdate"
								align="right"
								type="date"
								placeholder="选择日期"
								value-format="yyyy-MM-dd"
								>
							</el-date-picker>
						<!-- <el-input v-model="form.dingdate"/> -->
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="客户来源"  prop='source'>
							<el-select v-model="form.source" placeholder="选择客户来源" clearable filterable allow-create default-first-option>
								<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.key" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="聊天旺旺"  prop='aliwwliao'>
						<el-input v-model="form.aliwwliao"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="付款旺旺"  prop='aliwwfu'>
						<el-input v-model="form.aliwwfu"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="客户类型" prop='kehu'>
							<el-select v-model="form.kehu" placeholder="选择客户类型" clearable filterable allow-create default-first-option>
								<el-option label="店面" value="店面"/>
								<el-option label="公司" value="公司"/>
								<el-option label="印刷广告" value="印刷广告"/>
								<el-option label="设计" value="设计"/>
								<el-option label="软件公司" value="软件公司"/>
							</el-select>
						<!-- <el-input v-model="form.kehu"/> -->
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="卡名" prop='card'>
						<el-input v-model="form.card"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="工艺" prop='gy'>
						<el-input v-model="form.gy"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="数量" prop='count'>
						<el-input type='number' v-model="form.count"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="收单价" prop='price'>
						<el-input  type='number' v-model="form.price"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="收版费">
						<el-input v-model="form.banfei"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="收加急费">
						<el-input v-model="form.jiaji"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="收金额">
							<el-input type='number' style="width:150px;" v-model="form.shoumoney" :value="shoumoneyFun" disabled />
							<el-checkbox v-model="isShowBeizhu">备注</el-checkbox>
                			<el-input type="textarea" :rows="2" v-if="isShowBeizhu" style="width:200px;" v-model="form.shoubeizhu" placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="实际到账金额" >
						<el-input type='number' v-model="form.realshoumoney"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="全款付款方式" prop='payment'>
							<el-select v-model="form.payment" placeholder="全款付款方式" clearable filterable allow-create default-first-option>
								<el-option v-for="item in paymentList" :key="item.key" :label="item.key" :value="item.value" />
							</el-select>
						<!-- <el-input v-model="form.payment"/> -->
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="全款付款时间" prop='paytime'>
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
						<el-form-item label="定金">
						<el-input type='number' v-model="form.dingmoney"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="定金付款方式">
							<el-select v-model="form.paymentding" placeholder="定金付款方式" clearable filterable allow-create default-first-option>
								<el-option v-for="item in paymentList" :key="item.key" :label="item.key" :value="item.value" />
							</el-select>
						<!-- <el-input v-model="form.payment"/> -->
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="定金拍款时间">
							<el-date-picker
								v-model="form.paytimeding"
								align="right"
								type="date"
								placeholder="选择日期"
								value-format="yyyy-MM-dd"
								>
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="余款">
						<el-input  v-model="form.shengmoney" />
						<!-- <el-input disabled v-model="form.shengmoney" :value='yukuanFun'/> -->
						</el-form-item>
					</el-col>
					<el-col :span="6" >
						<el-form-item label="余款付款方式">
							<template v-if="form.shengmoney > 0">
								<el-select  v-model="form.paymentyu" placeholder="余款付款方式" clearable filterable allow-create default-first-option>
									<el-option  v-for="item in paymentList" :key="item.key" :label="item.key" :value="item.value" />
								</el-select>
							</template>
							<template v-else>
								<el-select disabled v-model="form.paymentyu" placeholder="余款付款方式" clearable filterable allow-create default-first-option>
									<el-option  v-for="item in paymentList" :key="item.key" :label="item.key" :value="item.value" />
								</el-select>
							</template>
						<!-- <el-input v-model="form.payment"/> -->
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<template v-if="form.shengmoney > 0">
							<el-form-item label="余款拍款时间">
							<el-date-picker
								v-model="form.paytimeyu"
								align="right"
								type="date"
								placeholder="选择日期"
								value-format="yyyy-MM-dd"
								>
							</el-date-picker>
						</el-form-item>
						</template>
						<template v-else>
							<el-form-item label="余款拍款时间">
							<el-date-picker
								:disabled='true'
								v-model="form.paytime"
								align="right"
								type="date"
								placeholder="选择日期"
								value-format="yyyy-MM-dd"
								>
							</el-date-picker>
						</el-form-item>
						</template>
						
					</el-col>
					<el-col :span="6">
						<el-form-item label="货期">
						<el-input v-model="form.huoqi"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车间" prop='chejian'>
							<el-select v-model="form.chejian" placeholder="选择车间" clearable filterable allow-create default-first-option>
								<el-option v-for="item in chejianList" :key="item.key" :label="item.key" :value="item.value" >
									<span style="float: left">{{ item.key }}</span>
      								<span style="float: right; color: #8492a6; font-size: 13px">{{ item.add }}</span>
								</el-option>
							</el-select>
						<!-- <el-input v-model="form.chejian"/> -->
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="出单价" prop='price1'>
						<el-input type='number' v-model="form.price1"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="出版费">
						<el-input type='number' v-model="form.banfei1"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="出加急费">
						<el-input type='number' v-model="form.jiaji1"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="卡款出">
						<el-input disabled v-model="form.kakuan" :value='kakuanFun'/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="供应商结款">
						<el-input v-model="form.jiekuan"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="利润">
						<el-input disabled v-model="form.lirun" :value='lirunFun'/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="刷卡器">
						<el-input type='number' v-model="form.shuakaqi"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="系统">
						<el-input type='number' v-model="form.system"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="邮费">
						<el-input type='number' v-model="form.youfei"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="金属标签">
						<el-input type='number' v-model="form.label"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="发票类型">
							<el-select v-model="form.fapiao" placeholder="发票税点 " clearable filterable allow-create default-first-option>
								<el-option label="普通发票6%" value="普通发票6%"/>
								<el-option label="专用发票6%" value="专用发票6%"/>
								<el-option label="专用发票13%" value="专用发票13%"/>
								<el-option label="无发票" value="0"/>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="税额">
							<el-input v-model="form.shuie" :value="shuieFun" disabled/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="退款">
						<el-input type='number' v-model="form.tuikuan"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="总支出">
						<el-input v-model="form.zhichu" :value='zhichuFun' disabled/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="纯利">
						<el-input disabled v-model="form.chunli" :value='chunliFun'/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="提点">
						<el-input v-model="form.tidian"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="设计" prop='sheji'>
						<el-input v-model="form.sheji"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="收货地址">
						<el-input v-model="form.dizhi"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="快递方式" >
							<el-select  v-model="form.kuaidi" placeholder="快递方式" clearable filterable allow-create default-first-option>
								<el-option  v-for="item in kuaidiList" :key="item.key" :label="item.key" :value="item.value" />
							</el-select>
							<!-- <el-input v-if="form.kuaidi =='byinput'"  v-model="form.kuaidi"/> -->
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="物流单号">
						<el-input v-model="form.wuliucode"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="发货时间">
							<el-date-picker
								v-model="form.fahuotime"
								align="right"
								type="datetime"
								placeholder="选择日期"
								value-format="yyyy-MM-dd hh:mm:ss"
								>
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="备注">
						<el-input v-model="form.beizhu"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="备注1">
						<el-input v-model="form.beizhu1"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="6" style="text-align:center;">
						<el-form-item>
						<div class="btn-box">
							<el-button type="primary" @click="onSubmit('addform')">确认</el-button>
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
			isShowBeizhu:false,
			form: {
				ordercode:new Date().format("yyyyMMddhhmmssS"),
				dingdate:'',
				source: "",
				aliwwliao: "",
				isenable:1,
				aliwwfu: "",
				kehu: "",
				card:'',
				gy:'',
				count:'',
				price:'',
				banfei: "",
				jiaji: "",
				shoumoney: '',
				shoubeizhu:'',
				realshoumoney:'',
				dingmoney: '',
				paymentding:'',
				paytimeding:'',
				shengmoney: '',
				paymentyu:'',
				paytimeyu:'',
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
				shuie:'',
				tuikuan:'',
				zhichu:'',
				chunli:'',
				tidian:'',
				sheji:'',
				dizhi:'',
				kuaidi:'',
				wuliucode:'',
				fahuotime:'',
				beizhu:'',
				beizhu1:'',
				uid:getToken()
			},
			rules: {
				dingdate:[{ required: true, message: '请输入定稿日期', trigger: 'blur' }],
				source:[{ required: true, message: '请输入客户来源', trigger: 'blur' }],
				aliwwliao:[{ required: true, message: '请输入聊天旺旺', trigger: 'blur' }],
				aliwwfu:[{ required: true, message: '请输入付款旺旺', trigger: 'blur' }],
				card:[{ required: true, message: '请输入卡名', trigger: 'blur' }],
				gy:[{ required: true, message: '请输入工艺', trigger: 'blur' }],
				count:[{ required: true, message: '请输入数量', trigger: 'blur' }],
				price:[{ required: true, message: '请输入收单价', trigger: 'blur' }],
				realshoumoney:[{ required: true, message: '请输入实际到账金额', trigger: 'blur' }],
				payment:[{ required: true, message: '请输入付款方式', trigger: 'blur' }],
				paytime:[{ required: true, message: '请输入拍款时间', trigger: 'blur' }],
				chejian:[{ required: true, message: '请输入车间', trigger: 'blur' }],
				price1:[{ required: true, message: '请输入出单价', trigger: 'blur' }],
				sheji:[{ required: true, message: '请输入设计', trigger: 'blur' }],
				kehu:[{ required: true, message: '请输入客户类型', trigger: 'blur' }],
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
			calendarTypeOptions:[
				{key:'自然的风',value:'自然的风'},
				{key:'楚状元',value:'楚状元'},
				{key:'卡世界',value:'卡世界'},
				{key:'线下客',value:'线下客'},
			],
			kuaidiList:[
				{key:'德邦快递',value:'德邦快递'},
				{key:'顺丰快递',value:'顺丰快递'},
				{key:'优速快递',value:'优速快递'},
				{key:'申通快递',value:'申通快递'},
				{key:'中通快递',value:'中通快递'},
				{key:'圆通快递',value:'圆通快递'},
				{key:'韵达快递',value:'韵达快递'},
				{key:'邮政EMS',value:'邮政EMS'},
				{key:'百世快递',value:'百世快递'},
				{key:'德邦物流',value:'德邦物流'},
				// {key:'手动输入',value:'byinput'},
			],
			paymentList:[
				{key:'拍款自然的风',value:'拍款自然的风'},
				{key:'拍款楚状元',value:'拍款楚状元'},
				{key:'拍款卡世界(企业店)',value:'拍款卡世界(企业店)'},
				{key:'对公:北京恒泰迅捷',value:'对公:北京恒泰迅捷'},
				{key:'对公:深圳市共荣达',value:'对公:深圳市共荣达'},
				{key:'线下汇支付宝',value:'线下汇支付宝'},
				{key:'卡世界微信',value:'卡世界微信'},
				{key:'客服微信',value:'客服微信'},
				{key:'卡福微信',value:'卡福微信'},
				{key:'个人账户工行',value:'个人账户工行'},
				{key:'个人账户农行',value:'个人账户农行'},
				{key:'个人账户建行',value:'个人账户建行'},
			],
			chejianList:[
				{key:'卡蛙',value:'卡蛙-广州市',add:' 广州市'},
				{key:'万联',value:'万联-东莞市',add:' 东莞市'},
				{key:'俊酷',value:'俊酷-北京市',add:' 北京市'},
				{key:'建和',value:'建和-深圳市',add:' 深圳市'},
				{key:'博天瑞',value:'博天瑞-深圳市',add:' 深圳市'},
				{key:'弘辉',value:'弘辉-深圳市',add:' 深圳市'},
				{key:'善美',value:'善美-深圳市',add:' 深圳市'},
				{key:'卡立方',value:'卡立方-深圳市',add:' 深圳市'},
				{key:'泽鑫（拍款）',value:'泽鑫（拍款）-温州市苍南县',add:' 温州市苍南县'},
				{key:'北京卡盒（大抽盒）',value:'北京卡盒（大抽盒）',add:' '},
				{key:'崔建强',value:'崔建强-廊坊市',add:'廊坊市'},
				{key:'金大金属标牌（拍款）',value:'金大金属标牌（拍款）-广州市',add:'广州市'},
				{key:'华彩之卡',value:'华彩之卡-北京市大兴',add:'北京市大兴'},
				{key:'天一时创',value:'天一时创-廊坊市固安县',add:'廊坊市固安县'},
				{key:'顺和',value:'顺和-郑州市',add:'郑州市'},
				{key:'优佳达',value:'优佳达-深圳市',add:'深圳市'},
				{key:'益业',value:'益业-深圳市',add:'深圳市'},
				{key:'银通商',value:'银通商-深圳市',add:'深圳市'},
				{key:'千丰彩',value:'千丰彩-深圳市',add:'深圳市'},
				{key:'侯许',value:'侯许-北京市房山',add:'北京市房山'},
				{key:'一卡易软件（开户）',value:'一卡易软件（开户）',add:''},
				{key:'读卡器 缔美珂',value:'读卡器 缔美珂-浙江宁波',add:'浙江宁波'},
			]
		};
	},
	computed:{
		shuieFun:function(){
			let rate = 0;
			if (this.form.fapiao == '普通发票6%') {
				rate = 0.06;
			}else if(this.form.fapiao == '专用发票6%'){
				rate = 0.06;
			}else if(this.form.fapiao == '专用发票13%'){
				rate = 0.10;
			}else{
				rate = 0;
			}
			return this.form.shuie = (Number(this.form.realshoumoney) * Number(rate)).toFixed(2);
		},
		shoumoneyFun:function(){
			return this.form.shoumoney = this.form.price * this.form.count + Number(this.form.banfei) + Number(this.form.jiaji);
		},
		// zhichuFun:function(){
		// 	return this.form.zhichu = (Number(this.form.realshoumoney) - Number(this.form.kakuan)-Number(this.form.shuakaqi) - Number(this.form.system) -Number(this.form.youfei) -Number(this.form.label)-Number(this.form.shuie)-Number(this.form.tuikuan)-Number(this.form.jiekuan)).toFixed(2);
		// },
		zhichuFun:function(){
			return this.form.zhichu = ( Number(this.form.kakuan)+Number(this.form.shuakaqi) + Number(this.form.system) +Number(this.form.youfei)+Number(this.form.label)+Number(this.form.shuie)+Number(this.form.tuikuan)).toFixed(2);
		},
		yukuanFun:function(){
			return this.form.shengmoney = this.form.realshoumoney -this.form.dingmoney
		},
		kakuanFun:function(){
			return this.form.kakuan = this.form.price1 * this.form.count + Number(this.form.banfei1) + Number(this.form.jiaji1);
		},
		lirunFun:function(){
			return this.form.lirun = this.form.realshoumoney -this.form.kakuan
		},
		chunliFun:function(){
			return this.form.chunli = this.form.realshoumoney -this.form.zhichu
		},
	},
	methods: {
		onSubmit(formName) {
			this.$refs[formName].validate((valid) => {
		  		if (valid) {
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
				}
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

