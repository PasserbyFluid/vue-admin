<template>
	<div class="app-container" id="image-manager">
       <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="权限">
            <el-select v-model="form.power" placeholder="请选择活动区域">
            <el-option label="管理员" value="0"></el-option>
            <el-option label="普通用户" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>
	</div>
	</template>

	<script>
    import { getToken,getPower } from '@/utils/auth'
	export default {
	data() {
		return {
            form:{
                name:'',
                password:'',
                power:''
            }
		};
    },
    mounted(){
        this.api = process.env.VUE_APP_BASE_API
        this.getImageList() 
    },
	methods: {
        onSubmit() {
            this.$http({
                url: '/login/user/create',
                method: 'post',
                data:this.form
            }).then((res) => {
                this.$notify({
						title: '成功',
						message:res.msg,
						type: 'success'
					});
                    console.log(res)
            }).catch(()=>{
            })
        },
	}
	};
	</script>

    <style scoped>
    .imagename{
        padding: 10px 0
    }
	.line {
	    text-align: center;
    }
    .thumbnail{
        height: 40px;
    }
    .thumbnail img{
        height: 100%;
    }
    .tips{
        font-size: 14px;
        color: #aaa
    }
    .upload-demo{
        display: flex;
        align-items: center;
    }
    .upload-btn{
        height: 40px;
        margin-left: 10px;
    }
	</style>

