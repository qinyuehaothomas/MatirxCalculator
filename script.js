// Mutiply and Det will auto call display in the end

// B/A= B*A inverse
// A inverse= 1/determinant * A adjugate
// A adjugate= transpose cofactor
// cofactor =for each i,j
//  -1^(i+j) * determinant of minor
// minor = for each i in first row:
//  determinant of minori,j * elemnt at i

const testm=[
    [1,1,-1],
    [2,-3,1],
    [2,1,2]
];
const tm2=[[0],[1],[7]];

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
    if(result==null){return;}
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
            if(result[i][j]%1<0.0001){
                result[i][j]=parseInt(result[i][j]);
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
    let resm=[];
    if(m1[0].length!=m2.length){
        display(resm,"Order does not match!");
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
    return resm;
}

function ScalarMultiply(fac,m){
    for(var i=0;i<m.length;i++){
        for(var j=0;j<m[0].length;j++){
            m[i][j]=m[i][j]*fac;
        }
    }
    // console.log(m,fac);
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


function Minor(m,x,y){// 0 indexed
    let resm=[];
    if(i>=m.length || j>=m[0].length){
        Error("input exceed matrix dimensions!");
    }
    for(var i=0;i<m.length;i++){
        if(i!=y){
            let cur=[];
            for(var j=0;j<m[0].length;j++){
                if(j!=x){
                    cur.push(m[i][j]);
                }
            }
            resm.push(cur);
        }
    }
    return resm;
}
function Det(m){
    if(m.length!=m[0].length){
        // display(m,msg="Determinant need a square matrix!");
        Error("Determinant need a square matrix!");
        return;
    }
    if(m.length==1){
        return m[0][0];
    }
    if(m.length==2){
        return m[0][0]*m[1][1]-m[0][1]*m[1][0];
    }
    let res=0;
    for(var i=0;i<m.length;i++){
        if(i%2==0){
            res+=m[0][i]*Det(Minor(m,i,0));
        }else{
            res-=m[0][i]*Det(Minor(m,i,0));
        }
    }
    return res;
}

function Cofactor(m){
    var resm=[];
    for(var i=0;i<m.length;i++){
        let tmp=[];
        for(var j=0;j<m[0].length;j++){
            tmp.push(Math.pow(-1,i+j)*Det(Minor(m,j,i)));
        }
        resm.push(tmp);
    }
    // display(resm);
    return resm;
}


// IMPORTANT !! the code is m2* inverse m1
function Division(m1,m2){


    if(m1[0].length!=m2.length){
        display(resm,"Order does not match!");
        return;
    }
    if(m1.length!=m1[0].length){
        display(resm,"Matrix 1 is not suqare matirx!");
        return;
    }
    var m1_Det=Det(m1);
    // console.log("determinant of 1", m1_Det);
    if(m1_Det==0){
        display(resm,"Determinant of m1 is 0, infinet solutions!");
        return;
    }
    
    return ScalarMultiply(1.0/m1_Det,Multiply(Transpose(Cofactor(m1)),m2));

}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Buttons").before(constructM(5, 5,"m1"));
    document.getElementById("Buttons").after(constructM(5, 5,"m2"));
    

});
