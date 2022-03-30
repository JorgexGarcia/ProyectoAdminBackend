const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { verifyGoogle } = require('../helpers/google-verify');


const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({
            email
        });

        //Verificar email
        if(!usuarioDB) {
            return res.status(400).json({
                        ok: false,
                        msg: 'Error de login'
                    });
        }

        //Si es usuario de google
        if(usuarioDB.google){
            return res.status(400).json({
                ok: false,
                msg: 'Tienes que hacer login con Google'
            });
        }


        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword){
            return res.status(401).json({
                ok: false,
                msg: 'Error de login'
            });
        }

        //Genera Token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

}

const loginGoogle = async (req, res) => {

    const tokenGoogle = req.body.token;

    try {

        const { name, email, picture} = await verifyGoogle(tokenGoogle);  

        //Verificar si ya existe en la BD
        const existeUsuario = await Usuario.findOne({email});

        let user;

        if(existeUsuario){
            user = existeUsuario;
            user.google = true;

        }else{
            user = new Usuario({
                nombre: name, 
                email: email,
                password: '@',
                img: picture,
                google: true
            })
        }

        //Guardar en la BD
        await user.save();

        //Genera Token
        const token = await generarJWT(user.id);

        res.json({
            ok: true,
            token
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

}

const renewToken = async (req, res) => {

    const uid = req.uid;

    //Genera Token
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    login,
    loginGoogle,
    renewToken
}