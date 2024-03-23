
function constructM(r,c,id){
    var obj= document.createElement("table");
    obj.id=id;
    obj.dataset.row=r;
    obj.dataset.col=c;

    for(var i=1;i<=r;i++){
        var row=document.createElement("tr");
        for(var j=1;j<=c;j++){
            // var tmp=document.createElement("td");
            var field=document.createElement("input");
            field.type="number";
            field.value=0;
            field.placeholder=0;
            field.dataset.r=i;
            field.dataset.c=j;
            field.id=`${id}_${i}_${j}`;
            field.style.backgroundColor="lightgrey";
            row.appendChild(field);
        }
        obj.appendChild(row);
    }
    document.getElementById("input").appendChild(obj);
    obj.addEventListener("input",Minput);
    obj=obj;

}
function Minput(event){
    var r=event.target.dataset.r;
    var c=event.target.dataset.c;
    var par=document.getElementById(event.target.id.split("_")[0]);
    for(var i=1;i<=par.dataset.row;i++){
        for(var j=1;j<=par.dataset.col;j++){
            if(i<=r && j<=c){
                document.getElementById(`${par.id}_${i}_${j}`).style.backgroundColor="lightgreen";
            }else{
                document.getElementById(`${par.id}_${i}_${j}`).style.backgroundColor="lightgrey";

            }
        }
    }
}
function Multiply(M1,M2){
    // todo
}


document.addEventListener('DOMContentLoaded', function() {
    constructM(5, 5,"m1");
    var button=document.createElement("button");
    button.textContent="Multiply";
    document.getElementById("input").appendChild(button);
    constructM(5, 5,"m2");
});
