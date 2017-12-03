posSearch = function(msg, engLexicon) {
  var posQ = "What is the POS of the word ";
  var posSearchResult = "";

  if(msg.indexOf(posQ) > -1) {
    var targetWord = "";
    var startPos = posQ.length //取得msg字串中,關鍵字的起、終點位置;起點是posQ字串的長度
    var endPos;
    if(msg.indexOf("?") > -1) { //若有問號,問號開始的位置就是終點
      endPos = msg.indexOf("?")
    }

    else {
      endPos = msg.length; //若無問號,msg字串長度就是關鍵字終點
    }
    //用String.substring取得關鍵字
    targetWord = msg.subString(startPos, endPos);
      //用db.findOne找尋關鍵字,存到wordInfo
    var wordInfo = engLexicon.findOne({Word: targetWord});
    if(wordInfo !== undefined) { //有找到的話
      if(wordInfo.POS.indexOf("ad") === 0){
        posSearchResult = "Got it! It's an "+wordInfo.POS+".";
      }
      else {
        posSearchResult = "Got it! It's a "+wordInfo.POS+".";
      }

    }
  }
  else {
    posSearchResult = "Sorry. I have no idea.";
  }
  return posSearchResult;
};
