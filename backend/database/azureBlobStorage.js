const { BlobServiceClient } = require('@azure/storage-blob');


const connectionStrings = '';  
const containerName = 'myblob';  
  
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionStrings);  
const containerClient = blobServiceClient.getContainerClient(containerName); 

const uploadFileToBlobStorage = async (file,fileName) => {  
  console.log(file);
    const blobName = fileName;  
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);  
    
    // await blockBlobClient.uploadData(file.data, {  
    //   blobHTTPHeaders: {  
    //     blobContentType: file.type,  
    //   },  
    // });  
    await blockBlobClient.uploadData(file.buffer);
    
    console.log(`File "${blobName}" uploaded successfully.`);  
  };  


const getFileFromBlobStorage = async (req,res) => {  
  try {  
    const id=req.params['id'];
    // const thumbnailBlobName = `${_id}_thumbnail`;  
    // const videoBlobName = `${_id}_video`;  
  
 
    // const thumbnailUrl = thumbnailBlobClient.url;  
    // const videoUrl = videoBlobClient.url;  
  
    // Fetch the course details from the database  
    // const course = await Course.findById(_id);  
  
    // Return the course details along with the thumbnail and video URLs  
    // return {  
    //   name: course.name,  
    //   description: course.description,  
    //   thumbnailUrl,  
    //   videoUrl,  
    // };  
    const blockBlobClient = containerClient.getBlockBlobClient(id);  
    
    const downloadResponse = await blockBlobClient.download();
    const contentType=downloadResponse.contentType; 
    console.log(contentType);
    res.set('Content-Type', contentType);
    downloadResponse.readableStreamBody.pipe(res);
  } catch (error) {  
    console.error(error);  
    //throw new Error('Error fetching files from Blob Storage.');  
  }  
};  

    
module.exports = {  
    uploadFileToBlobStorage,  
    getFileFromBlobStorage,
    
  };  
