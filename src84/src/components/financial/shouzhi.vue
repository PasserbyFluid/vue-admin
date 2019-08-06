<template>
  <div id="shouzhi">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="审核状态">
            <el-radio-group v-model="form.resource">
                <el-radio label="1">全部</el-radio>
                <el-radio label="2">已审核</el-radio>
                <el-radio label="3">未审核</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="收入支出">
            <el-radio-group v-model="form.resource">
                <el-radio label="1">全部</el-radio>
                <el-radio label="2">收入</el-radio>
                <el-radio label="3">支出</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="付款方式">
            <el-radio-group v-model="form.resource">
                <el-radio label="1">全部</el-radio>
                <el-radio label="xj">现金</el-radio>
                <el-radio label="gh">工行</el-radio>
                <el-radio label="nh">农行</el-radio>
                <el-radio label="jh">建行</el-radio>
                <el-radio label="zhh">中行</el-radio>
                <el-radio label="zh">招行</el-radio>
                <el-radio label="zfb">支付宝</el-radio>
                <el-radio label="zp">支票</el-radio>
                <el-radio label="yz">邮政</el-radio>
                <el-radio label="wx">微信</el-radio>
                <el-radio label="hz">坏账</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="收支类型">
            <el-radio-group v-model="form.resource">
                <el-radio label="1">全部</el-radio>
                <el-radio label="xj">货款</el-radio>
                <el-radio label="gh">成本</el-radio>
                <el-radio label="nh">运费_收货</el-radio>
                <el-radio label="jh">运费_发货</el-radio>
                <el-radio label="zhh">运费_收入</el-radio>
                <el-radio label="zh">手续费</el-radio>
                <el-radio label="zfb">广告费</el-radio>
                <el-radio label="zp">工资</el-radio>
                <el-radio label="yz">退款</el-radio>
                <el-radio label="wx">回扣</el-radio>
                <el-radio label="hz">日常支出</el-radio>
                <el-radio label="hz">内部转账</el-radio>
                <el-radio label="hz">坏账</el-radio>
                <el-radio label="hz">租金</el-radio>
                <el-radio label="hz">办公用品</el-radio>
                <el-radio label="hz">分红</el-radio>
                <el-radio label="hz">其他</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="其他参数">
            <el-radio-group v-model="form.resource">
                <el-radio label="1">全部</el-radio>
                <el-date-picker
                    v-model="date"
                    type="datetimerange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                </el-date-picker>
                <el-select v-model="value" placeholder="添加人">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value" placeholder="查款人">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-radio label="hz">其他</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "1",
        desc: ""
      },
      date:'',
      pickerOptions: {
          shortcuts: [ {
            text: '今天',
            onClick(picker) {
              const end = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
              start.setTime(start);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const end = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1- 3600 * 1000 * 24 * 1);
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '前天',
            onClick(picker) {
              const end = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1- 3600 * 1000 * 24 * 2);
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
         options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>