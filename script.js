// Mutiply and Det will auto call display in the end
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
    // document.getElementById("input").appendChild(obj);
    obj.addEventListener("input",Minput);
    obj=obj;
    return obj;

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
                tmp.push(parseFloat(obj.value));
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
function display(result,msg=''){
    var res=document.getElementById("res")
    if(msg.length!=0){
        res.innerHTML="<h3>"+msg+"</h3>";return;
    }
    res.innerHTML="";
    var res_t=document.createElement("table");
    res_t.id="res_t";

    for(var i=0;i<result.length;i++){
        var row=document.createElement("tr");
        for(var j=0;j<result[0].length;j++){
            var obj=document.createElement("td");
            obj.className="num";
            if(result[i][j]%1<0.00001){
                result[i][j]/=1;
            }else{
                result[i][j]=result[i][j].toFixed(2);
            }
            obj.textContent=`${result[i][j]}`;
            row.appendChild(obj);
        }
        res_t.appendChild(row);
    }
    res.appendChild(res_t);
    return 0;
}
function Multiply(m1,m2){
    resm=[];
    if(m1[0].length!=m2.length){
        res.innerHTML="<h3></h3>";
        display(resm,"order does not match! no solution!");
        return;
    }
    var x=m1.length,y=m2[0].length;

    // for(var i=0;i<x;i++){for(var j=0;j<y;j++){}}
    for(var i=0;i<x;i++){
        resm.push([]);
        for(var j=0;j<y;j++){
            resm[i].push(0);
            var cur=0;
            for(var a=0;a<m1[0].length;a++){
                cur+=m1[i][a]*m2[a][j];
            }
            resm[i][j]=cur;
        }
    }
    display(resm);
}

function ScalarMultiply(fac,m){
    for(var i=0;i<m.length;i++){
        for(var j=0;j<m[0].length;j++){
            m[i][j]=m[i][j]*fac;
        }
    }
    console.log("Final Step!");
    console.log(m);
    return m;
}

function Transpose(m) {
    let transposedMatrix = [];
    for (let i = 0; i < m[0].length; i++) {
        let newRow = [];
        for (let j = 0; j < m.length; j++) {
            newRow.push(m[j][i]);
        }
        transposedMatrix.push(newRow);
    }
    return transposedMatrix;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Buttons").before(constructM(5, 5,"m1"));
    document.getElementById("Buttons").after(constructM(5, 5,"m2"));
    // var button=document.createElement("button");
    // button.textContent="Multiply";
    // button.onclick=Multiply;
    // document.getElementById("input").appendChild(button);
    // constructM(5, 5,"m2");
    // var test=[
    //     [1,0,0,1],
    //     [0,2,1,2],
    //     [2,1,0,1],
    //     [2,0,1,4]  
    // ];
    

});
