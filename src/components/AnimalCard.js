import React, { useState } from 'react'
import { Image } from '@chakra-ui/react'
// import { image2 } from '../../public/images'

const AnimalCard = ({animalType}) => {

    //const [aa, setAa] = useState('');
    return (
        <Image width={150} height={150} src={`/images/image${animalType}.png`}/>
        // <Image src={image2}/>
    )
}

export default AnimalCard