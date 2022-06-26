module.exports = {
    apps: [
        {
            name: 'champion-pizza-dev',
            script: 'server.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '300M',
            node_args: "--NODE_ENV=development"
        },
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