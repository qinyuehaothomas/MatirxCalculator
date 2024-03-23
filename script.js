
var orders={};
var matrix={};
function constructM(r,c,id){
    var obj= document.createElement("table");
    obj.id=id;
    obj.className="matrix"; 
    obj.dataset.row=r;
    obj.dataset.col=c;
    orders[id]=[0,0];
    matrix[id]=[];
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
            field.className="num";
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
    orders[par.id][0]=+r;
    orders[par.id][1]=+c;
    matrix[par.id]=[];
    for(var i=1;i<=par.dataset.row;i++){
        var tmp=[];
        for(var j=1;j<=par.dataset.col;j++){
            var obj=document.getElementById(`${par.id}_${i}_${j}`);
            if(i<=r && j<=c){
                tmp.push(obj.value);
                // obj.className="num_fill";
                obj.style.backgroundColor="lightgreen";
                obj.style.color="black";
            }else{
                // obj.className="num";
                obj.style.backgroundColor="grey";
                obj.style.color="lightgreen";

            }
        }
        if(i<=r)matrix[par.id].push(tmp);
    }

}
function Multiply(){
    var res=document.getElementById("res")
    res.innerHTML="";
    if(orders['m1'][1]!=orders["m2"][0]){res.innerHTML="<h3>order does not match! no solution!</h3>";return;}
    var res_t=document.createElement("table");
    res_t.id="res_t";
    var x=orders['m1'][0],y=orders["m2"][1];
    for(var i=0;i<x;i++){
        var row=document.createElement("tr");
        for(var j=0;j<y;j++){
            var obj=document.createElement("td");
            obj.className="num";
            var cur=0;
            for(var a=0;a<orders['m1'][1];a++){
                cur+=matrix['m1'][i][a]*matrix["m2"][a][j];
            }
            obj.textContent=`${cur}`;
            row.appendChild(obj);
        }
        res_t.appendChild(row);
    }
    res.appendChild(res_t);
}


document.addEventListener('DOMContentLoaded', function() {
    constructM(5, 5,"m1");
    var button=document.createElement("button");
    button.textContent="Multiply";
    button.onclick=Multiply;
    document.getElementById("input").appendChild(button);
    constructM(5, 5,"m2");
});
