<template>
	<div class="app-container" id="image-manager">
        <el-row :gutter="20">
            <el-col :span="8">

                <el-card class="box-card">
                    <div class="imagename">
                        图片名称：<el-input v-model="uploadData.name" placeholder="请输入图片名称" style="width: 50%;" class="filter-item" />
                    </div>
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        name='picurl'
                        accept="image/*"
                        :action="api+'/login/login/uploadimage'"
                        list-type="picture-card"
                        :on-success="handleAvatarSuccess"
                        :on-preview="handlePictureCardPreview"
                        :on-error='onError'
                        :on-remove="handleRemove"
                        :data='uploadData'
                        :file-list="fileList"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button  size="small" type="success" class="upload-btn" @click="submitUpload">上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传图片</div> -->
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card class="box-card1">
                    <h3>上传记录</h3>
                    <el-card class="box-card">
                        <el-input v-model="search.name" placeholder="请输入图片名称" style="width: 50%;" class="filter-item" />
                        <el-button  type="primary" @click="searchByName">
                            搜索
                        </el-button>
                    </el-card>
                    <el-table
                        :data="list"
                        border
                        fit
                        highlight-current-row
                        :show-overflow-tooltip='true'
                        style="width: 100%;height:700px"
                        empty-text='暂无数据'
                    >
                        <el-table-column label="上传时间"  align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.time }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="名称"  align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="预览"  align="center" >
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>点击打开新窗口预览</p>
                                    <div slot="reference" class="name-wrapper thumbnail">
                                        <!-- <div class="thumbnail"> -->
                                            <a :href="scope.row.url" target="_blank" rel="noopener noreferrer">
                                                <img :src="scope.row.url" alt="">
                                            </a>
                                        <!-- </div> -->
                                    </div>
                                    </el-popover>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        @current-change="pageChange"
                        :current-page='getlistData.page'
                        :page-size="getlistData.pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </el-card>
            </el-col>
        </el-row>
        
	</div>
	</template>

	<script>
    import { getToken,getPower } from '@/utils/auth'
	export default {
	data() {
		return {
            name:'',
            fileList:[],
            api:'',
            uploadData:{
                'uid':getToken(),
                'name':''
            },
            list:[],
            dialogVisible:false,
            dialogImageUrl:'',
            total:0,
            getlistData:{
                'page':1,
                'pageSize':10,
                'uid':getToken(),
            },
            search:{
                'page':1,
                'pageSize':10,
                'name':'',
                'uid':getToken(),

            }
		};
    },
    mounted(){
        this.api = process.env.VUE_APP_BASE_API
        this.getImageList() 
    },
	methods: {
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        searchByName(){
            this.$http({
                url: '/login/login/getImageByName',
                method: 'post',
                data:this.search
            }).then((res) => {
                    console.log(res)
                if (res.code == 1) {
                    this.total = res.total;
                    this.list = res.data;
                }else{
                    // this.$message.success('获取列表成功')
                    this.list = []
                    this.total = 0
                }
            }).catch(()=>{
            })
        },
        getImageList() {
            this.$http({
                url: '/login/login/getImageList',
                method: 'post',
                data:this.getlistData
            }).then((res) => {
                    console.log(res)
                if (res.code == 1) {
                    this.total = res.total;
                    this.list = res.data;
                }else{
                    // this.$message.success('获取列表成功')
                    this.list = []
                    this.total = 0
                }
            }).catch(()=>{
            })
        },
        pageChange(p){
            this.getlistData.page = p;
            this.getImageList()
            console.log(p)
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        onError(err, file, fileList){
            console.log(err,file, fileList);
        },
        handleAvatarSuccess(res){
            console.log(res);
            if (res.code == 1) {
                this.$notify({
                    title: '成功',
                    message: '上传成功',
                    type: 'success'
                });
                this.getImageList() 
            }else{
                this.$notify({
                    title: '失败',
                    message: '上传失败',
                    type: 'error'
                });
            }
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

