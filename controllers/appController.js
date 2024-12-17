import { Precio, Categoria, Propiedad,Usuario } from "../models/index.js";
import { Sequelize } from 'sequelize';
const inicio = async (req, res) => {
    const [categorias, precios, casas, departamentos, establecimientosRenta, establecimientosVenta] = await Promise.all([
        Categoria.findAll({ raw: true }),
        Precio.findAll({ raw: true }),
        Propiedad.findAll({
            limit: 3,
            where: {
                categoriaID: 1 
            },
            include: [
                {
                    model: Precio,
                    as: 'precio'
                },
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['alias', 'foto'] 
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        }),
        //-------------------------------------------------------------
        Propiedad.findAll({
            limit: 3,
            where: {
                categoriaID: 2 
            },
            include: [
                {
                    model: Precio,
                    as: 'precio'
                },
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['alias', 'foto'] 
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        }),
        Propiedad.findAll({
            limit: 3,
            where: {
                categoriaID: 3, 
                operacion: 'renta' 
            },
            include: [
                {
                    model: Precio,
                    as: 'precio'
                },
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['alias', 'foto'] 
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        }),
        Propiedad.findAll({
            limit: 3,
            where: {
                categoriaID: 3, 
                operacion: 'venta' 
            },
            include: [
                {
                    model: Precio,
                    as: 'precio'
                },
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['alias', 'foto'] 
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
    ]);

    res.render('inicio', {
        pagina: 'Inicio',
        categorias,
        precios,
        casas,
        departamentos,
        propiedadesRenta: establecimientosRenta,  
        propiedadesVenta: establecimientosVenta,
        usuario: req.usuario,  // Pasar el usuario
        csrfToken: req.csrfToken()
    });
};

const categoria = async (req, res) => {
    const { id } = req.params;

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
        return res.redirect('/404');
    }

//------------------------------------------------------------
    const propiedadesRenta = await Propiedad.findAll({
        where: {
            categoriaID: id,
            operacion: 'renta'
        },
        include: [
            { model: Precio, as: 'precio' },
            { model: Categoria, as: 'categoria' }   
        ]
    });

    const propiedadesVenta = await Propiedad.findAll({
        where: {
            categoriaID: id,
            operacion: 'venta'
        },
        include: [
            { model: Precio, as: 'precio' },
            { model: Categoria, as: 'categoria' }   
        ]
    });

    res.render('categoria', {
        pagina: `${categoria.nombre}s en venta o renta`,
        propiedadesRenta,
        propiedadesVenta,
        usuario: req.usuario,  
        csrfToken: req.csrfToken()
    });
};

const noEncontrado = (req, res) => {
    res.render('404',{
        pagina: 'No Encontrado',
        usuario: req.usuario,  
        csrfToken: req.csrfToken()
    });
}

const buscador = async (req, res) => {
    const { termino } = req.body;

    if (!termino.trim()) {
        return res.redirect('back');
    }

    const propiedades = await Propiedad.findAll({
        where: {
            titulo: {
                [Sequelize.Op.like]: '%' + termino + '%'
            }
        },
        include: [
            { model: Precio, as: 'precio' }
        ]
    });

    res.render('busqueda', {
        pagina: 'Resultados de la búsqueda',
        propiedades,
        usuario: req.usuario,  
        csrfToken: req.csrfToken()
    });
}

export {
    inicio,
    categoria,
    noEncontrado,
    buscador
};
