<template>
	<div class="app-container" id="image-manager">
        <el-row>
            <el-col  :span="12">
                <el-form :rules="rules" ref="ruleForm"  :model="form" label-width="80px">
                    <el-form-item label="用户名称"  prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="权限" prop="power">
                        <el-select v-model="form.power" placeholder="请选择权限">
                        <el-option label="管理员" value="0"></el-option>
                        <el-option label="普通用户" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
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
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
                power:{ required: true, message: '请选择权限', trigger: 'blur' },
            }
		};
    },
    mounted(){
        this.api = process.env.VUE_APP_BASE_API
    },
	methods: {
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http({
                        url: '/login/user/create',
                        method: 'post',
                        data:this.form
                    }).then((res) => {
                        if (res.code == 1) {
                            this.$notify({
                                title: '成功',
                                message:res.msg,
                                type: 'success'
                            });
                        }else{
                            this.$notify({
                                title: '失败',
                                message:res.msg,
                                type: 'error'
                            });
                        }
                            console.log(res)
                    }).catch(()=>{
                        this.$notify({
                                title: '失败',
                                message:'创建失败，稍后再试',
                                type: 'error'
                            });
                    })
                } else {
                    return false;
                }
            })
        },
	}
	};
	</script>

    <style scoped>
    .imagename{
        padding: 10px 0
    }
    .box-card1{
        /* margin-top: 20px; */
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

