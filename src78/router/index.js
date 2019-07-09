	import Vue from 'vue'
	import Router from 'vue-router'

	Vue.use(Router)

	/* Layout */
	import Layout from '@/layout'

	/**
	 * Note: sub-menu only appear when route children.length >= 1
	 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
	 *
	 * hidden: true                   if set true, item will not show in the sidebar(default is false)
	 * alwaysShow: true               if set true, will always show the root menu
	 *                                if not set alwaysShow, when item has more than one children route,
	 *                                it will becomes nested mode, otherwise not show the root menu
	 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
	 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
	 * meta : {
		roles: ['admin','editor']    control the page roles (you can set multiple roles)
		title: 'title'               the name show in sidebar and breadcrumb (recommend set)
		icon: 'svg-name'             the icon show in the sidebar
		breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
		activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
	}
	*/

	/**
	 * constantRoutes
	 * a base page that does not have permission requirements
	 * all roles can be accessed
	 */
	export const constantRoutes = [
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/reg',
		component: () => import('@/views/reg/index'),
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
		redirect: '/dashboard',
		children: [{
		path: 'dashboard',
		name: 'Dashboard',
		component: () => import('@/views/dashboard/index'),
		meta: { title: '首页', icon: 'dashboard' }
		}]
	},
	{
		path: '/todo',
		component: Layout,
		redirect: '/todolist',
		name: 'todolist',
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
	// {
	// 	path: '/image',
	// 	component: Layout,
	// 	redirect: '/image',
	// 	children: [{
	// 		path: 'image',
	// 		name: 'image',
	// 		component: () => import('@/views/image/index'),
	// 		meta: { title: '上传确认稿', icon: 'dashboard' }
	// 	}]
	// },
	// {
	// 	path: '/permission',
	// 	component: Layout,
	// 	redirect: '/permission/page',
	// 	alwaysShow: true, // will always show the root menu
	// 	name: 'Permission',
	// 	meta: {
	// 	title: '权限管理',
	// 	icon: 'dashboard',
	// 	roles: ['0'] // you can set roles in root nav
	// 	},
	// 	children: [
	// 	{
	// 		path: 'page',
	// 		component: () => import('@/views/permission/page'),
	// 		name: 'PagePermission',
	// 		meta: {
	// 		title: '权限管理',
	// 		roles: ['0'] // or you can only set roles in sub nav
	// 		}
	// 	},
	// 	{
	// 		path: 'role',
	// 		component: () => import('@/views/permission/role'),
	// 		name: 'RolePermission',
	// 		meta: {
	// 		title: '角色管理',
	// 		roles: ['0']
	// 		}
	// 	}
	// 	]
	// },
	{
		path: '/customer',
		component: Layout,
		redirect: '/customer/list',
		name: 'customer',
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
		path: '/image',
		component: Layout,
		redirect: '/image',
		children: [{
		path: 'image',
		name: 'image',
		component: () => import('@/views/image/index'),
		meta: { title: '上传确认稿', icon: 'dashboard' }
		}]
	},
	{
		path: '/financial',
		component: Layout,
		redirect: '/financial/manager',
		name: 'financial',
		meta: { title: '财务管理', icon: 'example' },
		children: [
			// {
			// 	path: 'manager',
			// 	name: 'manager',
			// 	component: () => import('@/views/financial/manager'),
			// 	meta: { title: '财务管理', icon: 'table' }
			// },
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
			// {
			// 	path: 'latestpay',
			// 	name: 'latestpay',
			// 	component: () => import('@/views/financial/latestpay'),
			// 	meta: { title: '最近支出', icon: 'tree' }
			// },
			// {
			// 	path: 'transfer',
			// 	name: 'transfer',
			// 	component: () => import('@/views/financial/transfer'),
			// 	meta: { title: '内部转账', icon: 'tree' }
			// }
		]
	},

	// 404 page must be placed at the end !!!
	{ path: '*', redirect: '/404', hidden: true }
	]

	const createRouter = () => new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRoutes
	})

	const router = createRouter()

	// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
	export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
	}

	export default router
