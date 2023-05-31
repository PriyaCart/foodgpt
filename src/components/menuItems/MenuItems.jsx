import React, { useState } from 'react';
import './menuItems.css';
//import dummy from '../../assets/dimg.png';
import dummy from '../../assets/pan.gif';
import swiggy from '../../assets/swiggy1.webp';
import zomato from '../../assets/zomato.png';
import { Oval } from 'react-loader-spinner';


function MenuItems(props) {
  const [checkBf, setCheckbf] = useState('true');
  const [totalFoods, setTotalfoods] = useState(props.bfArray.length)
  const [load, setLoad] = useState(0)
  return (
    <div className='foodBottom'>
      <div className='foodnavTop'>{
        totalFoods ?
        <div className="totalFoods">{totalFoods} Food Items</div>
        :''
      }
    
      </div>
    
     <div className='totalCards'>
      {checkBf !== ''  ?  props.bfArray.map((obj, index) => {
        return (
          <div className="card">
          <div>{ props.bfImg[obj] ? 
             <img className='foodImg' src={props.bfImg[obj]} alt='img' />
             
        : <div className='dummyImg'><img className='foodImg' src={dummy} alt='img' />
            </div>
        }
        </div> 
          <div className='cardDetail'>
          <div className='cardFoodnames'>
          <h5 className="card-title">{obj}</h5>
          <p className="card-text">{props.place}</p>
          </div>
          {/* <div className='orderApps'><a href= "https://www.zomato.com/" target="_blank" ><button className='zomato-btn'>Order in Zomato</button></a><a href= {"https://www.swiggy.com/search?query="+obj} target="_blank" ><button className='swiggy-btn'>Order in Swiggy</button></a></div> */}
          {/* <div className='orderApps'><a href= "https://www.zomato.com/" target="_blank" ><img className='zomato' src={zomato} alt="zomato"/></a><a href= {"https://www.swiggy.com/search?query="+obj} target="_blank" ><img className='swiggy' src={swiggy} alt="swiggy"/></a></div> */}
          <div className='orderApps'><a href= "https://www.zomato.com/" target="_blank" ><button className='zomatoBtn'>Zomato</button></a><a href= {"https://www.swiggy.com/search?query="+obj} target="_blank" ><button className='swiggyBtn'>Swiggy</button></a></div>
         
          </div>
          </div>
        )
      }) :
      ''}
      {/* <div className="card">
          <div>{ load == 0 ? 
         <div className='dummyImg'> <img className='foodImg' src={dummy} alt='img' />
         <span className='oval'>
         <Oval
           height={30}
           width={30}
           color="#5A5A5A"
           wrapperStyle={{}}
           wrapperClass=""
           visible={true}
           ariaLabel='oval-loading'
           secondaryColor=""
           strokeWidth={3}
           strokeWidthSecondary={3}

/>
</span>
         </div>
        : <img className='foodImg' src={swiggy} alt='img' />}</div>
          <div className='cardDetail'>
          <div className='cardFoodnames'>
          <h5 className="card-title">hello</h5>
          <p className="card-text">chennai</p>
          </div>
        
          <div className='orderApps'><a href= "https://www.zomato.com/" target="_blank" ><button className='zomatoBtn'>Zomato</button></a><a href= {"https://www.swiggy.com/search"} target="_blank" ><button className='swiggyBtn'>Swiggy</button></a></div>
         
          </div>
          </div>
      */}
     </div>     
</div>
  )
}

export default MenuItems