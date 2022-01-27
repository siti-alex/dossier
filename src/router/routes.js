
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/persons', component: () => import('pages/persons/index')},
      { path: '/person/:id', component: () => import('pages/persons/person/index')},
      { path: '/export', component: () => import('pages/export/index')},
      { path: '/search', component: () => import('pages/search/index')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
