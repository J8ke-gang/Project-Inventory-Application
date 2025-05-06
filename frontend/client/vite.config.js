export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Redirect all API calls to the Express backend
    },
  },
});
