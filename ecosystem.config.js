module.exports = {
    apps: [
        {
            name: 'champion-pizza',
            script: 'server.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '300M',
        },
    ],
}