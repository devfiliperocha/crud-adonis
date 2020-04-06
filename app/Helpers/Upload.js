const Helpers = use('Helpers')
const path = require('path') 
const fs = require('fs') 

class Upload {
  static async uploadPhoto(photo, id, old=null) {
		try{
			
			if (!photo) {
				return {
					success: false,
					error: "Favor selecionar uma imagem."
				}
			}
			
			const photoName = `${id}_${new Date().getTime()}${path.extname(photo.clientName)}`
	
			await photo.move(Helpers.publicPath('images'), {
				name: photoName,
				overwrite: true
			})
	
			if (!photo.moved()) {
				return {
					success: false,
					error: "Erro ao mover imagem. "+photo.error().message
				}
			}else{
				if(old){
					const oldPhoto = path.join(Helpers.publicPath('images'), old)		
					if(fs.existsSync(oldPhoto)){
						fs.unlinkSync(oldPhoto)
					}
				}
				return {
					success: true,
					photoName,
					photoFullPath: path.join(Helpers.publicPath('images'), photoName)
				}
			}
		}catch(err){
			return {
				success: false,
				error: "Erro ao mover imagem. "+err.message
			}
		}
  }
}

module.exports = Upload
