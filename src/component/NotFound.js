import React,{useContext, useEffect} from 'react'
import { StoreContext } from "../Store/StoreG";

const NotFound = () => {
    const {setNavFooter} = useContext(StoreContext)
    useEffect(() =>{
        setNavFooter(true)
    },[])
    return (
        <div className="notfound-page border-box">
            <h3>Sahifa topilmadi!!!</h3>
            <img src="/images/undraw_oc.svg" alt="saf"/>
        </div>
    )
}

export default NotFound
