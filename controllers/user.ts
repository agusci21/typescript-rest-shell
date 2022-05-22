import { Request, Response } from 'express'
import User from '../models/user'
import { checkIfEmailExists, checkIfIdExists } from '../helpers/check_if_params_exists';
import { parse } from 'dotenv';

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll({
    where: {
      state: 1
    }
  })

  res.json({
    users,
  })
}

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await User.findByPk(id)
  //Este error no es real
  const {state} = user;
  if(user && state){
      res.json({
        user,
      })

  }else {
      res.status(404).json({
          msg: 'No existe un usuario con id: ' + id
      })
  }
}

export const postUser = async (req: Request, res: Response) => {
  const { body } = req
  const {email} = body
  try {
    const emailExists = await checkIfEmailExists(email)
    if(emailExists){
      return res.status(400).json({
        msg: 'Ya existe un usuario con el email: ' + body.email
      })
    }
    const user =  User.build(body)
    await user.save()
    res.status(201).json({
      user
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error interno del servidor, hable con el administrador'
    })
  }
}

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { body } = req
  const {email} = body
  try{
    const idExist: boolean = await checkIfIdExists(id)
    const emailExist: boolean = await checkIfEmailExists(email)
    if(!idExist){
      return res.status(404).json({
        msg: "No existe usuario con el id: " + id
      })
    }

    if(emailExist){
      return res.status(400).json({
        msg: 'El email: ' + email + ' ya esta en uso'
      })
    }

    const user = await User.findByPk(id)
    user?.update(body)

    res.json({
      msg: "Usuario modificado",
      user
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error interno del servidor, hable con el administrador'
    })
  }

}
export const deleteUser = async(req: Request, res: Response) => {
  const { id } = req.params

  const existUser= await checkIfIdExists(id)

  if(!existUser){
    return res.status(404).json({
      msg: "No existe usuario con el id: " + id
    })
  }

  const user = await User.findByPk(id)


    await user?.update({state: false})
   // await user?.destroy() Esto elimina fisicamente el usuario

  res.json({
    msg: 'usuario eliminado',
    user
  })
}
