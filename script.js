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
        tr.append($("<td>").text(data.title));
        tr.append($("<td>").text(data.version));
        tr.append($("<td>").text(data.bpm));
        tr.append($("<td>").text(data.notes));
        tr.append($("<td>").text(data.score));
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

        $("#musicList").table("refresh");
    });

});

/* lion make */
var flag = 0;
var tmp;

window.onload = function(){
    var myTable = document.getElementById('musicList');
    var len = musicList.rows[1].cells.length;
    var Td = myTable.getElementsByTagName('td');
    for(var i=0; i<Td.length; i++){
	Td[i].setAttribute('id', 'td'+i);
	Td[i].onclick = function(){
	    eDit(this.id);
	}
    }

    function eDit(id){
	cellNum = document.getElementById(id).cellIndex;
	if(len-1 != cellNum){ return;}
	var Td = document.getElementsByTagName('td');
	var Spn = document.createElement('span');
	Spn.setAttribute('contenteditable', 'true');
	Spn.setAttribute('id', 'Spn'+id);
	tmp = Td[id].innerHTML;
	Td[id].innerHTML = "";
	Td[id].appendChild(Spn);
	Spn.focus();
	Spn.onblur = function(){
	    bLur(id);
	}
    }

    function bLur(id){
	var Spn = document.getElementById('Spn' + id);
	var str = Spn.innerText;
	str = Spn.textContent;
	if(str.match(/[^0-9 . -]|[\s]+/)||str==""){
	    Td[id].innerHTML = tmp;
	    return;
	}
	Td[id].innerHTML = str;
    }
}


