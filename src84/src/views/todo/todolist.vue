<template>
    <div class="block">
        <el-card class="box-card">
            <el-input v-model="todoName" placeholder="任务内容" style="width: 50%;" class="filter-item"  />
            <el-date-picker
                v-model="todoTime"
                align="right"
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                >
            </el-date-picker>
            <el-button  type="primary" @click="addTodo">
                添加
            </el-button>
        </el-card>
        <el-card class="box-card">
            <el-timeline>
                <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :class="{'did':activity.status == '1'}"
                :timestamp="activity.timestamp">
                {{activity.content}}
                    
                <div style="display:inline-block;margin-left:20px;">
                    <el-button  class="button-new-tag" size="mini" @click="del(index,activity)">删除</el-button>
                <el-button type="primary"  class="button-new-tag" size="mini" @click="did(activity)">已完成</el-button>
                </div>
                </el-timeline-item>
            </el-timeline>
            <p style="text-align:center;" v-if="activities.length == 0">暂无待办事项</p>
        </el-card>
    </div>

</template>

<script>
import { getToken} from '@/utils/auth'
  export default {
    data() {
      return {
        activities: [],
        // isdid:false,
        todoName:'',
        todoTime:new Date(),
        inputVisible: false,
        inputValue: '',
        dynamicTags:[['ddd']]
      };
    },
    mounted(){
        this.getList()
    },
    methods:{
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            // this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        did(item){
            if (item.status == '0') {
                this.$http({
                    url: '/login/todo/updateStatus',
                    method: 'post',
                    data:{
                        uid:getToken(),
                        id:item.id,
                    }
                }).then((res) => {
                    this.getList()
                })
            }
        },
        del(i,item){
            this.activities.splice(i,1);
            this.$http({
                url: '/login/todo/deltodo',
                method: 'post',
                data:{
                    uid:getToken(),
                    id:item.id
                }
            }).then((res) => {
                // console.log(res)
            })
        },
        leInputConfirm(i) {
            let inputValue = this.inputValue;
            if (inputValue) {
               if (!this.dynamicTags[i]) {
                   this.dynamicTags[i] = []
            this.dynamicTags[i].push(inputValue);
               }
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        addTodo(){
            if (this.todoName == '') {
                this.$message.warning('请输入待办事项名称')
                return
            }else{
                let obj = {
                    content: this.todoName,
                    timestamp: new Date(this.todoTime).format('yyyy-MM-dd hh:mm:ss'),
                    isdid:false,
                    uid:getToken()
                }
                this.$http({
                    url: '/login/todo/addtodo',
                    method: 'post',
                    data:obj
                }).then((res) => {
                    // console.log(res)
                    if (res.code == 1) {
                        this.getList()
                        this.$message.success('添加成功')
                    }
                })
                this.todoName = '';
            }
            
        },
        getList(){
            this.$http({
                url: '/login/todo/getTodoList',
                method: 'post',
                data:{
                    uid:getToken(),
                    page:1,
                    pageSize:10
                }
            }).then((res) => {
                this.activities = res.list
                // console.log(res)
                this.$store.dispatch('app/setList',res.list)
            })
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

    }
  };
</script>

<style>
.did,.did .el-timeline-item__timestamp,.did .el-timeline-item__content{
    text-decoration: line-through;
    color:#409EFF
}
</style>
