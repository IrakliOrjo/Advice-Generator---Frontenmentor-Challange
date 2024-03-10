import axios from 'axios';
import './index.css';
import { useEffect, useState } from 'react';
import icon1 from './images/icon-dice.svg'
import mobileDivider from './images/pattern-divider-mobile.svg'


function App() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchedData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('https://api.adviceslip.com/advice')
        setData([response.data])
      }catch(err){
        console.error(err)
      }finally{
        setIsLoading(false)
      }
    }
    fetchedData()
    
  },[])

async function changeAdvice() {
  setIsLoading(true)
  const fetchedData = await axios.get('https://api.adviceslip.com/advice')
  setData([fetchedData.data])
  setIsLoading(false)
}


  return (
    <div className="bg-color min-h-screen md:flex md:justify-center 
    md:items-center p-[3.7rem] md:m-auto">
      <div className='bg-box-color relative rounded-md md:rounded-2xl 
      md:max-w-[40rem] mt-[9rem] md:mt-0 p-8'>
        {isLoading ? <p className='text-white text-[2.8rem] text-center
        tracking-[1rem] font-bold uppercase
        '>Loading ...</p> : ''}
      {data && !isLoading && data?.map((item,index) => {
        return (
          <div 
          key={index}
          className='flex flex-col text-center'>
            <p className='text-color mb-4 tracking-[0.2rem] uppercase text-[.8rem] font-bold'>Advice # {item.slip.id}</p>
            <p className='text-gray-200 font-bold mb-5 text-[1.7rem]'>"{item.slip.advice}"</p>
            <div className='flex items-center justify-center mb-9  w-full'>
              <div className='border border-gray-400 w-full h-0 boder-white'></div>
              <img className='' src={mobileDivider} alt='divider icon' />
              <div className='border border-gray-400 w-full h-0 boder-white'></div>
            </div>
          </div>
        )
      })}
      <div 
      onClick={() => changeAdvice()}
      className='rounded-full absolute left-[43%] md:left-1/2 md:transform md:-translate-x-1/2 
       cursor-pointer bottom-[-2rem] flex items-center justify-center hover:brightness-200
        hover:drop-shadow-2xl hover:bg-cyan-400 
      h-[4rem] w-[4rem] bg-cyan-300'>
        <img 
          className='bg-cyan-400'
          src={icon1} alt='dice icon' />
      </div>
      </div>
    </div>
  );
}

export default App;
