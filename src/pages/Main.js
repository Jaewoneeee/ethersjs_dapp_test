import React, { useEffect, useState } from 'react'
import { mintContract } from '../contracts'
import { AnimalCard } from '../components/index'
import { useNavigate } from 'react-router-dom';

const Main = ({ account }) => {

    const [newAnimalType, setNewanimalType] = useState('');
    const navigate = useNavigate()

    const goMypage = () => {
        navigate('/mypage')
    }

    const minting = async() => {
        try{
            if(!account) return;
            const response = await mintContract.mintAnimalToken()
            response.wait().then( async() => {
                
                if(response.wait.length == 1){
                    const balanceLength = await mintContract.balanceOf(account);
                    console.log(balanceLength)
                    const animalTokenId = await mintContract.tokenOfOwnerByIndex(account, parseInt(balanceLength, 10) - 1)
                    console.log(animalTokenId)
                    const animalType = await mintContract.animalTypes(animalTokenId);
                    
                    console.log(animalType);

                    //console.log(parseInt(balance._hex, 16));
                    let data = parseInt(animalType._hex, 16);
                    setNewanimalType(data)
                    console.log(data)
                }
            })
        } catch(err) {
            console.log(err)
        }
    } 

    useEffect(() => {

    },[])

    return (
        <>
        {
            account != null ?
            <div>
                <div> account : {account} </div>
                <button onClick={goMypage}>mypage</button>
                <p>==============</p>
            </div>
            : null
        }
        <button onClick={()=>minting()}>Mint</button>
        <div>
        {
            newAnimalType != '' ? 
            // <img src={`image${newAnimalCard}`}/>
            <AnimalCard animalType={newAnimalType}/>
            //<img src={newAnimalCard}/>
            : <div>z</div>
        }
        </div>
        </>
    )
}

export default Main