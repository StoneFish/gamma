//navigator
(function(){

    this.loadNavigator = function(viewCtrls){
        var viewCtrlStack = viewCtrls;
        var view = $('<div></div>');
        var topViewCtrl = viewCtrls.pop();
        view.append(topViewCtrl.view);

        var pushViewCtrl = function(viewCtrl){
            viewCtrlStack.push(topViewCtrl);
            topViewCtrl.view.hide();
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
        
        return {view:view,pushViewCtrl:pushViewCtrl,back:back};
    }

}).call(Gamma);