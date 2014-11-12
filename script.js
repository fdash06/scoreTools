$(function(){
    //Data class
    function Data(title, version, bpm, notes, score){
        this.title = title;
        this.version = version;
        this.bpm = bpm;
        this.notes = notes;
        if(score === undefined){
            this.score = 0;
        }else{
            this.score = score;
        }
    }
    
    function addDataToField(data){
        var tr = $("<tr>");
        tr.append($("<th>").text(data.title));
        tr.append($("<th>").text(data.version));
        tr.append($("<th>").text(data.bpm));
        tr.append($("<th>").text(data.notes));
        tr.append($("<th>").text(data.score));
        $("#fieldBody").append(tr);
    }

    $.get("list/17.txt", function(data){

        /* #read_text のテキストを data に変更 */
        var strAry = data.split(/\r\n|\r|\n/);

        for(var i = 0; i < strAry.length; i++){
            var elemAry= strAry[i].split(",");
            var tmp = new Data(elemAry[0], elemAry[1], elemAry[2], elemAry[3]);
            addDataToField(tmp);
        }

    });

});
