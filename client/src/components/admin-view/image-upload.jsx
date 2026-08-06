
import React,{useRef,useEffect} from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { UploadCloudIcon } from 'lucide-react';
 import { File,XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';
function productImageUpload({imageFile,setImageFile,uploadedImageUrl,setUploadedImageUrl,imageLoadingState,setImageLoadingState,isEditMode}) {
  const inputRef=useRef(null);

  console.log(isEditMode,'isEditMode');
  function handleImageFileChange(event){
    console.log(event.target.files);
    const selectedFile=event.target.files?.[0];
    if(selectedFile) setImageFile(selectedFile)
    
  }
  function handleDragOver(event){
    event.preventDefault();
  }
  function handleDrop(event){
    event.preventDefault();
    const droppedFile=event.dataTransfer.files?.[0];
    if(droppedFile) setImageFile(droppedFile)
  }
function handleRemoveImage(){
  setImageFile(null);
  if(inputRef.current){
    inputRef.current.value='';
  }
}

async function uploadImageToCloudinary(){
  setImageLoadingState(true)
 const data=new FormData();
 data.append('my_file',imageFile);
 const response=await axios.post('http://localhost:5000/api/admin/products/upload-image',data);
 console.log('responce',response);
 
 if(response.data?.success) {
  setUploadedImageUrl(response.data.result.url);
  setImageLoadingState(false);
 }
}
useEffect(()=>{
  if(imageFile!== null) uploadImageToCloudinary();
},[imageFile])
  return (
    <div className='w-full max-w-md mx-auto' >
        <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
        <div onDragOver={handleDragOver} onDrop={handleDrop} className={`${isEditMode?'opacity-55':''} border-2 border-dashed rounded-lg p-4 m-4`}>
          <Input id="image-upload" type="file" 
          ref={inputRef}
          className="hidden"
          onChange={handleImageFileChange}
          disabled={isEditMode}
          />
          {
            !imageFile?
            <Label htmlFor="image-upload" className={`${isEditMode?'cursor-not-allowed':''} flex flex-col items-cneter justify-center h-32 cursor-pointer`}>
              <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
              <span>Drag & dropor click to upload image</span>
              </Label>:
              imageLoadingState?<Skeleton className='h-10 bg-gray-100'/>:
              (<div className="flex items-center justify-between">
                <div className="flex items-center">
                  <File className="w-8 h-8 text-primary mr-2"/>
                  <p className='text-sm font-medium'>{imageFile.name}</p>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                   <XIcon className='w-4 h-4'>
                    <span className='sr-only'>Remove File</span>
                    </XIcon> 
                  </Button>
                </div>
                
              </div>)
          }
        </div>
    </div>
  )
}

export default productImageUpload;