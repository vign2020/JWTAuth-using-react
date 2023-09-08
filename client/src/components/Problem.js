import React from 'react'

import {Link} from 'react-router-dom';
import FilterBy from './FilterBy';
import data from '../data/data'

import img1 from '../static/codeone.jpg'
import img2 from '../static/codetwo.jpg'
import img3 from '../static/codethree.jpg'
import img4 from '../static/codefour.jpg'

const images=[img1 , img2 , img3 , img4]


export default function Problem() {
 
    const [problem_comp1, problem_tags1, unique_tags1, study_plan] = data;
    
  return (
    <>
    
    <div className='card-container'>
        {
            problem_comp1.map((item,index)=>{
                return(
                    <>
                    <div class="card">
                        <h2>{item.heading}</h2>
                        <p>{item.text}</p>
                        <button>Click me</button>
                    </div>
                    </>
                )
            })
        }
        </div>
        <div className='study-plan-container'>
            {
                study_plan.map((item , index)=>{
                    console.log(`index is ${index}`)
                    let img=`img${index+1}`
                    console.log(img)
                    return(
                        <>
                            <div className="content">
                                <img src={images[index%4]} alt="" />
                            <h3>{item.heading}</h3>
                            <p>{item.content}</p>
                            </div>
                        </>
                    )
                })
            }

        </div>

        <h2>Popular problem tags</h2>
        <div className="problemtags">
            {
                unique_tags1.map((item,index)=>{
                    return(
                        <div className={`problemtags-unique-${index}`} style={{margin:'10px'}}>
                            
                                <Link to={`/tags?tag=${item.tag}`}>
                                    <button>{item.tag}</button>
                                </Link>
                           
                        </div>
                    )
                })
            }
        </div>
        <FilterBy problem_tags={problem_tags1}/>
    </>

  )
}



