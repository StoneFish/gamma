/**
 * Gamma
 */
(function (global) {
    if (typeof global.Gamma === 'undefined') {
        global.Gamma = {};
       
    }
})(this);

//common
(function(){
	
	this.context = {};
        
	this.loadView = function(selector){
		return $(selector).children().clone(true);
	}
	
	this.init = function(){
		 this.context.screen = $('body');
		 this.context.rootView = $('<div></div>');
		 this.context.screen.append(this.context.rootView);
	}
	
}).call(Gamma);

//viewControllers
(function(){
    
	/*
	tab
	example; run script below in console;
	
	Gamma.context.rootView.empty();
	var items = [{title:'tab-a',active:'on',nomal:'tab-a',viewCtrl:function(){return {view:$('<div>tab1</div>')};}},
				 {title:'tab-b',active:'on',nomal:'tab-b',viewCtrl:function(){return {view:$('<div>tab2</div>')};}},
				 {title:'tab-c',active:'on',nomal:'tab-c',viewCtrl:function(){return {view:$('<div>tab3</div>')};}},
				 {title:'tab-d',active:'on',nomal:'tab-d',viewCtrl:function(){return {view:$('<div>tab4</div>')};}}];
	var tabViewCtrl = Gamma.loadTabViewCtrl(items);
	Gamma.context.rootView.append(tabViewCtrl.view);
	
	*/
    this.loadTabViewCtrl = function(items){ 

        var view = $('<div class="tab-content"></div>');
        var emptyView = $('<div>*_* view is disappeared</div>');
        var contentView = $('<div></div>');
        var tabbarView = $('<ul id="tabbar" class="clearfix"></ul>');
        
        var selectIndex = function(index){
            var itemView = tabbarView.children()[index]    
            var item = items[index];
            $(itemView).addClass(item.active).siblings("li").removeClass(item.active);
            var viewCtrl = item.viewCtrl?item.viewCtrl():{view:emptyView};
            contentView.empty();
            contentView.append(viewCtrl.view);
        }
        
        var draw = function(){
            var renderItemView = function(item){
                var tabbarItemView = $('<li>--</li>');
                tabbarItemView.addClass(item.nomal).text(item.title).bind('click',function(){
                    selectIndex($(this).index());
                });
                tabbarView.append(tabbarItemView);
            }
            
            view.append(contentView);
            view.append(tabbarView);
            items.forEach(function(item){
                renderItemView(item);
            });
            view.show();
        }
      
        draw();
        selectIndex(0);
        //return controller interfaces
        return {view:view,selectIndex:selectIndex};
    }
    
	/*
	navigator
	example; see index.html
	*/
    this.loadNavigator = function(viewCtrls){
        var viewCtrlStack = [];
        var view = $('<div></div>');
        var topViewCtrl;
        
        var pushViewCtrl = function(viewCtrl){
        	if(topViewCtrl){
            	viewCtrlStack.push(topViewCtrl);
				topViewCtrl.view.hide();
			}
            topViewCtrl = viewCtrl;
            view.append(topViewCtrl.view);
        }

        var back = function(){
            if(viewCtrlStack.length == 0)
                return;
            topViewCtrl.view.remove();
            topViewCtrl = viewCtrlStack.pop();
            topViewCtrl.view.show();
        }
        
       
        viewCtrls.forEach(function(viewCtrl){
	   	    pushViewCtrl(viewCtrl);
		}); 
        
        
        return {view:view,pushViewCtrl:pushViewCtrl,back:back};
    }
    
	/*
	modal
	example; see index.html
	*/
    this.modal = function(baseView,createViewCtrl){
        var viewCtrl;
        var dismiss = function(){
            if(viewCtrl == undefined)
                return;
            viewCtrl.view.remove();
            baseView.show();
        }
        
        viewCtrl = createViewCtrl(dismiss);
        baseView.hide();
        baseView.after(viewCtrl.view);
    }

}).call(Gamma);


//tableView
(function(){
    this.loadTableView = function(model,loadCellView){
        var view =  $('<div class="warp"></div>');
        
        model.load(function(list){
            list.forEach(function(val,index){
                var tableCellView = loadCellView(val,index);
                view.append(tableCellView);
            }); 
        });
        
        return view;
    }

}).call(Gamma);

