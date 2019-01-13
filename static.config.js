export default {
  siteRoot: 'https://gitgarden.io',
  plugins: [
    'react-static-plugin-emotion',
    'react-static-plugin-typescript',
    'react-static-plugin-sass'
  ],
  getSiteData: () => ({
    title: 'Git Garden'
  }),
  getRoutes: () => {
    return [
      {
        path: '/',
        component: 'src/landing'
      },
      {
        path: '/:user',
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
