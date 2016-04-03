/*$("#button").onclick(function(){
    alert("you are here");
    if($(this).html() == "-"){
        $(this).html("+");
    }
    else{
        $(this).html("-");
    }
    $("#box").slideToggle();

});*/

function doSome(e){
    alert(e.textContent);
    if(e.textContent == "-"){
    	alert("you are here");
        //$(e).html("+");
        e.textContent = "+";
    }
    else{
        //$(e).html("-");
        e.textContent = "+";
    }
    //$("#box").slideToggle();
    document.getElementById("box").slideToggle();
};