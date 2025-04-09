
import * as dotenv from 'dotenv'
import express from 'express'
import nodemailer from 'nodemailer'

import cors from 'cors'
dotenv.config()

const port = 4000
const app = express()

app.use(cors())
app.use(express.json())

app.post('/send', (request, response) => {
  const { name, email, phone, service, menssage } = request.body

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  })

  console.log(service)

  const htmlTemplate = `
  <!DOCTYPE html>
  <html lang="pt-br">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  
  <style>
      * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
      }
      .header{
          display: flex;
          align-items: center;
      }
  
      .footer {
          display: flex;
          flex-direction: column;
          padding: 0;
      }

      .contacts {
          display: flex;
          align-itens: center;
      }


  </style>
  <body>
      <header class="header">
          <h1>${service}</h1>
      </header>
      <main>
          <p>${menssage}</p>
          <footer class="footer">
           <span> Att: ${name} </span>
             <div class="contacts"> 
                 <span> E-mail: ${email}</span>  
                 <span> Telefone: ${phone}</span>
             </div>
          </footer>
      </main>
  </body>
  </html>
  `

  const sendEmail = {
    from: `${name} via Site <${process.env.EMAIL}>`,
    to: 'emelyfontes@hotmail.com',
    replyTo: email,
    subject: `${service}`,
    html: htmlTemplate,
  }

  async function run () {
    await transporter.sendMail(sendEmail, (err) => {
      if (err) {
        console.log(err)
      }

      console.log('email enviado com sucesso!')
    })

    return response.json()
  }

  run()
})

app.listen(port)
