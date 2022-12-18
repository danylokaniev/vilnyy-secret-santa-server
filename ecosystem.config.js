module.exports = {
  apps: [
    {
      name: 'vilnyy-server',
      script: './dist/main.js',
      out_file: './out.log',
      error_file: './error.log'
    }
  ]
};
