import React,{useState,useEffect} from 'react'
 import  {template}  from '../card/atom'
 import { useRecoilState } from 'recoil'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from '../Templates/Templates.module.css'
import { useNavigate } from "react-router-dom";

export default function Template(){
    const navigate = useNavigate()
    const [linkOfImg,setLinkOfImg] = useState('')
    const [currentTemplate,setCurrentTemplate]=useRecoilState(template)
    const images=[
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgN6bX7PLVRuY9RSvLl2roObBtUEbmNPrjQEgSe-HsLIfcszD48NrVGpSmDI0lpdbwWOoN3D9qFf9ifkREmxyhUY0rwcU38ICVUzBCIykzGKvJOkG0wwq456EIXoM_v_n1Q7uVCefmfwsli4n6YknyoPiJZBhOluBmCx_927mT3ruFngx0vTRTXk4ybgg/w640-h360-rw/beeautiful-sunset-illustration-1212023.png',
        'https://c4.wallpaperflare.com/wallpaper/448/174/357/neon-4k-hd-best-for-desktop-wallpaper-preview.jpg',
        'https://c4.wallpaperflare.com/wallpaper/108/140/869/digital-digital-art-artwork-fantasy-art-drawing-hd-wallpaper-preview.jpg',
        'https://wallpapers.com/images/featured/4k-earth-huo9w63ktk37matc.jpg',
        'https://t4.ftcdn.net/jpg/05/47/97/81/360_F_547978128_vqEEUYBr1vcAwfRAqReZXTYtyawpgLcC.jpgcd Project-4',
        'https://img3.wallspic.com/previews/7/3/1/4/6/164137/164137-engine_moon_shower-water-atmosphere-world-light-x750.jpg',
        'https://c4.wallpaperflare.com/wallpaper/952/536/1006/winter-4k-pc-desktop-wallpaper-preview.jpg',
        'https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?cs=srgb&dl=pexels-sohail-nachiti-807598.jpg&fm=jpg',
    ];

    useEffect(() => {
        const storedTemplate = localStorage.getItem('userTemplate');
        if (storedTemplate) {
          setCurrentTemplate(storedTemplate);
        }

      }, []);

    function handleImg(ele) {
        setCurrentTemplate(ele)
        localStorage.setItem('userTemplate',`${ele}`)
        navigate('/')
    }
    function handleChangeImg(e){
        setLinkOfImg(e.target.value)
    }
    function handleClickTemplate(){
      if(linkOfImg!==''){
        setCurrentTemplate(linkOfImg)
      localStorage.setItem('userTemplate',`${linkOfImg}`)
      navigate('/')
    }
  else{
    alert('select any background')
  }}



    return(
        <div className={styles.container}>
            <div className={styles.heading}>
                <hi>Have your template....</hi>
            </div>
            <div className={styles.input}>
                <TextField
                    className={styles.textField}
                    label="Link of Your favorite template...."
                    variant="filled"
                    color='success'
                    onChange={handleChangeImg}    
                    />
                
                <Button 
                    onClick={handleClickTemplate}
                    variant='contained'
                 > Apply the template.... </Button>
          
            </div>
            <div className={styles.images}>
                    {images.map((ele,index)=>
                    <img className={styles.image} key={index}
                         onClick={()=>{handleImg(ele)}} src={ele} alt=''/>)
                }
            </div>

        </div>
    )
}