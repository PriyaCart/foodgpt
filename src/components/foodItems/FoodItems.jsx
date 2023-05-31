import React, { useEffect, useState } from 'react';
import './FoodItems.css';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import MenuItems from '../menuItems/MenuItems';
import Footer from '../footer/Footer';
import logo from "../../assets/fo-logo.png";


const baseURL = "http://localhost:9000";
const mainURL = "https://screen-prod.fidisys.com";

function FoodItems() {
  const [place, setPlace] = useState('');
  const [placeApi, setPlaceApi] = useState(true);
  const [placename, setplaceName] = useState('');
  const [foodItems, setFoodItems] = useState('')
  const [breakfast, setBreakfast] = useState([])
  const [loading, setLoading] = useState(0);
  const [error, setError] = useState('');
  const [breakfastImg, setBreakfastImg] = useState({});
  const [city, setCity] = useState(true)
  let bfRequest;
  let bfResults;
  bfRequest = 'true';

 

 const handleValue = (value) => {
  let cityValue = value;
  setPlace(cityValue);
  //console.log(place, "place")
  callSearchApi(cityValue);
 }

  const callSearchApi = (cityValue) => {
    if(typeof(cityValue) != "string"){
      cityValue.preventDefault();
      cityValue = place;
    }
    setCity('')
    setFoodItems('')
    setError('');
    setBreakfast([])
    setBreakfastImg({})
    bfRequest = 'true';
    setLoading(1)
    breakfastApi(cityValue);
  }
  const bfapi1 = async(bfArray1) => {
    const image =await axios.get(`${mainURL}/populardish1?dish=${bfArray1}`)
   // console.log(bfArray1, "bfArray1")
   // console.log(image.data, "img data")
    for(let i=0; i<image.data.dish.length; i++){
      let keyvalue = image.data.dish[i]
      setBreakfastImg(breakfastImg => ({...breakfastImg, [keyvalue]: image.data.img[i]}))  
    }
    // console.log(breakfastImg, "bf img")
    
  }
  const bfapi2 = async(bfArray2) => {
    const image =await axios.get(`${mainURL}/populardish2?dish=${bfArray2}`)
    for(let i=0; i<image.data.dish.length; i++){
      let keyvalue = image.data.dish[i]
      setBreakfastImg(breakfastImg => ({...breakfastImg, [keyvalue]: image.data.img[i]}))  
    }
   // console.log(breakfastImg, "bf img")
    
  }
 

  const breakfastApi = async(cityValue) => {
  //  console.log(cityValue);
    bfResults =await axios.get(`${mainURL}/breakfastList?place=${cityValue}&placeApi=${placeApi}`)
   // console.log( bfResults.data, "bfresults");
    setCity(true);
    setLoading(0);
  
    if(bfResults.data.name || bfResults.data.errcity){
     setFoodItems('');
     setError('!! Search by Exact Place !!')
  }
  if(bfResults.data.error){
    setFoodItems('');
    setError("!! "+ bfResults.data.error + " !!")
 }
   if(bfResults.data.breakfast){
     setError('');
     setplaceName(bfResults.data.place)
     setBreakfast(bfResults.data.breakfast)
      setFoodItems('true');
     if(bfResults.data.breakfast.length <= 8){
      let div = Math.floor(bfResults.data.breakfast.length / 2);
      let bfArray1 = bfResults.data.breakfast.slice(0, div);
      let bfArray2 = bfResults.data.breakfast.slice(div, bfResults.data.breakfast.length);
      bfapi1(bfArray1);
      let image2 = await axios.get(`${mainURL}/populardish2?dish=${bfArray2}`);
    //  console.log(image2, "img data")
      for(let i=0; i<image2.data.dish.length; i++){
         let keyvalue = image2.data.dish[i]
         setBreakfastImg(breakfastImg => ({...breakfastImg, [keyvalue]: image2.data.img[i]}))  
      }
    }
      else{
        let div = Math.floor(bfResults.data.breakfast.length / 3);
        let bfArray1 = bfResults.data.breakfast.slice(0, div);
        let bfArray2 = bfResults.data.breakfast.slice(div, div+div);
        let bfArray3 = bfResults.data.breakfast.slice(div+div, bfResults.data.breakfast.length);
        bfapi1(bfArray1);
        bfapi2(bfArray2);
        let image3 = await axios.get(`${mainURL}/populardish3?dish=${bfArray3}`);
        //console.log(image3, "img data")
        for(let i=0; i<image3.data.dish.length; i++){
           let keyvalue = image3.data.dish[i]
           setBreakfastImg(breakfastImg => ({...breakfastImg, [keyvalue]: image3.data.img[i]}))  
        }
      }
    //  for(let i=0; i<bfResults.data.breakfast.length; i++){
    //    //console.log(breakfast, "bf")
    //    let image = await axios.get(`${mainURL}/breakfast?dish=${bfResults.data.breakfast[i]}`)
    //    let keyvalue = bfResults.data.breakfast[i]
    //    setBreakfastImg(breakfastImg => ({...breakfastImg, [keyvalue]: image.data}))  
    //  }
   }
  }


    return (
      <>
      <div className='foodBody'>
         <div className='food-header'><span className='food-logo'>
          <span><img src={logo} alt='logo' className='food-logo'/></span>
          <span className='logo-food'>Food<span className='logo-gpt'>GPT</span></span></span>
         <span className='ai-model'>OpenAI API Model <i>gpt-3.5-turbo</i></span></div>
              <form className='search-input1' onSubmit={callSearchApi}>
                 <input className='inputField1' placeholder='Enter a city to find its signature dishes' type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
                 <button type='submit'><i class="fas fa-search" id="search-icon1"></i></button>
              </form>
            { city ?
              <div className='cityNames1'>
                <h4>POPULAR CITIES IN INDIA</h4>
                <p><span className='cityBold1' onClick={() => handleValue('Delhi')}>Delhi</span><span className='cityLight1' onClick={() => handleValue('Mumbai')}>Mumbai</span><span className='cityBold1' onClick={() => handleValue('Bangalore')}>Bangalore</span><span className='cityLight1' onClick={() => handleValue('Chennai')}>Chennai</span>
                <span className='cityBold1' onClick={() => handleValue('Hyderabad')}>Hyderabad</span><span className='cityLight1' onClick={() => handleValue('Kolkata')}>Kolkata</span><span className='cityBold1' onClick={() => handleValue('Ahmedabad')}>Ahmedabad</span><span className='cityLight1' onClick={() => handleValue('Pune')}>Pune</span>
                <span className='cityBold1' onClick={() => handleValue('Jaipur')}>Jaipur</span><span className='cityLight1' onClick={() => handleValue('Surat')}>Surat</span><span className='cityBold1'>&  more.</span></p>
              </div>
            : ''}
            { foodItems == 'true' ?
         <MenuItems bfArray= {breakfast} bfImg={breakfastImg} place= {placename}/> :
         ''
         }

         {error !== '' ?
            <h2 className='error-msg'>{error}</h2> :
            ''}
            {loading === 1 ?
             <div>
              <div className='loaderIcon'>
             <Oval
                height={60}
                width={80}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
 
 />
 </div>
   <p className='loading'>Looking for great food in {place}...</p> 
             </div>
          :
            ''}  

          
      </div>
      { foodItems !== 'true' ?
      <Footer class="p_fixed"/>

      :  <Footer class="p_none"/>}  
      </>
    ) 
}

export default FoodItems