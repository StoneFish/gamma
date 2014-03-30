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
    this.TabViewCtrl = function(items){ 

        var view = $('<div class="tab-content"></div>');
        var emptyView = $('<div>*_* view is disappeared</div>');
        var contentView = $('<div></div>');
        var tabbarView = $('<ul id="tabbar" class="clearfix"></ul>');
        
        var selectIndex = function(index){
            var itemView = tabbarView.children()[index]    
            var item = items[index];
            $(itemView).addClass(item.active).siblings("li").removeClass(item.active);
            var viewCtrl = item.viewCtrl ? item.viewCtrl : {view:emptyView};
            contentView.empty();
            contentView.append(viewCtrl.view);
        }
        
        var loadView = function(){
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
      
        loadView();
        selectIndex(0);

        this.view = view;
	this.selectIndex = selectIndex;
    }
    
	/*
	navigator
	example; see index.html
	*/
    this.Navigator = function(viewCtrls){
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
        
        this.view = view;
	this.pushViewCtrl = pushViewCtrl;
        this.back = back;
    }
    
	/*
	modal
	example; see index.html
	*/
    this.modal = function(baseView,viewCtrl){

        var dismiss = function(){
            if(viewCtrl == undefined)
                return;
            viewCtrl.view.remove();
            baseView.show();
        }

        viewCtrl.bindDismiss(dismiss);

        baseView.hide();
        baseView.after(viewCtrl.view);
    }

}).call(Gamma);


//tableView
(function(){

    this.TableView = function(delegate,datasource){
        var view =  $('<div class="warp"></div>');
        
	var loadView = function(){
	    view.empty();
	    
	    datasource.list.forEach(function(val,index){
                var tableCellView = delegate.loadCellView(val,index);
                view.append(tableCellView);
            }); 
	}
        
        this.view = view;
	this.loadView = loadView;
    }

   this.TableViewCtrl = function(){
       var delegate,datasource;
       
       delegate = {
	   loadCellView : function(val,index){
	       return $('<div>'+ val +'</div>');
	   }
       };

       datasource = {
	   list : []
       };
       
       var tableView = new Gamma.TableView(delegate,datasource);
       
       this.delegate = delegate;
       this.datasource = datasource;
       this.view = tableView.view;
       this.loadView = function(){
	   tableView.loadView();
       }
   }

}).call(Gamma);

