import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  CloseButton,
  Divider,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AddAddress/address.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearItem } from "../Redux/AddtoCart/action";
const Payment = () => {
  const navigate = useNavigate()
  const address = useSelector((store) => store.orderAddressReducer.userDetails);
  console.log("address: ", address);
  const { name, city, phone, houseNo, roadName, pincode, state } = address;
  const dispatch = useDispatch()
  

  const product = useSelector((state) => {
    return state.addtoCartReducer.item;
  });

  var toatalPrice = useSelector((state) => {
    return state.addtoCartReducer.totalAmount;
  });



  const payment=()=>{

    toast.success(' Order Placed Successfull !', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    setTimeout(()=>{
      dispatch(clearItem())
      navigate("/")
     
    },5000)

    
  }


  return (
    <div className="maindiv2">
      <div>
        {product.length > 0 &&
          product.map((e) => {
            return (
              <Card
                key={e.id}
                margin="10px"
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={e.img1}
                  alt="produc image"
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">{product.brand}</Heading>

                    <Text py="2">{e.name}</Text>
                    <Text>Size: Free Size Qty: {e.quantity}</Text>
                    <Text> {e.price}</Text>
                  </CardBody>

                  <CardFooter>
                    <Center height="50px">
                      <Divider orientation="vertical" />
                    </Center>

                    <Text size="sm">
                      Delivery Adderess: {houseNo},{roadName},{city},{pincode},
                      {state},{phone}
                    </Text>
                  </CardFooter>
                </Stack>
              </Card>
            );
          })}

        <Divider orientation="horizontal" />
        <Text>Supplier : AlexVyan Brothers Pvt Ltd Free Delivery</Text>
        <Divider orientation="horizontal" />
        {/* <h2>Product Details</h2>
        <img src={product.image}/>
        <p>{product.dis_price}</p>
       */}
      </div>
      <div>
        <Card margin="10px">
          <CardHeader>
            <Heading size="md">Price Details</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Text size="xs" textTransform="uppercase">
                Total Product Price :{toatalPrice}
              </Text>
              <Text size="xs" textTransform="uppercase">
                Order Total :{toatalPrice}
              </Text>
            </Stack>
            <Button onClick={payment} variant='solid' colorScheme='pink'>
       Pay
      </Button> 
          
          </CardBody>
        </Card>
      </div>
      <ToastContainer 
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored" />
    </div>
  );
};
export default Payment;
