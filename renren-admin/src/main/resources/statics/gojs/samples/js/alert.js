(function($) {        
    $.alerts = {         
        alert: function(title, message, callback) {  
            if( title == null ) title = 'Alert';  
            $.alerts._show(title, message, null, function(result) {
                if( callback ) callback(result);  
            });  
        },  


        _show: function(title, msg, value,  callback) {

                    var _html = "";  
   
                    _html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">' + title + '</span>';  
                    _html += '<div id="mb_table">' + creTable(msg) + '</div><div id="mb_btnbox">';

                    _html += '<input id="mb_btn_ok" type="button" value="确定" />';

                    _html += '</div></div>';  
                   
                    //必须先将_html添加到body，再设置Css样式  
                    $("body").append(_html); GenerateCss();  
           

                    $("#mb_btn_ok").click( function() {  
                        $.alerts._hide();  
                        callback(true);  
                    });  
                    $("#mb_btn_ok").focus().keypress( function(e) {  
                        if( e.keyCode == 13 || e.keyCode == 27 ) $("#mb_btn_ok").trigger('click');  
                    });  

        },  
        _hide: function() {  
             $("#mb_box,#mb_con").remove();  
        }  
    }  
    // Shortuct functions  
    myAlert = function(title, message, callback) {  
        $.alerts.alert(title, message, callback);  
    }  

           
   
      
      //生成Css  
  var GenerateCss = function () {  
   
    $("#mb_box").css({ width: '100%', height: '100%', zIndex: '99999', position: 'fixed',  
      filter: 'Alpha(opacity=60)', backgroundColor: 'black', top: '0', left: '0', opacity: '0.6',textAlign:'center'
    });  
   
    $("#mb_con").css({ zIndex: '999999',  position: 'fixed', width:'300px',
      backgroundColor: 'White',  textAlign:'center',opacity: '0.8'
    });  
   
    $("#mb_tit").css({ display: 'block', fontSize: '17px', color: '#444', padding: '10px 15px',
     borderRadius: '15px 15px 0 0',fontcolor:'lightblue',
      fontWeight: 'bold'  
    });  
   
    $("#mb_msg").css({ padding: '20px', lineHeight: '40px',width:'100%',
      fontSize: '10px' ,color:'#4c4c4c' ,textAlign:'center'
    });  
   
    $("#mb_ico").css({ display: 'block', position: 'absolute', right: '10px', top: '9px',  
      border: '1px solid Gray', width: '18px', height: '18px', textAlign: 'center',  
      lineHeight: '16px', cursor: 'pointer', borderRadius: '12px', fontFamily: '微软雅黑'  
    });  
   
    $("#mb_btnbox").css({ margin: '15px 0px 10px 0', textAlign: 'center' });  
    $("#mb_btn_ok,#mb_btn_no").css({ width: '80px', height: '30px', color: 'white', border: 'none', borderRadius:'4px'});  
    $("#mb_btn_ok").css({ backgroundColor: '#41a259' });  
    $("#mb_btn_no").css({ backgroundColor: 'gray', marginRight: '40px' });  
   
   
    //右上角关闭按钮hover样式  
    $("#mb_ico").hover(function () {  
      $(this).css({ backgroundColor: 'Red', color: 'White' });  
    }, function () {  
      $(this).css({ backgroundColor: '#DDD', color: 'black' });  
    });  
   
    var _widht = document.documentElement.clientWidth; //屏幕宽  
    var _height = document.documentElement.clientHeight; //屏幕高  
   
    var boxWidth = $("#mb_con").width();  
    var boxHeight = $("#mb_con").height();  
   
    //让提示框居中  
    $("#mb_con").css({ top: (_height - boxHeight) / 2 + "px", left: (_widht - boxWidth) / 2 + "px" });  
  };
    //生成表格
   var creTable= function createTable(res){
        var result = res;
        var rows = eval(result);
        var tableStr = '<table border="1" cellspacing="0" style="text-align: center;width: 90%;margin: auto;font-size: 13px;"' +
            '><tr>';
        var object = rows[0];
        for(var i in object)
            tableStr += '<th nowrap="nowrap">' + i + '</th>';
        tableStr += '</tr>';
        for(var i = 0; i < rows.length; i++){
            tableStr += '<tr>';
            for(var columnName in rows[i])
                tableStr += '<td>' + rows[i][columnName] + '</td>';
            tableStr += '</tr>';
        }
        tableStr += '</table>';
        console.log(tableStr);
        return tableStr;
    };
   
  
})(jQuery);
