module.exports = {
  apps: [
    {
      name: "lessonblinks",
      cwd: "/var/www/lessonblinks/app",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: "3200",
      },
    },
  ],
};