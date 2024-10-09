// ecosystem.config.js

module.exports = {
    apps: [
        {
            name: 'deveraa',
            script: 'npm',
            args: 'start',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
                NEXT_PUBLIC_BASE_URL: "http://165.232.179.7",
                MONGO_URI: "mongodb://adminUser:aDiru%40141020a@165.232.179.7:27017/learnwithme?authSource=admin"
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};
