import nodemailer from 'nodemailer';  
import dotenv from 'dotenv';  

dotenv.config({ path: '.env' });  

const emailRegistro = async (datos) => {  
    const transport = nodemailer.createTransport({  
        host: process.env.EMAIL_HOST,  
        port: process.env.EMAIL_PORT,  
        auth: {  
            user: process.env.EMAIL_USER,  
            pass: process.env.EMAIL_PASS  
        }  
    });  

    const { email, nombre, token } = datos;  

    //Enviar el email  
    await transport.sendMail({  
        from: 'BienesRaices.com',  
        to: email,  
        subject: 'Confirma tu cuenta en BienesRaices.com',  
        text: 'Confirma tu cuenta en BienesRaices.com',  
        html: `  
        <!DOCTYPE html>  
        <html lang="es">  
        <head>  
            <meta charset="UTF-8">  
            <meta name="viewport" content="width=device-width, initial-scale=1.0">  
            <title>Confirmación de Cuenta</title>  
            <style>  
                body {  
                    font-family: Arial, sans-serif;  
                    background-color: #000000;  
                    color: #ffffff;  
                    margin: 0;  
                    padding: 0;  
                    background-image: url('https://tu-url-imagen.jpg'); /* Cambia esta URL */  
                    background-size: cover;  
                    background-position: center;  
                    background-attachment: fixed;  
                }  
                .email-container {  
                    max-width: 600px;  
                    margin: 20px auto;  
                    background-color: #C3f73a;  
                    border-radius: 10px;  
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
                    overflow: hidden;  
                }  
                .header {  
                    padding: 20px;  
                    text-align: center;  
                    color: #ffffff;  
                    background-color: #094d92;  
                }  
                .header h1 {  
                    margin: 0;  
                }  
                .content {  
                    padding: 20px;  
                    background-color: #ffffff;  
                    color: #000000;  
                    text-align: center;  
                }  
                .content p {  
                    font-size: 16px;  
                    color: #68b684;  
                    margin-bottom: 20px;  
                }  
                .btn {  
                    display: inline-block;  
                    background-color: #094d92;  
                    color: #ffffff;  
                    text-decoration: none;  
                    padding: 12px 20px;  
                    border-radius: 5px;  
                    font-weight: bold;  
                    transition: background-color 0.3s ease;  
                }  
                .btn:hover {  
                    background-color: #C3f73a;  
                }  
                .footer {  
                    background-color: #094d92;  
                    padding: 10px;  
                    text-align: center;  
                    color: #ffffff;  
                    font-size: 14px;  
                }  
            </style>  
        </head>  
        <body>  
            <div class="email-container">  
                <div class="header">  
                    <h1>¡Hola, ${nombre}!</h1>  
                </div>  
                <div class="content">  
                    <p>Tu cuenta ya está lista. Solo debes confirmarla haciendo clic en el siguiente enlace:</p>  
                    <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}" class="btn">  
                        Confirmar cuenta  
                    </a>  
                    <p>Si tú no creaste esta cuenta, puedes ignorar este email.</p>  
                </div>  
                <div class="footer">  
                    <p>Gracias por elegir Bienes Raíces.</p>  
                </div>  
            </div>  
        </body>  
        </html>  
        `  
    });  
}  

const emailOlvidePassword = async (datos) => {  
    const transport = nodemailer.createTransport({  
        host: process.env.EMAIL_HOST,  
        port: process.env.EMAIL_PORT,  
        auth: {  
            user: process.env.EMAIL_USER,  
            pass: process.env.EMAIL_PASS  
        }  
    });  

    const { email, nombre, token } = datos;  

    //Enviar el email  
    await transport.sendMail({  
        from: 'BienesRaices.com',  
        to: email,  
        subject: 'Restablece tu password en BienesRaices.com',  
        text: 'Restablece tu password en BienesRaices.com',  
        html: `  
        <!DOCTYPE html>  
        <html lang="es">  
        <head>  
            <meta charset="UTF-8">  
            <meta name="viewport" content="width=device-width, initial-scale=1.0">  
            <title>Restablecer Contraseña</title>  
            <style>  
                body {  
                    font-family: Arial, sans-serif;  
                    background-color: #000000;  
                    color: #ffffff;  
                    margin: 0;  
                    padding: 0;  
                    background-image: url('https://tu-url-imagen.jpg'); /* Cambia esta URL */  
                    background-size: cover;  
                    background-position: center;  
                    background-attachment: fixed;  
                }  
                .email-container {  
                    max-width: 600px;  
                    margin: 20px auto;  
                    background-color: #C3f73a;  
                    border-radius: 10px;  
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
                    overflow: hidden;  
                }  
                .header {  
                    padding: 20px;  
                    text-align: center;  
                    color: #ffffff;  
                    background-color: #094d92;  
                }  
                .header h1 {  
                    margin: 0;  
                }  
                .content {  
                    padding: 20px;  
                    background-color: #ffffff;  
                    color: #000000;  
                    text-align: center;  
                }  
                .content p {  
                    font-size: 16px;  
                    color: #68b684;  
                    margin-bottom: 20px;  
                }  
                .btn {  
                    display: inline-block;  
                    background-color: #094d92;  
                    color: #ffffff;  
                    text-decoration: none;  
                    padding: 12px 20px;  
                    border-radius: 5px;  
                    font-weight: bold;  
                    transition: background-color 0.3s ease;  
                }  
                .btn:hover {  
                    background-color: #C3f73a;  
                }  
                .footer {  
                    background-color: #094d92;  
                    padding: 10px;  
                    text-align: center;  
                    color: #ffffff;  
                    font-size: 14px;  
                }  
            </style>  
        </head>  
        <body>  
            <div class="email-container">  
                <div class="header">  
                    <h1>¡Hola, ${nombre}!</h1>  
                </div>  
                <div class="content">  
                    <p>Has solicitado restablecer tu contraseña en Bienes Raíces. Para hacerlo, sigue el siguiente enlace:</p>  
                    <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}" class="btn">  
                        Restablecer contraseña  
                    </a>  
                    <p>Si tú no solicitaste el cambio de contraseña, puedes ignorar este email.</p>  
                </div>  
                <div class="footer">  
                    <p>Gracias por elegir Bienes Raíces.</p>  
                </div>  
            </div>  
        </body>  
        </html>  
        `  
    });  
}  

export { emailRegistro, emailOlvidePassword };