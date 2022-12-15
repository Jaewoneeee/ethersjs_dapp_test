import { Grid, Box, Text, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimalCard, MyAnimalCard } from '../components'
import { mintContract, saleAnimalTokenAddress, saleContract } from '../contracts'

const MyPage = ({account}) => {
    
    const navigate = useNavigate()
    const [animalCardArr, setAnimalCardArr] = useState()
    const [saleStatus, setSaleStatus] = useState(false)

    const getAnimalTokens = async() => {
        try{
            const balanceLength = await mintContract.balanceOf(account)
            console.log("balance : ", balanceLength)

            const tempAnimalCardArr = []

            if (balanceLength == '0') return;
        
            const response = await mintContract.getAnimalTokens(account)
            
            for(let i = 0; i < response.length; i++){
                //console.log(parseInt(response[i][0]._hex, 16))
                //console.log(parseInt(response[i][1]._hex, 16))
                //console.log(parseInt(response[i][2]._hex, 16))

                tempAnimalCardArr.push([parseInt(response[i][0]._hex, 16), parseInt(response[i][1]._hex, 16), parseInt(response[i][2]._hex, 16)])
            }

            console.log(response)
            setAnimalCardArr(tempAnimalCardArr)
            
        } catch(err){
            console.log(err)
        }
    }

    const getIsApprovedForAll = async() => {
        try{
            const response = await mintContract.isApprovedForAll(account, saleAnimalTokenAddress);
            console.log(response)

            if(response){
                setSaleStatus(response)
            }

        }catch(err){
            console.log(err)
        }
    }

    const onClickApprovedToggle = async() => {
        try{
            if(!account) return
            const response = await mintContract.setApprovalForAll(saleAnimalTokenAddress, !saleStatus)
            console.log(response)
            response.wait().then( async() => {
                if(response.wait.length == 1){
                    setSaleStatus(!saleStatus)
                }
            })
        }catch(err){
            console.log(err)
        }
    }

    const goHome = () => {
        navigate('/')
    }

    const goSale = () => {
        navigate('/sale')
    }

    useEffect(()=>{
        if(!account) return
        getAnimalTokens()
        getIsApprovedForAll()        
    },[account])

    return (
        <div>
            MyPage
            <button onClick={(goHome)}>Home</button>
            <button onClick={(goSale)}>Sale</button>
            <Box>
                <Text>Sale Status : {saleStatus ? "True" : "False"} </Text>
                <Button onClick={onClickApprovedToggle} >Approve</Button> 
                <Text>===============</Text>
            </Box>
            <Grid templateColumns="repeat(4, 0.1fr)" gap={8}>
                {
                    animalCardArr != null ?
                    animalCardArr.map((item, index)=> {
                        return <MyAnimalCard 
                            animalTokenId={item[0]}
                            animalType={item[1]} 
                            animalPrice={item[2]}
                            saleStatus={saleStatus}
                            account={account}
                            key={index}                  
                        />
                    })
                    : null
                }
            </Grid>
        </div>
    )
}

export default MyPage