import React, { useEffect, useState } from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { AnimalCard } from './index'
import { mintContract, saleContract, signer } from '../contracts';

const SaleAnimalCard = ({animalType, animalTokenId, animalPrice, account, getOnSaleAnimalTokens}) => {

    const [isBuyable, setIsBuyable] = useState(false);

    const getAnimalTokenOwner = async() => {
        try{
            const response = await mintContract.ownerOf(animalTokenId)
            console.log(response)
            //setOwner(response)
            console.log(response.toLocaleLowerCase() == account.toLocaleLowerCase())
            setIsBuyable((response.toLocaleLowerCase() == account.toLocaleLowerCase()))
        }catch(err){
            console.log(err)
        }
    }

    const onClickBuy = async() => {
        try{
            if(!account) return;
            const response = await saleContract.purchaseAnimalToken(animalTokenId, {value : animalPrice})
            console.log(response)
            response.wait().then(()=>{
                if(response.wait.length == 1){
                    getOnSaleAnimalTokens()
                }
            })

        }catch(err){
            console.log(err)
        }
    }


    useEffect(() => {
        getAnimalTokenOwner()
        console.log(getOnSaleAnimalTokens())
    },[])

    return (
        <Box width={200} >
            <AnimalCard animalType={animalType} />
            <Text>No.{animalTokenId} / {animalPrice} GEN</Text>
            {
                !isBuyable ?  <Button onClick={onClickBuy}>Buy</Button> : <p>mine</p>
            }
        </Box>
    )
}

export default SaleAnimalCard