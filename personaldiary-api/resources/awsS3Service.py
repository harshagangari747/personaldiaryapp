import boto3
from dotenv import load_dotenv 
import os


class S3FileUploadService:
    def __init__(self):
        load_dotenv()
        accesskey=os.getenv("AWS_ACCESS_KEY_ID")
        secretkey=os.getenv("AWS_SECRET_ACCESS_KEY")
        self.region = os.getenv("AWS_DEFAULT_REGION")
        self.bucketName = "personaldiarys3bucket"

        self.s3Client = boto3.client('s3',aws_access_key_id=accesskey, aws_secret_access_key=secretkey,region_name=self.region)
        #self.createBucketIfDoesntExist()

        return 
    
    def createBucketIfDoesntExist(self):
        try:
           response = self.s3Client.head_bucket(Bucket=self.bucketName)
           print(response)
        except ClientError:
            self.s3Client.create_bucket(Bucket=self.bucketName,CreateBucketConfiguration={'LocationConstraint': self.region})
    

    def uploadImages(self, file):
        try:
            self.s3Client.upload_file('/Users/saiharshagangari/ReactJs/personaldiary/personaldiary-api/Images/bird.jpeg',self.bucketName,'abc.jpeg')
            presingedUrl = self.s3Client.generate_presigned_url('get_object',
                                        Params={'Bucket': self.bucketName, 'Key': 'abc.jpeg'},
                                        ExpiresIn=3600)
            print('presigned url: ', presingedUrl)
            return presingedUrl
        except Exception as e:
            print('failed to upload images',e)