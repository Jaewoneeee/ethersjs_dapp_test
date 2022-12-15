import { Box, Button, InputGroup, Input, InputRightAddon } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { saleContract } from '../contracts'
import AnimalCard from './AnimalCard'
import { ethers } from 'ethers'


const MyAnimalCard = ({animalType, animalTokenId, animalPrice, saleStatus, account}) => {

    const [sellPrice, setSellPrice] = useState('')    
    const [myAnimalPrice, setMyAnimalPrice] = useState(animalPrice)

    const changeSellPirce = (e) => {
        setSellPrice(e.target.value)
    }

    const selling = async(sellPrice, animalTokenId) => {
        console.log(sellPrice)
        // console.log(animalTokenId)

        const price = ethers.utils.parseEther((sellPrice).toString())
        const price2 = sellPrice * (10**18)
        console.log(price)
        console.log(price2)

        try{
            const response = await saleContract.setForSaleAnimalToken(animalTokenId, sellPrice)
            console.log(response)
            response.wait().then(()=>{
                if(response.wait.length == 1){
                    setMyAnimalPrice(price)
                }
            })
        }catch(err){
            console.log(err)
        } 
    }

    useEffect(() => {

    },[])

    return (
    <Box width={200} >
        <AnimalCard animalType={animalType} />
        <Box mt={2}>
            {myAnimalPrice == "0" ? 
            <>
                <InputGroup>
                    <Input type='number' value={sellPrice} onChange={changeSellPirce}/>
                    <InputRightAddon children="GEN"/>
                </InputGroup>
                <Button size="sm" colorScheme="red" onClick={()=>selling(sellPrice, animalTokenId)}>판매버튼</Button> 
            </>
            : <div>판매중 : {myAnimalPrice} GEN</div>}
        </Box>  
    </Box>
    
    )
}

export default MyAnimalCard