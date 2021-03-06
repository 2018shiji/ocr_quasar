
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'index', component: () => import('pages/Index.vue') },
      { path: 'role', component: () => import('components/RoleResult.vue') },
      { path: 'register', component: () => import('components/RegisterResult.vue') },
      { path: 'roleAction', component: () => import('components/RoleActionResult.vue') },
      { path: 'vesselBox', component: () => import('components/VelBoxResult.vue') },
      { path: 'workProcess', component: () => import('components/WorkProcessResult.vue') },
      { path: 'loadOrder', component: () => import('components/LoadOrderResult.vue') },
      { path: 'unloadOrder', component: () => import('components/WorkProcessResult.vue') },
      { path: 'order', component: () => import('components/OrderResult.vue') },
      { path: 'vesselSchedule', component: () => import('components/VesselSchedule.vue') },
      { path: 'vesselStruct', component: () => import('components/VelStructResult.vue') },
      { path: 'boxByNum', component: () => import('components/BoxByNumResult.vue') },
      { path: 'berthMessage', component: () => import('components/BerthMsgResult.vue') },
      { path: 'multiVesselBox', component: () => import('components/MultiResult.vue') },
      { path: 'test', component: () => import('pages/Index.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
