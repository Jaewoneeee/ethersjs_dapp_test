import { Grid } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { mintContract, saleContract } from '../contracts'
import { SaleAnimalCard } from '../components/index'
import { ethers } from 'ethers'

const SalePage = ({account}) => {

    const [saleAnimalCard, setSaleAnimalCard] = useState()

    const getOnSaleAnimalTokens = async() => {

        const tempOnSaleArr = []

        try{
            const response = await saleContract.getOnSaleAnimalTokenArrayLength()
            for(let i = 0; i < parseInt(response._hex, 16); i++){
                console.log(parseInt(response._hex, 16))
                const animalTokenId = await saleContract.onSaleAnimalTokenArray(i)
                const animalType = await mintContract.animalTypes(animalTokenId)
                const animalPrice = await saleContract.animalTokenPrices(animalTokenId)
                console.log("가격",animalPrice)
                //const animalPrice = ethers.utils.formatEther(animalPriceBig)

                tempOnSaleArr.push([parseInt(animalTokenId._hex, 16), parseInt(animalType._hex, 16), parseInt(animalPrice._hex, 16)])
            }
            console.log(tempOnSaleArr)
            setSaleAnimalCard(tempOnSaleArr)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getOnSaleAnimalTokens()
    },[])

    return (
        <Grid mt={4} templateColumns="repeat(4, 0.1fr)" gap={8}>
                {
                    saleAnimalCard != null ?
                    saleAnimalCard.map((item, index)=> {
                        return <SaleAnimalCard
                            animalTokenId={item[0]}
                            animalType={item[1]} 
                            animalPrice={item[2]}
                            account={account}
                            key={index}                  
                            getOnSaleAnimalTokens={getOnSaleAnimalTokens}
                        />
                    })
                    : null
                }
        </Grid>
        
    )
}

export default SalePage