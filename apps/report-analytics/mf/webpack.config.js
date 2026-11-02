/**
 * Module Federation build for the Next.js app.
 *
 * Why a second webpack pass instead of Next's own webpack hook:
 * Next emits `remoteEntry.js` *inside* its `webpackChunk_N_E` chunk system, so the
 * container is only executed by Next's own runtime chunk. A Vite host (which loads the
 * remoteEntry as a plain classic script) would push into an array nobody consumes and the
 * container would never be defined. Building the exposed entry with its own self-contained
 * webpack runtime keeps it loadable from any host, and the output is served as a Next
 * static asset from `public/mf/`.
 *
 * The SSR pages stay 100% Next.js; only the federated island goes through this config.
 */
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

const REMOTE_NAME = 'reportAnalytics';
const PUBLIC_PATH =
  process.env.MF_PUBLIC_PATH ?? 'http://localhost:3002/mf/';

module.exports = {
  mode: 'production',
  target: 'web',
  devtool: false,
  entry: {},
  output: {
    path: path.resolve(__dirname, '../public/mf'),
    publicPath: PUBLIC_PATH,
    filename: '[name].js',
    library: { type: 'var', name: REMOTE_NAME },
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: { syntax: 'typescript', tsx: true },
              transform: { react: { runtime: 'automatic' } },
              target: 'es2020',
            },
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: REMOTE_NAME,
      filename: 'remoteEntry.js',
      library: { type: 'var', name: REMOTE_NAME },
      exposes: {
        './ReportAnalytics': './mf/mf-entry.tsx',
      },
      // No shared scope: this remote bundles its own React (18) while the shell reconciles
      // with React 19. Cross-bundler (webpack <-> vite) shared scope did not resolve reliably
      // in this POC, so the exposed component is hooks-free instead — see REPORT_ANALYTICS_POC.md.
      shared: {},
    }),
  ],
  optimization: {
    minimize: false,
  },
};
