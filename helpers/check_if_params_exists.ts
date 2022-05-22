import User from "../models/user"

export const checkIfEmailExists = async (email?: string) : Promise<boolean> => {
    if(!email) return false;
    const emailExist = await User.findOne({
        where: {
          email: email
        }
      })

      return emailExist ? true : false
}
export const checkIfIdExists = async (id?: string) : Promise<boolean> => {
    if(!id) return false 
  const idExist = await User.findByPk(id)
    return idExist ? true : false
}