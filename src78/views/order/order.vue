<template>
  <div class="app-container">
    <div class="filter-container">
		<el-card class="box-card">
			<div class="query-box">
                <el-select v-model="listQuery.status" placeholder="下单状态" clearable class="filter-item" style="width: 130px">
					<el-option label="已下单"  value="1"/>
					<el-option label="未下单"  value="0"/>
				</el-select>
				<el-input v-model="listQuery.ordercode" placeholder="订单编号" style="width: 100px;" class="filter-item"  />
				<el-date-picker
						v-model="listQuery.dingdate"
						align="right"
						type="date"
						placeholder="定稿日期"
						value-format="yyyy-MM-dd"
						>
					</el-date-picker>
				<!-- <el-input v-model="listQuery.belong" placeholder="客户归属" style="width: 100px;" class="filter-item" /> -->
				<el-select v-if="power == '0'" v-model="listQuery.belong" placeholder="客户归属" clearable>
					<el-option v-for="item in userList" :key="item.id" :label="item.username" :value="item.username" />
				</el-select>
				<el-select v-model="listQuery.source" placeholder="客户来源" clearable class="filter-item" style="width: 130px">
					<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.key" :value="item.value" />
				</el-select>
				<el-input v-model="listQuery.aliwwliao" placeholder="聊天旺旺" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.aliwwfu" placeholder="付款旺旺" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.kehu" placeholder="客户" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.card" placeholder="卡名" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.gy" placeholder="工艺" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.count" placeholder="数量" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.price" placeholder="单价" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.banfei" placeholder="版费" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.jiaji" placeholder="加急费" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.shoumoney" placeholder="收金额" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.realshoumoney" placeholder="实际到账金额" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.dingmoney" placeholder="定金" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.shengmoney" placeholder="余款" style="width: 100px;" class="filter-item" />
				<el-select v-model="listQuery.payment" placeholder="付款方式">
					<el-option v-for="item in paymentList" :key="item.key" :label="item.key" :value="item.value" />
				</el-select>
				<!-- <el-input v-model="listQuery.payment" placeholder="付款方式" style="width: 100px;" class="filter-item" /> -->
				<el-input v-model="listQuery.paytime" placeholder="付款时间" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.huoqi" placeholder="付款时间" style="width: 100px;" class="filter-item" />
				<!-- <el-input v-model="listQuery.chejian" placeholder="车间" style="width: 100px;" class="filter-item" /> -->
				<el-select v-model="listQuery.chejian" placeholder="车间">
					<el-option v-for="item in chejianList" :key="item.key" :label="item.key" :value="item.value" >
						<span style="float: left">{{ item.key }}</span>
						<span style="float: right; color: #8492a6; font-size: 13px">{{ item.add }}</span>
					</el-option>
				</el-select>
				<el-input v-model="listQuery.price1" placeholder="单价" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.banfei1" placeholder="版费" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.jiaji1" placeholder="加急费" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.kakuan" placeholder="卡款" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.jiekuan" placeholder="供应商结款" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.lirun" placeholder="利润" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.shuakaqi" placeholder="刷卡器" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.system" placeholder="系统" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.youfei" placeholder="邮费" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.label" placeholder="金属标签" style="width: 100px;" class="filter-item" />
				<!-- <el-input v-model="listQuery.fapiao" placeholder="发票" style="width: 100px;" class="filter-item" /> -->
				<el-select v-model="listQuery.fapiao" placeholder="发票税点 ">
					<el-option label="普通发票6%" value="普通发票6%"/>
					<el-option label="专用发票6%" value="专用发票6%"/>
					<el-option label="专用发票13%" value="专用发票13%"/>
				</el-select>
				<el-input v-model="listQuery.tuikuan" placeholder="退款" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.zhichu" placeholder="总支出" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.chunli" placeholder="纯利" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.tidian" placeholder="提点" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.sheji" placeholder="设计" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.dizhi" placeholder="收货地址" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.kuaidi" placeholder="快递方式" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.beizhu" placeholder="备注" style="width: 100px;" class="filter-item" />
				<el-input v-model="listQuery.beizhu1" placeholder="备注1" style="width: 100px;" class="filter-item" />
				<el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
					查询
				</el-button>
				<el-button  class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
					导出本页
				</el-button>
				<el-button  class="filter-item" type="primary" icon="el-icon-download" @click="handleDownloadSelect">
					导出所选
				</el-button>
				<el-button  class="filter-item" type="primary" icon="el-icon-error" @click="resetQuery">
					清空筛选条件
				</el-button>
			</div>

		</el-card>
		<el-table
			:key="tableKey"
			v-loading="listLoading"
			:data="list"
			border
			fit
			:show-overflow-tooltip='true'
            :row-class-name="orderStatus"
			@selection-change="handleSelectionChange"
			highlight-current-row
			style="width: 100%;"
			empty-text='暂无数据'
			@sort-change="sortChange"
			>
            <el-table-column
                fixed
                type="selection"
                width="55">
            </el-table-column>
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
			<el-table-column label="客户归属"  align="center" v-if="power == '0'"  width="150px">
				<template slot-scope="scope">
					<span>{{ scope.row.belong }}</span>
				</template>
			</el-table-column>
			<el-table-column label="客户来源"  align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.source}}</span>
				</template>
			</el-table-column>
			<el-table-column label="聊天旺旺"  width="150px"  align="center">
				<template slot-scope="{row}">
				<span class="link-type">{{ row.aliwwliao }}</span>
				</template>
			</el-table-column>
			<el-table-column label="付款旺旺"  width="150px"  align="center">
				<template slot-scope="{row}">
				<span class="link-type">{{ row.aliwwfu }}</span>
				</template>
			</el-table-column>
			<el-table-column label="客户"  width="100px"  align="center" show-overflow-tooltip>
				<!-- <template slot-scope="scope">
					<el-popover trigger="hover" placement="top">
					<p>姓名: {{ scope.row.kehu }}</p>
					<p>住址: {{ scope.row.kehu }}</p>
					<div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.kehu }}</el-tag>
					</div>
					</el-popover>
				</template> -->
				<template slot-scope="{row}">
				<span class="link-type">{{ row.kehu }}</span>
				</template>
			</el-table-column>
			<el-table-column label="卡名"  align="center"  width="200px">
				<template slot-scope="scope">
				<span>{{ scope.row.card }}</span>
				</template>
			</el-table-column>
			<el-table-column label="工艺"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.gy }}</span>
				</template>
			</el-table-column>
			<el-table-column label="数量"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.count }}</span>
				</template>
			</el-table-column>
			<el-table-column label="单价"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.price }}</span>
				</template>
			</el-table-column>
			<el-table-column label="版费"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.banfei }}</span>
				</template>
			</el-table-column>
			<el-table-column label="加急费"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.jiaji }}</span>
				</template>
			</el-table-column>
			<el-table-column label="收金额"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.shoumoney }}</span>
				</template>
			</el-table-column>
			<el-table-column label="定金"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.dingmoney }}</span>
				</template>
			</el-table-column>
			<el-table-column label="余款"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.shengmoney }}</span>
				</template>
			</el-table-column>
			<el-table-column label="付款方式"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.payment }}</span>
				</template>
			</el-table-column>
			<el-table-column label="付款时间"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.paytime }}</span>
				</template>
			</el-table-column>
			<el-table-column label="货期"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.huoqi }}</span>
				</template>
			</el-table-column>
			<el-table-column label="车间"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.chejian }}</span>
				</template>
			</el-table-column>
			<el-table-column label="单价"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.price1 }}</span>
				</template>
			</el-table-column>
			<el-table-column label="版费"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.banfei1 }}</span>
				</template>
			</el-table-column>
			<el-table-column label="加急费"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.jiaji1 }}</span>
				</template>
			</el-table-column>
			<el-table-column label="卡款"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.kakuan }}</span>
				</template>
			</el-table-column>
			<el-table-column label="供应商结款 "  align="center" width="100">
				<template slot-scope="scope">
				<span>{{ scope.row.jiekuan }}</span>
				</template>
			</el-table-column>
			<el-table-column label="利润"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.lirun }}</span>
				</template>
			</el-table-column>
			<el-table-column label="刷卡器"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.shuakaqi }}</span>
				</template>
			</el-table-column>
			<el-table-column label="系统"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.system }}</span>
				</template>
			</el-table-column>
			<el-table-column label="邮费"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.youfei }}</span>
				</template>
			</el-table-column>
			<el-table-column label="金属标签"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.label }}</span>
				</template>
			</el-table-column>
			<el-table-column label="发票"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.fapiao }}</span>
				</template>
			</el-table-column>
			<el-table-column label="税额"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.shuie }}</span>
				</template>
			</el-table-column>
			<el-table-column label="退款"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.tuikuan }}</span>
				</template>
			</el-table-column>
			<el-table-column label="总支出"  align="center">
				<template slot-scope="scope">
				<span>{{(Number(scope.row.realshoumoney) - Number(scope.row.kakuan)-Number(scope.row.shuakaqi) - Number(scope.row.system) -Number(scope.row.youfei) -Number(scope.row.label)-Number(scope.row.shuie)-Number(scope.row.tuikuan)-Number(scope.row.jiekuan)).toFixed(2) }}</span>
				</template>
			</el-table-column>
			<el-table-column label="纯利"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.chunli }}</span>
				</template>
			</el-table-column>
			<el-table-column label="提点"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.tidian }}</span>
				</template>
			</el-table-column>
			<el-table-column label="设计"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.sheji }}</span>
				</template>
			</el-table-column>
			<el-table-column label="收货地址"  align="center" width="200" show-overflow-tooltip>
				<template slot-scope="scope">
				<span>{{ scope.row.dizhi }}</span>
				</template>
			</el-table-column>
			<el-table-column label="快递方式"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.kuaidi }}</span>
				</template>
			</el-table-column>
			<el-table-column label="备注"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.beizhu }}</span>
				</template>
			</el-table-column>
			<el-table-column label="备注1"  align="center">
				<template slot-scope="scope">
				<span>{{ scope.row.beizhu1 }}</span>
				</template>
			</el-table-column>
			<el-table-column label="确认稿"  align="center" width="100">
				<template slot-scope="scope">
					<div v-if="scope.row.url ==null">
						<el-upload
							class="upload-demo"
							name='userimg'
							:action="api+'/login/login/uploadUserImg'"
							accept="image/*"
							:on-success="handleAvatarSuccess"
							:data='{id:scope.row.id}'
							>
							<el-button size="small" type="primary" >点击上传</el-button>
						</el-upload>
					</div>
					<div v-else>
						<!-- <el-popover trigger="hover" placement="top">
							<div class="show-img">

								<img :src="scope.row.url" alt="">
							</div>
							<div slot="reference" class="name-wrapper">
								<img :src="scope.row.url" alt="">
							</div>
						</el-popover> -->
						<div slot="reference" class="name-wrapper" @click="showModal(scope.row.url)">
							<img :src="scope.row.url" alt="">
						</div>
						<!-- <el-popover trigger="hover" placement="top">
							<img :src="scope.row.url" alt="">
						</el-popover> -->
					</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="200"  class-name="small-padding fixed-width" fixed='right'>
				<template slot-scope="{row}">
                    <el-button size="mini" type="primary" @click="order(row)" v-if="row.status == 0">
                        下单
                    </el-button>
                    <el-button size="mini" type="danger" @click="deleteCustomer(row)">
                        删除
                    </el-button>
				</template>
			</el-table-column>
			</el-table>
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="pageChange"
				:current-page='listQuery.page'
				:page-sizes="[10, 20, 30, 40,100]"
				:page-size="listQuery.limit"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination>
			<el-dialog
				:visible.sync="dialogVisible"
				width="60%"
				>
				<div class="imgbox">
				<img style="width:100%" :src="modalUrl" alt="">
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
				</span>
			</el-dialog>
    </div>

  </div>
</template>

<script>
// import waves from '@/directive/waves' // waves directive
import { getToken,getPower } from '@/utils/auth'
import { parseTime } from '@/utils'

export default {
  name: 'ComplexTable',
  // directives: { waves },
  data() {
    return {
		tableKey: 0,
		list: null,
		total: 0,
		listLoading: false,
		listQuery: {
			page: 1,
            limit: 10,
            status:'',
			ordercode:'',
			dingdate:'',
			belong:'',
			source: '',
			aliwwliao:'',
			aliwwfu:'',
			kehu:'',
			card:'',
			gy:'',
			count:'',
			price:'',
			banfei:'',
			jiaji:'',
			shoumoney:'',
			realshoumoney:'',
			dingmoney:'',
			shengmoney:'',
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
			beizhu1:'',
			uid:getToken()
		},
		importanceOptions: [1, 2, 3],
		calendarTypeOptions:[
			{key:'自然的风',value:'自然的风'},
			{key:'楚状元',value:'楚状元'},
			{key:'卡世界',value:'卡世界'},
			{key:'线下客',value:'线下客'},
		],
		paymentList:[
			{key:'北京恒泰迅捷',value:'北京恒泰迅捷'},
			{key:'深圳市共荣达',value:'深圳市共荣达'},
			{key:'卡世界微信',value:'卡世界微信'},
			{key:'卡福微信',value:'卡福微信'},
			{key:'客服微信',value:'客服微信'},
			{key:'个人账号',value:'个人账号'},
			{key:'工行',value:'工行'},
			{key:'农行',value:'农行'},
			{key:'建行',value:'建行'},
		],
		chejianList:[
			{key:'卡蛙',value:'卡蛙-广州市',add:' 广州市'},
			{key:'万联',value:'卡蛙-东莞市',add:' 东莞市'},
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
		],
		sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
		statusOptions: ['published', 'draft', 'deleted'],
		temp: {
			id: undefined,
			importance: 1,
			remark: '',
			timestamp: new Date(),
			title: '',
			type: '',
			status: 'published'
		},
		dialogFormVisible: false,
		dialogStatus: '',
		textMap: {
			update: 'Edit',
			create: 'Create'
		},
		dialogPvVisible: false,
		pvData: [],
		rules: {
			type: [{ required: true, message: 'type is required', trigger: 'change' }],
			timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
			title: [{ required: true, message: 'title is required', trigger: 'blur' }]
		},
		tableData:[],
		downloadLoading: false,
		tableHeader:[],
		power:getPower(),
		modalUrl:'',
		dialogVisible:false,
		api:'',
		selectList:[],
		userList:[]
    }
  },
  created() {
	this.api = process.env.BASE_API
	this.getList()
	this.getUsers()
  },
  methods: {
	handleSelectionChange(v){
		this.selectList = v;
		console.log(v)
	},
	getUsers() {
		this.$http({
			url: '/login/user/getUser',
			method: 'post',
		}).then((res) => {
			this.userList = res.data
			console.log(res)
		}).catch(()=>{
		})
	},
	showModal(url){
		this.modalUrl = url;
		this.dialogVisible = true;
	},
	handleAvatarSuccess(res){
		this.getList()
	},
    order(row){
        this.$http({
			url: '/login/login/updateOrderStatus',
			method: 'post',
			data:{
                'code':row.ordercode,
                uid:getToken()
            }
		}).then((res) => {
            if (res.code == 1) {
                this.$notify({
                    title: '成功',
                    message: '更新成功',
                    type: 'success'
                });
                row.status = 1;
            }
		}).catch(()=>{
			this.listLoading = false
		})
    },  
    orderStatus({row, rowIndex}){
        if (row.status == 1) {
            return 'ordered-row';
        }
    },
    getList() {
        this.$http({
			url: '/login/login/findcustomerbyuid',
			method: 'post',
			data:this.listQuery
		}).then((res) => {
			this.listLoading = false
				this.total = res.count
				this.list = res.data
		}).catch(()=>{
			this.listLoading = false
		})
	},
	pageChange(p){
		this.listQuery.page = p;
		this.getList()
		console.log(p)
	},
	handleSizeChange(v){
		this.listQuery.limit = v;
		this.getList()
	},
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
	},
	deleteCustomer(row){
		this.$http({
			url: '/login/login/delCustomerbyid',
			method: 'post',
			data:{
				uid:getToken(),
				id:row.id
			}
		}).then((res) => {
			console.log(res)
			if (res.code == 1) {
				this.$notify({
					title: '成功',
					message: '删除成功',
					type: 'success'
				});
				// this.$message.success('删除成功')
				this.getList()
				// this.list = res.data
			}else{
				this.$notify({
					title: '成功',
					message: '删除失败',
					type: 'error'
				});
				// this.$message.error('删除失败')
			}
		}).catch(()=>{
			this.$notify({
				title: '成功',
				message: '删除失败',
				type: 'error'
			});
			// this.$message.error('删除失败')
		})
	},
    handleDownload() {
      this.downloadLoading = true
      import('@/utils/Export2Excel').then(excel => {
        const tHeader = ['订单编号','定稿日期', '客户归属','客户来源', '客户', '聊天旺旺','付款旺旺', '卡名', '工艺','数量', '单价', '版费', '加急费', '收金额','定金', '余款', '旺付款方式旺', '拍款日期', '车间','单价', '版费', '加急费', '卡款出', '利润','刷卡器', '系统', '邮费', '金属标签', '发票类型','发票', '退款', '旺旺', '总支出', '纯利']
        const filterVal = ['ordercode','dingdate','belong', 'source', 'kehu', 'aliwwliao','aliwwfu', 'gy','count','price', 'banfei', 'jiaji', 'shoumoney', 'dingmoney','shengmoney','payment', 'paytime', 'chejian', 'price1', 'banfei1','jiaji1','kakuan', 'lirun', 'shuakaqi', 'system', 'youfei','label','fapiao', 'tuikuan', 'zhichu', 'chunli']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: parseTime(new Date()),
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
	},
	handleDownloadSelect(){
		import('@/utils/Export2Excel').then(excel => {
        const tHeader = ['订单编号','定稿日期', '客户归属','客户来源', '客户', '聊天旺旺','付款旺旺', '卡名', '工艺','数量', '单价', '版费', '加急费', '收金额','定金', '余款', '旺付款方式旺', '拍款日期', '车间','单价', '版费', '加急费', '卡款出', '利润','刷卡器', '系统', '邮费', '金属标签', '发票类型','发票', '退款', '旺旺', '总支出', '纯利']
        const filterVal = ['ordercode','dingdate','belong', 'source', 'kehu', 'aliwwliao','aliwwfu', 'gy','count','price', 'banfei', 'jiaji', 'shoumoney', 'dingmoney','shengmoney','payment', 'paytime', 'chejian', 'price1', 'banfei1','jiaji1','kakuan', 'lirun', 'shuakaqi', 'system', 'youfei','label','fapiao', 'tuikuan', 'zhichu', 'chunli']
        const list = this.selectList
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: parseTime(new Date()),
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
	},
	resetQuery(){
		this.listQuery =  {
			page: 1,
            limit: 20,
            status:'',
			ordercode:'',
			dingdate:'',
			belong:'',
			source: '',
			aliwwliao:'',
			aliwwfu:'',
			kehu:'',
			card:'',
			gy:'',
			count:'',
			price:'',
			banfei:'',
			jiaji:'',
			shoumoney:'',
			realshoumoney:'',
			dingmoney:'',
			shengmoney:'',
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
			beizhu1:'',
			uid:getToken()
		}
	},
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
<style>
.el-table .ordered-row {
    background: #f0f9eb;
  }
	.name-wrapper{
	height: 40px;
	/* width: 100% */
}
.name-wrapper img{
	height: 100%;
	cursor: pointer;
}
.imgbox{
	width:100%;
}
</style>
