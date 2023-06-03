const express = require("express");
const app = express();
const mysql = require("mysql")
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"proyectoWeb"
});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const marca = req.body.marca;
    const stock = req.body.stock;
    const categoria = req.body.categoria;

    db.query('INSERT INTO productos(nombre,descripcion,precio,marca,stock,categoria) VALUES(?,?,?,?,?,?)',[nombre,descripcion,precio,marca,stock,categoria],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});

app.get("/productos",(req,res)=>{

    db.query('SELECT * FROM productos ',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const marca = req.body.marca;
    const stock = req.body.stock;
    const categoria = req.body.categoria;

    db.query('UPDATE productos SET nombre=?,descripcion=?,precio=?,marca=?,stock=?,categoria=? WHERE id=?',[nombre,descripcion,precio,marca,stock,categoria,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM productos WHERE id=?',[id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});


app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})
