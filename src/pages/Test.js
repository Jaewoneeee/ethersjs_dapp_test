import React, { useEffect } from 'react'
import { mintContract, provider, provider2 } from '../contracts'
import { ethers } from 'ethers'

const Test = () => {

    const testFunc = async() => {
       
        //const res = await provider.getLogs("0xb7aCF971835B8B58919d65B6A1f481b204303BF9")
        //const res = await provider.getBlockNumber()
        const res =  await provider2.getTransactionReceipt("0xf0a5e5026c636375bb682a8f738b3b080d6b3cf53365e687c9089404bd5f04ff")

        // const logs = await provider.getLogs({
        //     fromBlock: 0,
        //     toBlock: 'latest',
        //     topic: event
        //   })

        console.log(res.logs[0].topics)
        console.log(ethers.utils.defaultAbiCoder.decode(['uint256'] ,res.logs[0].topics[0])[0]._hex)
        console.log(ethers.utils.defaultAbiCoder.decode(['uint256'] ,res.logs[0].topics[1])[0]._hex)
        console.log(ethers.utils.defaultAbiCoder.decode(['uint256'] ,res.logs[0].topics[2])[0]._hex)
        console.log(ethers.utils.defaultAbiCoder.decode(['uint256'] ,res.logs[0].topics[3])[0].toString())
        console.log(ethers.utils.defaultAbiCoder.decode(['uint256'] , "0x000000000000000000000000ec1da7f5244df23b3353cb015f949105283f5dc0"))
        console.log(ethers.utils.defaultAbiCoder.decode(['uint256'] , "0x00000000000000000000000000000000000000000000000000000000012b1280")[0].toString())
        console.log(ethers.utils.defaultAbiCoder.decode(['uint256'] , "0x0000000000000000000000000000000000000000000002073ce0459c51752c00")[0].toString() / (10**18))

        const logs = mintContract.filters.Transfer("0x702011a440D75c741982a900F02eec3180697D05", "0xb7aCF971835B8B58919d65B6A1f481b204303BF9")
        //console.log(logs)
        //console.log( (await provider2.getLogs))
        // ERC 721 
        // from / to / tokenId 
       // console.log(logs)

        console.log(ethers.Signer)

    }

    useEffect(() => {
        testFunc()
    },[])

    return (
        <div>Test</div>
    )
}

export default Test