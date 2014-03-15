//modal
(function(){
    
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