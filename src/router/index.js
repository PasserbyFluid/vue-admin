	import Vue from 'vue'
	import Router from 'vue-router'

	Vue.use(Router)
	import Layout from '@/layout'

	export const constantRoutes = [
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/404'),
		hidden: true
	},
	{
		path: '/',
		component: Layout,
		redirect: '/list',
		name: 'todolist',
		roles:'01',
		// meta: { title: '待办事项', icon: 'example' },
		children: [
		{
			path: 'list',
			name: 'list',
			component: () => import('@/views/todo/todolist'),
			meta: { title: '待办事项', icon: 'table' }
		}
		]
	},
	{
		path: '/customer',
		component: Layout,
		redirect: '/customer/list',
		name: 'customer',
		roles:'01',
		meta: { title: '客户', icon: 'example' },
		children: [
		
		{
			path: 'add',
			name: 'add',
			component: () => import('@/views/add/index'),
			meta: { title: '添加客户', icon: 'tree' }
		},
		{
			path: 'order',
			name: 'order',
			component: () => import('@/views/order/order'),
			meta: { title: '订单跟进', icon: 'tree' }
		},
		{
			path: 'list',
			name: 'list',
			component: () => import('@/views/list/index'),
			meta: { title: '客户管理', icon: 'table' }
		}
		]
	},
	{
		path: '/financial',
		component: Layout,
		roles:'01',
		redirect: '/financial/manager',
		name: 'financial',
		meta: { title: '财务管理', icon: 'example' },
		children: [
			{
				path: 'income',
				name: 'income',
				component: () => import('@/views/financial/income'),
				meta: { title: '增加收入', icon: 'tree' }
			},
			{
				path: 'pay',
				name: 'pay',
				component: () => import('@/views/financial/pay'),
				meta: { title: '增加支出', icon: 'table' }
			},
		]
	},
	{
		path: '/image',
		component: Layout,
		redirect: '/image',
		roles:'0',
		children: [{
			path: 'image',
			name: 'image',
			component: () => import('@/views/image/index'),
			meta: { title: '管理设置', icon: 'dashboard' }
		}]
	},

	{ path: '*', redirect: '/404', hidden: true }
	]
	const createRouter = () => new Router({
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRoutes
	})

	const router = createRouter()

	export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
	}

	export default router
