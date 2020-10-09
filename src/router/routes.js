
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'index', component: () => import('pages/Index.vue') },
      { path: 'role', component: () => import('components/SingleResult.vue') },
      { path: 'vesselBox', component: () => import('components/SingleResult.vue') },
      { path: 'workProcess', component: () => import('components/SingleResult.vue') },
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
