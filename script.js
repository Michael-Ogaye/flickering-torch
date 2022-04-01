let canvas,ctx,video;
const clor=[8,73,175]
function main(){
    canvas= document.getElementById('canva');
 ctx = canvas.getContext('2d');
navigator.mediaDevices.getUserMedia({video:true}).then(function(rdata){
    video= document.createElement('video');
    video.srcObject=rdata;
    video.play()
    video.onloadeddata= torchEffect
}).catch(function(err){alert(err)})

function torchEffect (){
    canvas.width= video.videoWidth;
    canvas.height= video.videoHeight;
    ctx.drawImage(video,0,0,canvas.width, canvas.height)
    let locs=[];

   const imgdat= ctx.getImageData(0,0,canvas.width, canvas.height);
   let des= imgdat.data

   for(let i=0;i < des.length; i +=4){
       const r = des[i];
       const g= des[i+1];
       const b= des[i+2];
       if(distance([r,g,b],clor)<50){
           const x= (i/4)%canvas.width;
           const y= Math.floor((i/4)/canvas.width)
           locs.push({x,y})
       }

   }

//    for(let i=0;i<locs.length; i++){
//        ctx.fillStyle='red';
//        ctx.beginPath();
//        ctx.arc(locs[i].x,locs[i].y, 1,0,Math.PI*2)
//        ctx.fill();

//    }
//    console.log(locs.length)

let center={x:null,y:null}
if(locs.length>0){
    
    for(let i=0;i<locs.length;i++){
        center.x +=locs[i].x;
        center.y +=locs[i].y
    }
    let rad= Math.sqrt(canvas.width*canvas.width+ canvas.height*canvas.height)
    rad += Math.random()*0.1*rad;

    center.x /=locs.length;
    center.y /=locs.length;
    const grad=ctx.createRadialGradient(center.x,center.y,rad*0.05,center.x,center.y,rad*0.2);
    grad.addColorStop(0,"rgba(0,0,0,0)")
    grad.addColorStop(1,"rgba(0,0,0,0.8)")
    
    



ctx.fillStyle=grad;
ctx.beginPath();
ctx.arc(center.x,center.y,rad,0,Math.PI*2);
ctx.fill();

}
else{
    ctx.fillStyle="rgba(0,0,0,0.8)"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.fill();
}



   
     requestAnimationFrame(torchEffect);
}

function distance(v1,v2){
    return Math.sqrt((v1[0]-v2[0])*(v1[0]-v2[0])+(v1[1]-v2[1])*(v1[1]-v2[1])+(v1[2]-v2[2])*(v1[2]-v2[2]))

}

}

