export default {
  plugins: [
    'react-static-plugin-emotion',
    'react-static-plugin-typescript',
    'react-static-plugin-sass'
  ],
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
        component: 'src/garden-page'
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
