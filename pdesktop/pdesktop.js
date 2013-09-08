/**
 * 基类对象
 */
function PObject(){
	/**
	 * get 函数，获取key对应的value
	 * @param String key
	 */
	this.get = function(key){
		return this[key];
	};
	/**
	 * set 函数，设置key,value
	 * @param String key
	 * @param Object value
	 * @param Function callback
	 */
	this.set = function(key, value, callback){
		this[key] = value;
		this.cb = callback;
		// 执行回调
		if(this.cb && this.cb instanceof Function){
			this.cb(key, value);
		}
	};
	/**
	 * initClass 函数，构造类
	 * @param Object Class 结构为 {target: this, className: '类名'}
	 * @param Function callback回调方法（构造方法）
	 */
	this.initClass = function(Class, callback){
		// 添加类关系
		this.classes.push(Class);
		this.cb = callback;
		// 执行回调
		if(this.cb && this.cb instanceof Function){
			this.cb();
		}
	};
	/**
	 * 不参与config配置的属性数组
	 */
	this.noconfig = [];
	/**
	 * 初始化config
	 * @param Object config
	 * @param Function callback
	 */
	this.initConfig = function(config, setCallback){
		// config不为空时执行构造赋值
		if(config){
			this.cb = setCallback;
			// 构造赋值
			for(key in config){
				if(this[key] && this.noconfig.indexOf(key) == -1){
					this.set(key, config[key], this.cb);
				}
				
			}
		}
	};
	/**
	 * 类关系表
	 */
	this.classes = [];
	// 将Pobject类本身加入类关系表
	this.classes.push({
		className: 'PObject'
	});
	/**
	 * 获取类信息
	 */
	this.getClass = function(){
		return this.classes[this.classes.length - 1];
	};
}
/**
 * View 基类,一切可视元素的基类
 * @param JSON config
 */
function PView(config){
	// 继承PObject类
	PObject.apply(this);
	
	/*
	 * View定义元素的大小、层级关系、是否可见、透明度、各种事件、各种方法等
	 */
	/**
	 * 透明度，默认为1.0 
	 */
	this.alpha = 1.0;
	/**
	 * 宽度，默认为100像素
	 */
	this.width = 100;
	/**
	 * 高度，默认为100像素
	 */
	this.height = 100;
	/**
	 * 最小宽度，默认为100
	 */
	this.minWidth = 100;
	/**
	 * 最大宽度，-1为不限制，默认为-1
	 */
	this.maxWidth = -1;
	/**
	 * 最小高度，默认为100
	 */
	this.minHeight = 100;
	/**
	 * 最大高度，-1为不限制，默认为-1
	 */
	this.maxHeight = -1;
	/**
	 * 是否可见，默认为可见true
	 */
	this.visible = true;
	/**
	 * 父元素，默认为空
	 */
	this.parent = null;
	
	
	// 初始化PView类
	this.initClass({className: 'PView'}, function(){
		// 构造方法
		this.initConfig(config);
		
		console.debug('PView');
	});
	
}
/**
 * PSH，上下文对象
 * @param config
 */
function PSH(config){
	// 继承PObject类
	PObject.apply(this);
	
	/**
	 * 默认在body中构造PSH
	 */ 
	this.dom = $('body');
	/**
	 * 上下文的尺寸, 默认为100%
	 */ 
	this.width = '100%';
	this.height = '100%';
	/**
	 * 最小尺寸,默认为800x600
	 */ 
	this.minWidth = 800;
	this.minHeight = 600;
	
	/**
	 * 标题应用的高度，默认为26
	 */
	this.titleHeight = 26;
	
	// --------------------------------------
	// applications数组
	this.applications = [];

	
	// 事件响应
	this.onCreate = function(){};
	this.onDestroy = function(){};
	
	// ---------------------------------------
	// 方法
	
	/**
	 * 渲染界面
	 */
	this.paint = function(){
		// 清空界面元素,初始化dom
		this.dom.empty().css({
			width: this.width,
			height: this.height,
			'min-height': this.minHeight,
			'min-width': this.minWidth
		});
		
		// 遍历渲染
		for(var i = 0 ; i < this.applications.length ; i ++){
			var app = this.applications[i];
			// 通过对应app自己的OnDraw方法构造jqdom对象
			var appJQdom = null;
			
			
			switch (app.get('type')) {
			case 0:
				
				break;
			case 1:
				
				break;
			case 2:
				
				break;
			case 3:
				// 构造桌面应用
				appJQdom = app.onDraw();
				appJQdom.addClass('PDesktop');
				
				// 将jqdom对象添加到 界面中
				this.dom.append(appJQdom);
				
				break;
			case 4:
				// 构造标题应用
				appJQdom = app.onDraw();
				appJQdom.css({
					height: this.titleHeight
				}).addClass('PTitleBar');
				
				// 将jqdom对象添加到 界面中
				this.dom.append(appJQdom);
				break;
			default:
				break;
			}
			
			
		}
		
		
	};
	/**
	 * 创建PSH
	 */
	this.create = function(){
		
		this.paint();
	};
	/**
	 * 销毁PDesktop
	 */
	this.destroy = function(){
		
	};
	
	
	// 初始化PDesktop类
	this.initClass({className: 'PSH'}, function(){
		// 构造方法
		this.initConfig(config);
	});
}
/**
 * application，应用程序基类
 * @param config
 */
function PApplication(config){
	// 继承PObject类
	PObject.apply(this);
	
	/**
	 * id,默认为PApplication+当前时间戳
	 */
	this.id = 'Application'+new Date().getTime();
	/**
	 * name,默认为Application
	 */
	this.name = 'Application';
	/**
	 * title标题，默认为Application
	 */
	this.title = 'Application';
	/**
	 * version版本号，默认为1.0.0
	 */
	this.version = '1.0.0';
	/**
	 * app类型，默认为0
	 * 0 代表普通应用
	 * 1 代表全屏应用
	 * 2 代表悬浮应用
	 * 3 代表桌面应用 
	 * 4 代表标题栏应用
	 */
	this.type = 0;
	/**
	 * app的icon
	 */
	this.icon = 'images/appicons/app.png';
	/**
	 * 对应的jqdom元素，默认为$('<div>')
	 */
	this.jqdom = $('<div>');
	/**
	 * 当application被创建时调用
	 */
	this.onCreate = function(){};
	/**
	 * 当application被显示时调用
	 */
	this.onShow = function(){};
	/**
	 * 当application被隐藏时调用
	 */
	this.onHide = function(){};
	/**
	 * 当application被销毁时调用
	 */
	this.onDestroy = function(){};
	/**
	 * 当界面需要被Paint时调用
	 * @return jqdom 返回jqdom
	 */
	this.onDraw = function(){
		return this.jqdom;
	};
	// 初始化PApplication类
	this.initClass({className: 'PApplication'}, function(){
		// 构造方法
		this.initConfig(config);
	});
}
/**
 * Desktop，桌面应用
 * @param config
 */
function PDesktop(config){
	// 继承PApplication类
	PApplication.apply(this, [config]);
	
	/**
	 * application类型，只能是3
	 * 3 代表桌面应用
	 */
	this.type = 3;
	/**
	 * 背景图目录，默认为pictures
	 */
	this.imageDir = 'pictures';
	/**
	 * 默认背景图，默认为Galaxy.jpg
	 */
	this.defaultImage = 'Galaxy.jpg';
	/**
	 * id，默认为DesktopApp
	 */
	this.id = 'DesktopApp';
	/**
	 * name，默认为DesktopApp
	 */
	this.name = 'DesktopApp';
	
	// noconfig，增加不参与config的属性
	this.noconfig.push('type');
	
	/**
	 * app列表jqdom
	 */
	this.applistjqdom = $('<div>');
	
	/**
	 * 绘制Pdesktop
	 */
	this.onDraw = function(){
		this.jqdom = $('<div>').css({
			background: 'url("'+this.imageDir+'/'+this.defaultImage+'")'
		});
		this.initAppList();
		
		return this.jqdom;
	};
	
	this.initAppList = function(){
		this.applistjqdom.addClass('PDesktop_AppList');
		
		
	};
	
	// 初始化PApplication类
	this.initClass({className: 'PDesktop'}, function(){
		// 构造方法
		this.initConfig(config);
	});
}
/**
 * TitleBar，标题栏应用
 * @param config
 */
function PTitleBar(config){
	// 继承PApplication类
	PApplication.apply(this, [config]);
	
	/**
	 * type只能为4，
	 * 代表为标题栏应用
	 */
	this.type = 4;
	/**
	 * id，默认为TitleBarApp
	 */
	this.id = 'TitleBarApp';
	/**
	 * name，默认为TitleBarApp
	 */
	this.name = 'TitleBarApp';
	
	// noconfig，增加不参与config的属性
	this.noconfig.push('type');
	/**
	 * gradientStart，渐变色起始，默认为#e7e7e7
	 */
	this.gradientStart = '#e7e7e7';
	/**
	 * gradientStop，渐变色结束，默认为#999999
	 */
	this.gradientStop = '#999999';
	/**
	 * logo图片的URL
	 */
	this.logo = 'images/logo.png';
	/**
	 * logo的jqdom对象
	 */
	this.logojqdom = $('<div>');
	
	/**
	 * 绘制PTitleBar
	 */
	this.onDraw = function(){
		this.jqdom.css({
			'background-image': '-webkit-linear-gradient(top, '+this.gradientStart+', '+this.gradientStop+')',
			'background-image': 'linear-gradient(to bottom, '+this.gradientStart+', '+this.gradientStop+')',
			'box-shadow': '0 1px 3px #000'
		});
		this.initLogo();
		
		return this.jqdom;
	};
	/**
	 * 初始化logo
	 */
	this.initLogo = function(){
		var logoimg = $('<img>').attr('src', this.logo).appendTo(this.logojqdom);
		
		this.logojqdom.addClass('PTitleBar_logo').appendTo(this.jqdom).click(function(){
			alert('Click Logo !');
		});
	};
	
	
	// 初始化PTitleBar类
	this.initClass({className: 'PTitleBar'}, function(){
		// 构造方法
		this.initConfig(config);
	});
}



