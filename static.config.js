export default {
  plugins: ['react-static-plugin-emotion', 'react-static-plugin-typescript'],
  getSiteData: () => ({
    title: 'React Static'
  }),
  getRoutes: () => {
    return [
      {
        path: '/',
        component: 'src/landing'
      },
      {
        path: '/:id',
        component: 'src/garden'
      },
      {
        path: '/challenge',
        component: 'src/challenge'
      },
      {
        path: '404',
        component: 'src/404'
      }
    ]
  }
}
