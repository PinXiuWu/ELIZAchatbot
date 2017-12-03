msgRecords = new Mongo.Collection("msgRecords");

Template.body.helpers({
  allMsg: function() {
    var msgTexts = ""; //宣告一個空字串,儲存回傳訊息內容
    var allMsgs = msgRecords.find({}, {sort: {time: 1}}); //尋找msgRecords裡的所有紀錄,由舊到新排列(=1)
    allMsgs = allMsgs.fetch(); //把資料庫紀錄轉為陣列儲存

    //若allmsgs資料庫中有資料,轉換後的陣列會大於0
    if(allMsgs.length > 0) {

      //利用for迴圈讀取並儲存每個訊息
      for(index=0; index<allMsgs.length; index++) {

        msgTexts = msgTexts+allMsgs[index].speaker+": "; //先把每筆資訊的說話者身分加上冒號,加進msgTexts中
        msgTexts = msgTexts+allMsgs[index].msg+"\n";  //再把訊息內容加進msgTexts並斷行
      }
    }
    //若msgRecords裡沒有任何訊息(allMsgs.length是0)
    else {
      msgTexts = "ELIZA: This is ELIZA. Tell me what's on your mind.";
    }
    return msgTexts; //回傳所有訊息
  }
});


Template.body.events({
  "click #submitMsg": function(event) {
    event.preventDefault();
    var myMsg = document.getElementById("myMsg").value; //取得myMsg對話框的內容
    document.getElementById("myMsg").value = ""; //清除對話框內容
    console.log(myMsg.value);
    //Meteor.call()是用感官連結大腦的功能
    Meteor.call("msgReceiver", myMsg); //呼叫msgReceiver這個大腦功能並送出myMsg
  },

  "click #resetMsg": function(event) {
    event.preventDefault();
    document.getElementById("myMsg").value = "";
    Meteor.call("resetELIZA"); //呼叫大腦resetELIZA的Methods,重社ELIZA狀態
  }

});
