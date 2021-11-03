
//use libreria;

// Obtener todos los autores
db.libros.aggregate([ 
    { $unwind: "$autor" },
    { $project: { _id:0,nombre:{ $concat: [ "$autor.nombre", " - ", "$autor.apellidos" ] } } }
    ])

// Obtener los autores cuyo apellido sea DATE 
db.libros.aggregate([ 
    { $unwind: "$autor" },
    { $match: {"autor.apellidos":"DATE"}},
    { $project: { _id:0,nombre:{ $concat: [ "$autor.nombre", " - ", "$autor.apellidos" ] } } }
    ])   

//Obtener los libros editados en 1998 o en 2005
db.libros.find(
    {$or:[{anyo:"1998"},{anyo:"2005"}]},{_id:0,titulo:1}
) 

db.libros.aggregate([ 
    {$match:{$or:[{anyo:"1998"},{anyo:"2005"}]}},
    {$project: {_id:0,titulo:1}}
])
    
// Obtener el número de libros de la editorial Addison‐Wesley
db.libros.find(
    {editorial:"Addison-Wesley"}
).count()

db.libros.aggregate([ 
    {$match:{editorial:"Addison-Wesley"}},
    {$group:{_id:null, mycount:{$sum:1}}},
    {$project: {_id:0,mycount:1}}
])

// Obtener el libro que ocupa la tercera posición

db.libros.aggregate([ 
    {$skip:2},
    {$limit:1},
    {$project: {_id:0,titulo:1}}
]).toArray()[0].titulo
  
// Obtener la lista de autores de cada libro junto con el título

db.libros.aggregate([ 
    {$unwind: "$autor" },
    {$project: {_id:0,autor:1, titulo:1, anyo:1}}
])

//Obtener los títulos de libro publicados con posterioridad a 2004.

db.libros.aggregate([ 
    {$match:{anyo:{$gt:"2001"}}},
    {$project: {_id:0, titulo:1, anyo:1}}
])

// Obtener los libros editados desde 2001 y precio mayor que 50
db.libros.aggregate([ 
    {$match:{$and:[
        {anyo:{$gt:"2004"}},
        {precio:{$gt:50}}
    ]}},
    {$project: {_id:0, titulo:1, precio:1}}
])

// Obtener los libros publicados por la editorial Addison‐Wesley después de 2005

db.libros.aggregate([ 
    {$match:{$and:[
        {editorial:"Addison-Wesley"},
        {anyo:{$gt:"2005"}}
    ]}},
    {$project: {_id:0, titulo:1, anyo:1}}
])

// Obtener el título de libro y editorial para aquellos libros que tengan un precio superior a 50€.

db.libros.aggregate([ 
    {$match:{precio:{$gt:50}}},
    {$project: {_id:0, titulo:1, editorial:1}}
])

// Obtener los libros publicados en 1998 o a partir de 2005.
db.libros.aggregate([ 
    {$match:{$or:[
        {anyo:{$eq:"1998"}},
        {anyo:{$gt:"2005"}}
    ]}},
    {$project: {_id:0, titulo:1, anyo:1}}
])