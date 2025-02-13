from pathlib import Path
from dotenv import load_dotenv 
import os
from datetime import datetime
import base64

class ImageHandler:
    def __init__(self):
        load_dotenv()
        imagesdir_path=os.getenv("IMAGES_DIR_PATH")
        if not os.path.isdir(imagesdir_path) :
            os.makedirs(imagesdir_path)
        self.imagesdir = Path(imagesdir_path)

    def _dateFormatter(self,date):
        formattedDate = datetime.strptime(date,"%m/%d/%Y")
        return formattedDate.strftime("%Y%m%d")


    def saveImage(self,file,date):
        # print('file:',file,'date:',date,'filename',file.filename)
        print('Saving Images...')
        formattedDate = self._dateFormatter(date)
        print('formmateddate',formattedDate)
        folderPath = Path(self.imagesdir,formattedDate)
  
        print('folder path',folderPath)

        os.makedirs(folderPath,exist_ok=True)

        fileName = Path(folderPath,file.filename)
        print('filename',fileName)
        try:
            file.save(fileName)
            print('saved file',fileName)
            return fileName
        except Exception as err:
            print("Can't save file ", fileName, "More exception details: ",err) 


    def getAllImages(self,date):
        try:

            formattedDate = self._dateFormatter(date)
            folderPath = Path(self.imagesdir,formattedDate)
            imagesList = []
            for f in os.listdir(folderPath):
                file_path = os.path.join(folderPath,f)
                if os.path.isfile(file_path):
                    with open(file_path,'rb') as img:
                        binImg = img.read()
                        imagesList.append(binImg)
            
            imagesList = [base64.b64encode(img).decode('utf-8') for img in imagesList]
          
            return imagesList

        except Exception as err:
            print('Error while fetching file from dir',folderPath,' error: ',err)
            return []
    
    
    