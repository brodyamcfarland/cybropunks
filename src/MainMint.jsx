import React from 'react';
import { useState } from 'react';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { ethers, BigNumber } from 'ethers';
import brodyNFT from './BrodyNFT.json';
import './MainMint.css';

const brodyNFTAddress = "0x093Ca4aA9aE4aedA0eCCEE1CA44E0d34F508321d";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                brodyNFTAddress,
                brodyNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.05 * mintAmount).toString()),
                    gasLimit: 750000,
                });
                console.log('response: ', response);
            } catch (err) {
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex className='containermint' justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text className='minttext' fontSize="48px" textShadow="0 5px #000000">CybroPunks</Text>
                    <Text className='minttext' fontSize="30px" letterSpacing="-5.5%" fontFamily="VT323" textShadow="0 2px 2px #000000">
                        In a world where nothing makes sense, CybroPunks are the only thing that makes sense.
                    </Text>
                    <Text fontSize="15px" letterSpacing="-5.5%" color="grey" fontFamily="VT323" textShadow="0 2px 2px #000000">
                        Please use Desktop for Web3 connectivity and performance.
                    </Text>
                </div>

                {isConnected ? (
                    <div>
                        <Flex align="center" justify="center">
                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleDecrement}
                            >-</Button>
                            <Input readOnly fontFamily="inherit" width="100px" height="40px" textAlign="center" paddingLeft="19px" marginTop="10px" type="number" value={mintAmount} />
                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleIncrement}
                            >+</Button>
                        </Flex>
                        <Button
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            onClick={handleMint}
                        >Mint Now</Button>
                    </div>
                ) : (
                    <Text className='minttext' marginTop="70px" fontSize="30px" letterSpacing="5.5%" fontFamily="VT323" textShadow="0 3px #000000" color="#D6517D">You must be connected to Mint.</Text>
                )}
            </Box>
        </Flex>
  );
};

export default MainMint;