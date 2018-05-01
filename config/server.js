/**
 * -----开发环境配置------
 * ip: 127.0.0.1:4200
 * port: 4200
 * allowClient: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://127.0.0.1:3200', 'http://127.0.0.1:4200']
 * -----生产环境配置------
 * ip: 118.24.73.29
 * port: 80
 * allowClient: ['http://118.24.73.29', 'http://angular.wbjiang.cn']
 */
const CONFIG = {
    ip: '118.24.73.29',
    port: '80',
    allowClient: ['http://118.24.73.29', 'http://angular.wbjiang.cn']
}
 
exports.CONFIG = CONFIG;
