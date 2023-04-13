/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 * 
 */
let baseUrl = ''; 
let routerMode = 'hash';
let baseImgPath;
//  在node中，有全局变量process表示的是当前的node进程。
//  process.env包含着关于系统环境的信息，但是process.env中并不存在NODE_ENV这个东西。
//  NODE_ENV是一个用户自定义的变量，在webpack中它的用途是判断生产环境或开发环境。
if (process.env.NODE_ENV == 'development') {
	baseUrl = '';
    baseImgPath = '/img/';
}else{
	baseUrl = '//elm.cangdu.org';
    baseImgPath = '//elm.cangdu.org/img/';
}

export {
	baseUrl,
	routerMode,
	baseImgPath
}