import filetypes from 'file-type'

interface IsImageProps {
  isImage: boolean
  file: File
}

export const fileTypeHelper = (file: File): Promise<filetypes.FileTypeResult> => {
  return new Promise((reslove, reject) => {
    const reader = new FileReader()

    reader.readAsArrayBuffer(file)

    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer
      const convertedFile = filetypes(arrayBuffer)
      if (!convertedFile) reject('File Type is Not Found')
      reslove(convertedFile)
    }

    reader.onerror = error => {
      reject(error)
    }
  })
}

export const checkImageType = (file: File, fileSupport: string[] = ['image/jpeg', 'image/jpg', 'image/png']): Promise<IsImageProps> => {
  return new Promise(async (reslove, reject) => {
    const fileType = await fileTypeHelper(file)
    if (fileSupport.indexOf(fileType.mime) === -1) reslove({ file, isImage: false })
    reslove({ file, isImage: true })
  })
}

export const checkFileSize = (file: File, fileSize: number): boolean => {
  return file.size <= fileSize
}

export const getBase64Image = (file: File): Promise<String> => {
  return new Promise((reslove, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      reslove(reader.result as string)
    }
    reader.onerror = error => {
      reject(error)
    }
  })
  // const reader = new FileReader()
  // reader.addEventListener('load', () => callback(reader.result))
  // reader.readAsDataURL(img)
}
