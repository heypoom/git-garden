import TerserPlugin from 'terser-webpack-plugin'

export default () => ({
  webpack: (config, {stage}) => {
    if (stage === 'prod') {
      const {minimizer} = config.optimization

      minimizer[0] = new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    }

    return config
  }
})
