const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
//添加路由
//1.用户注册
router.post('/reg',function(req,res){
  //获取post请求的数据
  var obj=req.body;
  //验证每一项的数据是否为空
  
  if(!obj.dupwd){
    res.send({code:402,msg:'dupwd required'});
	return;
  }
  // if(!obj.email){
  //   res.send({code:403,msg:'email required'});
	// return;
  // }
  if(!obj.phone){
    res.send({code:404,msg:'phone required'});
	return;
  }
  //执行SQL语句
  pool.query('INSERT INTO dm_login SET ?',[obj],function(err,result){
    if(err) throw err;
	console.log(result);
	//判断是否插入成功
	if(result.affectedRows>0){
	  res.send({code:200,msg:'reg success'});
	}
  });
});

//2.用户登录
router.post('/login',function(req,res){
  //2.1获取数据
  var obj=req.body;
  //2.2验证数据为空
  if(!obj.phone){
    res.send({code:401,msg:'phone required'});
	return;
  }
  if(!obj.dupwd){
    res.send({code:402,msg:'dupwd required'});
	return;
  }
   //2.3执行SQL语句
  pool.query('SELECT * FROM dm_login WHERE phone=? AND dupwd=?',[obj.phone,obj.dupwd],function(err,result){
    if(err) throw err;
	console.log(result);
	//判断数据长度是否大于0
	if(result.length>0){
	  res.send({code:200,msg:'login success'});
	}else{
	  res.send({code:301,msg:'login error'});
	}
  });

});
//  //3.检索用户(详情)
// router.get('/detail',function(req,res){
//   //3.1获取get请求数据
//   var obj=req.query;
//   //3.2验证是否为空
//   if(!obj.uid){
//     res.send({code:401,msg:'uid required'});
// 	return;
//   }
//   //3.3执行SQL语句
//   pool.query('SELECT * FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
//     if(err) throw err;
// 	//把查询到的数据响应到浏览器端
//     res.send(result);
//   });
// });
// //4.修改用户
// router.get('/update',function(req,res){
//   //4.1获取数据
//   var obj=req.query;
//   //4.2验证是否为空
//   //批量验证，获取每一个属性，然后判断是否为空
//   var i=400;
//   for(var key in obj){
// 	i++;
//     //属性值是否为空
//     if(!obj[key]){
// 	  res.send({code:i,msg:key+' requred'});
// 	  return;
// 	}
//   }
//   //4.3执行SQL语句
//   pool.query('UPDATE xz_user SET email=?,phone=?,user_name=?,gender=? WHERE uid=?',[obj.email,obj.phone,obj.user_name,obj.gender,obj.uid],function(err,result){
//     if(err) throw err;
// 	console.log(result);
// 	//判断是否修改成功
// 	if(result.affectedRows>0){
// 	  res.send({code:200,msg:'update success'});
// 	}else{
// 	  res.send({code:301,msg:'update err'});
// 	}
//   });
  
// });
// //5.用户列表
// router.get('/list',function(req,res){
//   //5.1获取数据
//   var obj=req.query;
//   //5.2将数据转为整型
//   obj.pno=parseInt(obj.pno);
//   obj.size=parseInt(obj.size);
//   //5.3验证输入是否为空
//   if(!obj.pno) obj.pno=1;//设置默认页码1
//   if(!obj.size) obj.size=2;//默认大小为2
//   //5.4计算每页的开始
//   var start=(obj.pno-1)*obj.size;
//   //5.5执行SQL语句，把结果响应给浏览器端
//   pool.query('SELECT * FROM xz_user LIMIT ?,?',[start,obj.size],function(err,result){
//     if(err) throw err;
// 	res.send(result);
//   });
// });
// //6.删除用户
// router.get('/delete',function(req,res){
//   //6.1获取数据
//   var obj=req.query;
//   //6.2验证是否为空
//   if(!obj.uid){
//     res.send({code:401,msg:'uid required'});
// 	return;
//   }
//   //6.3执行SQL语句
//   pool.query('DELETE FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
//     if(err) throw err;
// 	//判断是否删除成功
// 	if(result.affectedRows>0){
// 	  res.send({code:200,msg:'delete success'});
// 	}else{
// 	  res.send({code:301,msg:'delete error'});
// 	}
//   });
// });
//导出路由器
module.exports=router;

