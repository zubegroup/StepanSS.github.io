document.getElementById('getText').addEventListener('click', getText);
    document.getElementById('getAPI').addEventListener('click', getPost);
        
    function getText(){
        //console.log(12333);
//        fetch('sample.txt').then(function(res){
//            return res.text()
//        })
//        .then(function(data){
//            console.log(data);
//        });
        
        fetch('sample.txt')
        .then((res)=>res.text())
        .then((data)=>{
            document.getElementById('output').innerHTML=data;
        })
        .catch((err)=>console.log(err))
    }
    //let url =  'https://jsonplaceholder.typicode.com/posts';
    let api = 'e4040911e2375ecbb3fbfa434f52da76';
    let sec = '98b0957836b3e1521ce02b547ed4711e';  
     let tok =  api+":"+sec;  
    let url =  'https://step2shops.myshopify.com/admin/products.json'; 
    
    let url1 = ' https://e4040911e2375ecbb3fbfa434f52da76:98b0957836b3e1521ce02b547ed4711e@step2shops.myshopify.com/admin/orders.json';
        
     console.log(tok); 
    var bt = btoa(tok);
    console.log(bt);    
    //let base64 = require('base-64');
        
    var myHeaders = new Headers();
    myHeaders.append('Access-Control-Allow-Credentials', 'true');
    //myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', 'Basic '+bt); 
    myHeaders.forEach(function(head){console.log(head)});
    var Init = {
        "async": true,
        "crossDomain": true,
        method:'GET',
        credentials: 'include',
        mode: 'no-cors',
        headers: myHeaders
        };
        
    function getPost(){
        fetch(url, Init)
        .then((res)=>res.json())
        .then((data)=>{
            let output = '<h2>Post</h2';
            data.forEach(function(post){
                output += 
                    '<div><h3>'+post.title+
                    '</h3><p>'+post.body+
                    '</p></div>';
                console.log(output);
                    
            });
            document.getElementById('output').innerHTML = output;
        })
    }
        
    function addPost(e){
        e.preventDefault();

        let title = document.getElementById('title').value;
        let body = document.getElementById('body').value;
    }
    
    var ourReq = new XMLHttpRequest();
    ourReq.open('GET', url1);
    ourReq.onload = function(){
        console.log(ourReq.responseText);
    };
    //ourReq.send();    