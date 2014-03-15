//tab
(function(){
    
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
                tabbarItemView.addClass(item.inactive).text(item.title).bind('click',function(){
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

}).call(Gamma);