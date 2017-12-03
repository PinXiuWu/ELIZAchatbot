wordSearch = function(msg, engLexicon) {
  var wordSearchResult = ""; //建立儲存搜尋結果的變數

  if(msg.indexOf("Which 10") > -1) { //找出接收到的訊息是否有關鍵字which 10
    var allMatches; //建立一個變數準備儲存搜尋結果

    //依POS類別做字彙搜尋
    if(msg.indexOf("noun") > -1) {
      allMatches = engLexicon.find({pos: "noun"}); //將搜尋結果存入變數allmatches
    }
    else if(msg.indexOf("verb") > -1) {
      allMatches = engLexicon.find({pos: "verb"});
    }
    else if (msg.indexOf("adjective") > -1) {
      allMatches = engLexicon.find({pos: "adjective"});
    }


    if(allMatches !== undefined) {//若allmatches不等於undefined,表示有搜尋結果
      allMatches = allMatches.fetch();  //搜尋結果用fetch功能轉為陣列
      for(index=0; index<10; index++) {  //利用for迴圈回傳搜尋到的前十筆資料

        var randomNum = Math.random(); //利用Math.random函數產生一個介於0和1(不函1)的隨機亂數

        //將隨機亂數乘以陣列長度,就會變成介於0至陣列長度間的數字(不含陣列長度本身)
        randomNum = randomNum*allMatches.length;
        randomNum = Math.floor(randomNum); // 用Math.floor函數將小數點捨去


        //每筆陣列中的word內容加上逗號
        wordSearchResult = wordSearchResult+allMatches[randomNum].Word+",";
        // console.log(allMatches[index].Word);
      }
     }
    else {
      wordSearchResult = "I got nothing for you, but you can ask me to search for English words for you.";
    }
    return wordSearchResult;
  }
};
