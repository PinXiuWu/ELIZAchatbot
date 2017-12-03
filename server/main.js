var engLexicon = new Mongo.Collection("engLexicon");

//meteor app啟動時自動執行的程式內容
Meteor.startup(function() {
  engLexicon.remove({}); //每次重新執行前先把舊的字彙知識清除
  //讀取詞蘋列表為一整個字串
  var lexiconList = Assets.getText("engLexicon_1000.csv");

  //利用斷行(\n)把字串轉換為陣列,陣列中每一個位置資料都是詞頻列表中其中一行
  //  ["word, POS, Synonym, Antonym",
  //   "there, noun, location, here",
  //  ...
  //  ]
  lexiconList = lexiconList.split("\n");

  for(row=0; row<lexiconList.length; row++) {
    //將每一行以逗號為基準轉一個陣列,陣列裡的每個位置代表一個欄位的資訊
    //  [
    //  ["Word", "POS", "Synonym", "Antonym"],
    //  ["other", "noun", "location", "here"],
    //  [...],
    //  ]
    lexiconList[row] = lexiconList[row].split(",");
  }






  var wdFeatures = lexiconList[0]; //第一行(0)是各個欄位的名稱,也是每個字的特性

  // 利用for迴圈把每個字及其特性存到engLexicon內;
  // 迴圈位置從1開始,因為第二行開始才是字
  for(row=1 ; row<lexiconList.length ; row++) {
    var wdEntry = {};
  }

  for(row=1; row<lexiconList.length; row++) {
    var word = {};
    //利用迴圈將欄位名稱及每個字對應欄位的值存到word的空物件中
    for(col=0; col<wdFeatures.length; col++) {
      var colName = wdFeatures[col];
      word[colName] = lexiconList[row][col]; //每欄和每字對應欄位的值
      // console.log(lexiconList[col]); //印出每欄的資料
      // console.log(word[colName]);
      engLexicon.insert(word);

    }
  }








});








msgRecords = new Mongo.Collection("msgRecords");

Meteor.methods({

  //先建立能接收訊息(msg)的功能
  msgReceiver: function(msg) {
    msgRecords.insert({
      time: new Date(),
      speaker: "You",
      msg: msg
    });
    processMsg(msg); //接收到的訊息傳送到processMsg裡以取得ELIZA的回應
    return;
  },

  //清除所有記憶並放入預設資料的功能
  resetELIZA: function() {
    msgRecords.remove({});
    msgRecords.insert({
      time: new Date(),
      speaker: "ELIZA",
      text: "This is ELIZA. Tell me what's on your mind."
    });
    return;
  },
});

//新增能運算ELIZA回復的自訂功能processMsg
var processMsg = function(msg) {
  var processResults = "";
  if(processResults === "") {
    processResults = "Hello World!";
  }

  //呼叫wordSearch傳送msg和engLexicon,並把結果儲存到processMsg變數中
  processResults = wordSearch(msg, engLexicon);
  processResults = posSearch(msg, engLexicon);


  msgRecords.insert({
    creatAt: new Date(),
    speaker: "ELIZA",
    text: processResults
  });
};







import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});
