<template>
  <div class="app-container" id="order">
    <div class="filter-container">
		<el-card class="box-card">
			<div class="query-box">
                <el-select v-model="listQuery.isenable" placeholder="客户情况" clearable class="filter-item" style="width: 130px">
					<el-option label="有意客户"  value="1"/>
					<el-option label="无效客户"  value="0"/>
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
				<el-select v-model="listQuery.payment" placeholder="全款付款方式">
					<el-option v-for="item in paymentList" :key="item.key" :label="item.key" :value="item.value" />
				</el-select>
				<!-- <el-input v-model="listQuery.payment" placeholder="全款付款方式" style="width: 100px;" class="filter-item" /> -->
				<el-input v-model="listQuery.huoqi" placeholder="全款付款时间" style="width: 100px;" class="filter-item" />
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
				<el-input v-model="listQuery.wuliucode" placeholder="物流单号" style="width: 100px;" class="filter-item" />
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
					<template v-if="scope.row.edit">
						<el-input v-model="scope.row.dingdate" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.dingdate }}</span>
				</template>
			</el-table-column>
			<el-table-column label="客户归属"  align="center" v-if="power == '0'"  width="150px">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-select v-if="power == '0'" v-model="scope.row.belong" placeholder="客户归属" clearable>
							<el-option v-for="item in userList" :key="item.id" :label="item.username" :value="item.username" />
						</el-select>
						<!-- <el-input v-model="scope.row.belong" class="edit-input" size="small" /> -->
					</template>
					<span v-else>{{ scope.row.belong }}</span>
					<!-- <span>{{ scope.row.belong }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="客户来源"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-select v-model="scope.row.source" placeholder="选择客户来源"  clearable filterable allow-create default-first-option>
							<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.key" :value="item.value" />
						</el-select>
						<!-- <el-input v-model="scope.row.source" class="edit-input" size="small" /> -->
					</template>
					<span v-else>{{ scope.row.source }}</span>
					<!-- <span>{{ scope.row.source}}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="聊天旺旺"    align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input v-model="scope.row.aliwwliao" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.aliwwliao }}</span>
					<!-- <span class="link-type">{{ row.aliwwliao }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="付款旺旺"    align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input v-model="scope.row.aliwwfu" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.aliwwfu }}</span>
				<!-- <span class="link-type">{{ row.aliwwfu }}</!-->
				</template>
			</el-table-column>
			<el-table-column label="客户类型"  width="100px"  align="center" show-overflow-tooltip>
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-select v-model="scope.row.kehu" placeholder="选择客户类型"  clearable filterable allow-create default-first-option>
							<el-option label="店面" value="店面"/>
							<el-option label="公司" value="公司"/>
							<el-option label="印刷广告" value="印刷广告"/>
							<el-option label="设计" value="设计"/>
							<el-option label="软件公司" value="软件公司"/>
						</el-select>
						<!-- <el-input v-model="scope.row.kehu" class="edit-input" size="small" /> -->
					</template>
					<span v-else>{{ scope.row.kehu }}</span>
				<!-- <span class="link-type">{{ row.kehu }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="卡名"  align="center"  width="200px">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input v-model="scope.row.card" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.card }}</span>
				<!-- <span>{{ scope.row.card }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="工艺"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input v-model="scope.row.gy" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.gy }}</span>
				<!-- <span>{{ scope.row.gy }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="数量"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input type='number' v-model="scope.row.count" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.count }}</span>
				<!-- <span>{{ scope.row.count }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="收单价"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input type='number' v-model="scope.row.price" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.price }}</span>
				<!-- <span>{{ scope.row.price }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="收版费"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input type='number' v-model="scope.row.banfei" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.banfei }}</span>
				<!-- <span>{{ scope.row.banfei }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="收加急费"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input type='number' v-model="scope.row.jiaji" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.jiaji }}</span>
				<!-- <span>{{ scope.row.jiaji }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="收金额"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<span>{{ (Number(scope.row.price)*Number(scope.row.count)+Number(scope.row.jiaji)+Number(scope.row.banfei)).toFixed(2)}}</span>
					</template>
					<span v-else>{{ scope.row.shoumoney }}</span>
				<!-- <span>{{ (scope.row.price*scope.row.count+Number(scope.row.jiaji)+Number(scope.row.banfei)).toFixed(2)}}</span> -->
				<p v-if="scope.row.shoubeizhu">备注：{{scope.row.shoubeizhu}}</p>
				</template>
			</el-table-column>
			<el-table-column label="实际到账金额"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input type='number' v-model="scope.row.realshoumoney" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.realshoumoney }}</span>
				<!-- <span>{{ scope.row.shoumoney }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="全款付款方式"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-select v-model="scope.row.payment" placeholder="全款付款方式" clearable filterable allow-create default-first-option>
							<el-option v-for="item in paymentList" :key="item.key" :label="item.key" :value="item.value" />
						</el-select>
					</template>
					<span v-else>{{ scope.row.payment }}</span>
				</template>
			</el-table-column>
			<el-table-column label="全款付款时间"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-date-picker
							v-model="scope.row.paytime"
							align="right"
							type="date"
							placeholder="选择日期"
							value-format="yyyy-MM-dd"
							>
						</el-date-picker>
						<!-- <el-input v-model="scope.row.paytime" class="edit-input" size="small" /> -->
					</template>
					<span v-else>{{ scope.row.paytime }}</span>
				</template>
			</el-table-column>
			<el-table-column label="定金"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input type='number' v-model="scope.row.dingmoney" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.dingmoney }}</span>
				<!-- <span>{{ scope.row.dingmoney }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="定金付款方式"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-select v-model="scope.row.paymentding" placeholder="定金付款方式" clearable filterable allow-create default-first-option>
							<el-option v-for="item in paymentList" :key="item.key" :label="item.key" :value="item.value" />
						</el-select>
					</template>
					<span v-else>{{ scope.row.paymentding }}</span>
				</template>
			</el-table-column>
			<el-table-column label="定金付款时间"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-date-picker
							v-model="scope.row.paytimeding"
							align="right"
							type="date"
							placeholder="定金付款时间"
							value-format="yyyy-MM-dd"
							>
						</el-date-picker>
						<!-- <el-input v-model="scope.row.paytimeding" class="edit-input" size="small" /> -->
					</template>
					<span v-else>{{ scope.row.paytimeding }}</span>
				</template>
			</el-table-column>
			<el-table-column label="余款"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input v-model="scope.row.shengmoney" class="edit-input" size="small" />
						<!-- <span>{{ Number(scope.row.realshoumoney) - Number(scope.row.dingmoney)  }}</span> -->
					</template>
					<span v-else>{{ scope.row.shengmoney }}</span>
				<!-- <span>{{ scope.row.shengmoney }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="余款付款方式"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-select v-model="scope.row.paymentyu" placeholder="余款付款方式" clearable filterable allow-create default-first-option>
							<el-option v-for="item in paymentList" :key="item.key" :label="item.key" :value="item.value" />
						</el-select>
					</template>
					<span v-else>{{ scope.row.paymentyu }}</span>
				</template>
			</el-table-column>
			<el-table-column label="余款付款时间"  align="center">
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
					<span v-else>{{ scope.row.paytimeyu }}</span>
				</template>
			</el-table-column>
			<el-table-column label="货期"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input v-model="scope.row.huoqi" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.huoqi }}</span>
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
					<span v-else>{{ scope.row.chejian }}</span>
				<!-- <span>{{ scope.row.chejian }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="出单价"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input type='number' v-model="scope.row.price1" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.price1 }}</span>
				<!-- <span>{{ scope.row.price1 }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="出版费"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input type='number' v-model="scope.row.banfei1" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.banfei1 }}</span>
				<!-- <span>{{ scope.row.banfei1 }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="出加急费"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input type='number' v-model="scope.row.jiaji1" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.jiaji1 }}</span>
				<!-- <span>{{ scope.row.jiaji1 }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="卡款出"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<span >{{(Number(scope.row.price1) * Number(scope.row.count) + Number(scope.row.banfei1) + Number(scope.row.jiaji1)).toFixed(2)}}</span>
					</template>
					<span v-else>{{ scope.row.kakuan }}</span>
				</template>
			</el-table-column>
			<el-table-column label="供应商结款 "  align="center" width="100">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input v-model="scope.row.jiekuan" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.jiekuan }}</span>
				<!-- <span>{{ scope.row.jiekuan }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="利润"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<span>{{ Number(scope.row.realshoumoney) -(Number(scope.row.price1) * Number(scope.row.count) + Number(scope.row.banfei1) + Number(scope.row.jiaji1)).toFixed(2) }}</span>
					</template>
					<span v-else>{{ scope.row.lirun }}</span>
				<!-- <span>{{ scope.row.lirun }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="刷卡器"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input type='number' v-model="scope.row.shuakaqi" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.shuakaqi }}</span>
				<!-- <span>{{ scope.row.shuakaqi }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="系统"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input type='number' v-model="scope.row.system" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.system }}</span>
				<!-- <span>{{ scope.row.system }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="邮费"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input type='number' v-model="scope.row.youfei" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.youfei }}</span>
				<!-- <span>{{ scope.row.youfei }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="金属标签"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input type='number' v-model="scope.row.label" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.label }}</span>
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
							<el-option label="无发票" value="0"/>
						</el-select>
						<!-- <el-input v-model="scope.row.fapiao" class="edit-input" size="small" /> -->
					</template>
					<span v-else>{{ scope.row.fapiao }}</span>
				<!-- <span>{{ scope.row.fapiao }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="税额"  align="center">
				<template slot-scope="scope">
				<span>{{ (scope.row.fapiao).indexOf('6') > -1 ? scope.row.realshoumoney * 0.06 : (scope.row.fapiao).indexOf('13') > -1 ? scope.row.realshoumoney * 0.13 :0}}</span>
				</template>
			</el-table-column>
			<el-table-column label="退款"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input type='number' v-model="scope.row.tuikuan" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.tuikuan }}</span>
				<!-- <span>{{ scope.row.tuikuan }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="总支出"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<span>{{ ( Number(scope.row.price1) * Number(scope.row.count) + Number(scope.row.banfei1) + Number(scope.row.jiaji1)+Number(scope.row.shuakaqi) + Number(scope.row.system) +Number(scope.row.youfei)+Number(scope.row.label)+Number(scope.row.shuie)+Number(scope.row.tuikuan)).toFixed(2) }}</span>
					</template>
					<span v-else>{{ scope.row.zhichu }}</span>
					<!-- <span >{{(Number(scope.row.price1) * Number(scope.row.count) + Number(scope.row.banfei1) + Number(scope.row.jiaji1)).toFixed(2)}}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="纯利"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<span>{{ scope.row.realshoumoney -( Number(scope.row.price1) * Number(scope.row.count) + Number(scope.row.banfei1) + Number(scope.row.jiaji1)+Number(scope.row.shuakaqi) + Number(scope.row.system) +Number(scope.row.youfei)+Number(scope.row.label)+Number(scope.row.shuie)+Number(scope.row.tuikuan)).toFixed(2) }}</span>
					</template>
					<span v-else>{{ scope.row.chunli }}</span>
				<!-- <span>{{ scope.row.chunli }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="提点"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input v-model="scope.row.tidian" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.tidian }}</span>
				<!-- <span>{{ scope.row.tidian }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="设计"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input v-model="scope.row.sheji" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.sheji }}</span>
				<!-- <span>{{ scope.row.sheji }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="收货地址"  align="center" width="200" show-overflow-tooltip>
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input v-model="scope.row.dizhi" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.dizhi }}</span>
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
					<span v-else>{{ scope.row.kuaidi }}</span>
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
					<span v-else>{{ scope.row.fahuotime }}</span>
				<!-- <span>{{ scope.row.kuaidi }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="物流单号"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input v-model="scope.row.wuliucode" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.wuliucode }}</span>
				</template>
			</el-table-column>
			<el-table-column label="备注"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input v-model="scope.row.beizhu" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.beizhu }}</span>
				</template>
			</el-table-column>
			<el-table-column label="备注1"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input v-model="scope.row.beizhu1" class="edit-input" size="small" />
					</template>
					<span v-else>{{ scope.row.beizhu1 }}</span>
				<!-- <span>{{ scope.row.beizhu }}</span> -->
				</template>
			</el-table-column>
			<el-table-column label="确认稿"  align="center" width="100">
				<template slot-scope="scope">
					<template  v-if="scope.row.edit">
						<el-upload
							class="upload-demo"
							name='userimg'
							:action="api+'/login/login/uploadUserImg'"
							accept="image/*"
							:show-file-list='false'
							:on-success="handleAvatarSuccess"
							:data='{id:scope.row.id}'
							>
							<el-button size="mini" type="primary" >修改</el-button>
						</el-upload>
					</template>
					<template v-else>
						<div v-if="scope.row.url ==null">
							<el-upload
								class="upload-demo"
								name='userimg'
								disabled
								:action="api+'/login/login/uploadUserImg'"
								accept="image/*"
								:on-success="handleAvatarSuccess"
								:data='{id:scope.row.id}'
								>
								<el-button v-if="scope.row.isduizhang =='0' " size="small" type="primary" >点击上传</el-button>
								<el-button v-else disabled size="small" type="primary" >点击上传</el-button>
							</el-upload>
						</div>
						<div v-else>
							<div slot="reference" class="name-wrapper" @click="showModal(scope.row.url)">
								<img :src="scope.row.url" alt="">
							</div>
						</div>
					</template>
				</template>
				<!-- <template slot-scope="scope">
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
						<div slot="reference" class="name-wrapper" @click="showModal(scope.row.url)">
							<img :src="scope.row.url" alt="">
						</div>
					</div>
				</!--> -->
			</el-table-column>
			<el-table-column label="操作" align="center" width="260"  class-name="small-padding fixed-width" >
				<template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="order(scope.row)" >
                        下单
                    </el-button>
					<el-button size="mini" type="success" @click="scope.row.edit=!scope.row.edit" v-if="!scope.row.edit">
						修改
					</el-button>
					<el-button size="mini"  @click="scope.row.edit=!scope.row.edit" v-else>
						取消
					</el-button>
					<el-button
						v-if="scope.row.edit"
						type="success"
						size="mini"
						@click="confirmEdit(scope)"
					>
						保存
					</el-button>
                    <el-button size="mini" type="danger" @click="deleteCustomer(scope.row)" v-if="power == 0">
                        删除
                    </el-button>
					<el-button size="mini" type="info" @click="disableCustomer(scope.row)">
                        无效
                    </el-button>
				</template>
			</el-table-column>
			</el-table>
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="pageChange"
				:current-page='listQuery.page'
				:page-sizes="[10, 50, 100, 500,1000]"
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
			paymentding:'',
			paytimeding:'',
			shengmoney:'',
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
			tuikuan:'',
			zhichu:'',
			chunli:'',
			tidian:'',
			sheji:'',
			dizhi:'',
			kuaidi:'',
			wuliucode:'',
			beizhu:'',
			isenable:'1',
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
	this.api = process.env.VUE_APP_BASE_API
	this.getList()
	this.getUsers()
  },
  methods: {
	confirmEdit(scope) {
		scope.row.shoumoney = (Number(scope.row.price)*Number(scope.row.count)+Number(scope.row.jiaji)+Number(scope.row.banfei)).toFixed(2);
		scope.row.kakuan = (Number(scope.row.price1) * Number(scope.row.count) + Number(scope.row.banfei1) + Number(scope.row.jiaji1)).toFixed(2);
		// scope.row.shengmoney = Number(scope.row.realshoumoney) - Number(scope.row.dingmoney) ;
		scope.row.zhichu = ( Number(scope.row.price1) * Number(scope.row.count) + Number(scope.row.banfei1) + Number(scope.row.jiaji1)+Number(scope.row.shuakaqi) + Number(scope.row.system) +Number(scope.row.youfei)+Number(scope.row.label)+Number(scope.row.shuie)+Number(scope.row.tuikuan)).toFixed(2);
		scope.row.lirun = Number(scope.row.realshoumoney) -(Number(scope.row.price1) * Number(scope.row.count) + Number(scope.row.banfei1) + Number(scope.row.jiaji1)).toFixed(2);
		scope.row.chunli = Number(scope.row.realshoumoney) -( Number(scope.row.price1) * Number(scope.row.count) + Number(scope.row.banfei1) + Number(scope.row.jiaji1)+Number(scope.row.shuakaqi) + Number(scope.row.system) +Number(scope.row.youfei)+Number(scope.row.label)+Number(scope.row.shuie)+Number(scope.row.tuikuan)).toFixed(2);
		scope.row.shuie = (scope.row.fapiao).indexOf('6') > -1 ? scope.row.realshoumoney * 0.06 : (scope.row.fapiao).indexOf('13') > -1 ? scope.row.realshoumoney * 0.13 :0
		scope.row.uid = getToken()
		console.log(scope.row)
		this.$http({
			url: '/login/login/updatecustomer',
			method: 'post',
			data:scope.row
		}).then((res) => {
			if (res.code == 1) {
				this.$notify({
					title: '成功',
					message: '更新成功',
					type: 'success'
				});
			}else{
				this.$notify({
					title: '失败',
					message: `更新失败:${res.msg}`,
					type: 'error'
				});
			}
		}).catch(()=>{
			this.$notify({
				title: '失败',
				message: '更新失败',
				type: 'error'
			});
		})
		// updatecustomer
		scope.row.edit = false
	},
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
				this.getList()
                row.status = 1;
            }
		}).catch(()=>{
			this.$notify({
				title: '失败',
				message: '更新失败',
				type: 'error'
			});
		})
	},  
	disableCustomer(row){
		this.$http({
			url: '/login/login/updateOrderAble',
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
				this.getList()
            }
		}).catch(()=>{
			this.$notify({
                    title: '失败',
                    message: '更新失败',
                    type: 'error'
				});
		})
	},
    orderStatus({row, rowIndex}){
        if (row.status == 1) {
            return 'ordered-row';
        }
    },
    getList() {
        this.$http({
			url: '/login/login/orderList',
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
		const tHeader = ['订单编号','定稿日期', '客户归属','客户来源', '客户', '聊天旺旺','付款旺旺', '卡名', '工艺','数量', '收单价', '收版费', '收加急费', '收金额','定金', '定金付款方式', '定金拍款日期', '余款','余款付款方式', '余款拍款日期',  '全款付款方式', '拍款日期', '车间','出单价', '出版费', '出加急费', '卡款出', '利润','刷卡器', '系统', '邮费', '金属标签', '发票类型','税额', '退款', '总支出', '纯利']
        const filterVal = ['ordercode','dingdate','belong', 'source', 'kehu', 'aliwwliao','aliwwfu', 'gy','count','price', 'banfei', 'jiaji', 'shoumoney', 'dingmoney','paymentding', 'paytimeding','shengmoney','paymentyu', 'paytimeyu','payment', 'paytime', 'chejian', 'price1', 'banfei1','jiaji1','kakuan', 'lirun', 'shuakaqi', 'system', 'youfei','label','fapiao','shuie',  'tuikuan', 'zhichu', 'chunli']
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
        const tHeader = ['订单编号','定稿日期', '客户归属','客户来源', '客户', '聊天旺旺','付款旺旺', '卡名', '工艺','数量', '收单价', '收版费', '收加急费', '收金额','定金', '定金付款方式', '定金拍款日期', '余款','余款付款方式', '余款拍款日期',  '全款付款方式', '拍款日期', '车间','出单价', '出版费', '出加急费', '卡款出', '利润','刷卡器', '系统', '邮费', '金属标签', '发票类型','税额', '退款', '总支出', '纯利']
        const filterVal = ['ordercode','dingdate','belong', 'source', 'kehu', 'aliwwliao','aliwwfu','card', 'gy','count','price', 'banfei', 'jiaji', 'shoumoney', 'dingmoney','paymentding', 'paytimeding','shengmoney','paymentyu', 'paytimeyu','payment', 'paytime', 'chejian', 'price1', 'banfei1','jiaji1','kakuan', 'lirun', 'shuakaqi', 'system', 'youfei','label','fapiao','shuie', 'tuikuan', 'zhichu', 'chunli']
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
			paymentding:'',
			paytimeding:'',
			shengmoney:'',
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
			tuikuan:'',
			zhichu:'',
			chunli:'',
			tidian:'',
			sheji:'',
			dizhi:'',
			kuaidi:'',
			wuliucode:'',
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
