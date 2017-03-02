/**
 * Created by kotato on 2017/02/24.
 */

$(function () {
    $("#submitButton")
        .click((e)=>{
            let text = $("#inputField").val()
            $.ajax({
                type: "POST",
                url: "/kuromoji",
                data: {text:text},
                success: function(msg){
                    console.log(msg)
                }
            });
        })
    }
)
console.log("hello",$("#submitButton"))



var ToDoModel = function(data) {
    // タスク名
    this.title    = m.prop(data.title);
};

var homeController =function(){
    var self = this
    self.elements = []
    self.titile = m.prop("")

}

homeController.prototype.add = function() {
    var self = this;
    return function (e) {
        // submit 実行を無効
        e.preventDefault();

        // ユーザーの入力した値を取得
        var val = self.title();
        if (!val) return;

        // ToDoを追加
        var new_todo = new ToDoModel({title: val});
        self.todo_list.push(new_todo);

        // ユーザーの入力した値をクリア
        self.title('');
    };
};

var homeView = function (controller) {
    return [
        m("form",{onsubmit: controller.add()},
            m('input', {onchange: m.withAttr("value", controller.title), value: controller.title()}),
            m('button[type=submit]', {onclick: controller.add()}, 'Add')
        )
    ]
}

var homeComponent = {
    controller:homeController,
    view :homeView,
}

