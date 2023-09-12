import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie';

import github from '../uploads/WhatsApp Image 2022-04-02 at 7.43.28 PM.jpeg';


export default function Profile() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [path , setPath] =useState(null);
    const [cookie] = useCookies(['CurrentUser']);

    const [image , setImage] = useState(null)
    const [image_show , setImage_show] = useState('none');
    const [location , setLocation] =useState(null)
    const [role , setRole] =useState(null)
    const [solved , setSolved] = useState(null);
    const [ranking , setRanking] = useState(null);
    const [contest , setContest] = useState(null);
    const [about , setAbout]=useState(null);
    
    const curr_user = cookie.CurrentUser;
    const encodedCurrUser = encodeURIComponent(curr_user);

    console.log('user is '+ encodedCurrUser)

    const get_profile_page= async ()=>{
      try{
        const resp = await axios.get(`http://localhost:5000/profile?curr_user=${encodedCurrUser}`);
        console.log('image name ist'+resp.data.image)
        console.log('contest is ' + resp.data.contest)

        setContest(resp.data.contest);
        setRanking(resp.data.ranking);
        setSolved(resp.data.solved);
        setImage(resp.data.image);

      }catch(e){
        console.log(e);
      }
      
      
    }
    useEffect(()=>{
      get_profile_page();
    },[])

    const handleFileChange = (event) => {
      const file = event.target.files[0]; // Get the first file selected
      setSelectedFile(file);
    };
    console.log(selectedFile)


    const handleUpload = async () => {
      try {
        setImage_show('block')
        const formData = new FormData();
        formData.append('file', selectedFile); // 'file' is the field name on the server
    
        const response = await axios.post(`http://localhost:5000/profile?curr_user=${encodedCurrUser}`, formData , {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          
        });
    
        // Handle the response from the server
        console.log('File uploaded successfully:', response.data);
        const image_path = response.data.image;
        setPath(`../../server/uploads/${image_path}`)
        console.log('image is.....' + path)

      } catch (error) {
        // Handle any errors
        console.error('Error uploading file:', error);
      }
      };
    
      

  return (
    <div className="parent">
      <div className="parent-sub-1">
      <div className="profile-container-1">
        {image === null ? 'no-image' :  <img src={require(`../uploads/${image}`)} height='170' width='170' id='profile-image-id' onClick={()=>{setImage_show('block')}}/> }
          <input type="file" onChange={handleFileChange} style={{display : image_show}} />
          <button onClick={handleUpload} style={{display : image_show}}>Upload</button>
          <h4>{curr_user.toUpperCase()}</h4>
          {location === null ? <h4>1234 Elm Street Los Angeles, CA 90001 USA</h4> : <h4>{location}</h4> }
          {role === null ? <h4>full-stack developer</h4> : <h4>{role}</h4> }
      </div>
      <div className="profile-container-2">
        <h2>About</h2>
        {about === null ? <h3>Throughout my career, I have developed a passion for coding and problem-solving. I thrive on challenges and view each project as an opportunity to learn and grow. [Company Name]'s reputation for embracing cutting-edge technologies and its commitment to fostering a culture of innovation align perfectly with my career aspirations.</h3> : <h3>{location}</h3> }
      </div>
      </div>
      
      <div className="profile-container-3">
      <h1>Stats</h1>
        <div className="profile-container-3-items">
          
          <div className="profile-container-3-item-1">
              <h2>Contests</h2>
              <h2>{contest}</h2>
          </div>
          <div className="profile-container-3-item-2">
              <h2>ranking</h2>
              <h2>{ranking}</h2>
          </div>
         
          <div className="profile-container-3-item-3">
              <h2>solved</h2>
              <h2>{solved}</h2>
          </div>
         
        </div>
        
      </div>
  
  </div>
  )
}
