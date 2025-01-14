import { Box, HStack, Button, Input, Select ,Text,Flex, Container, Heading} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TimerCard from "../Components/TimerCard";
import styles from '../Styled/TimeSheet.module.css';
import Sidebar from "../Components/Sidebar";

const TimeSheet = () => {
  const [options, setOptions] = useState([]);
  const [selectedTask, setselectedTask] = useState("");

  const handleChange = (e) => {
    const { checked, value } = e.target;
    console.log(e);
    setselectedTask(value);
  };
  console.log(selectedTask);

  const getData = async (url) => {
    try {
      let res = await axios.get(url, {
        headers: {
          authorization: `${localStorage.getItem("TimeCampToken")}`,
        },
      });

      setOptions(res.data);
    } catch (error) {
      console.log("timesheet error", error);
    }
  };
  let url2 = "https://blooming-sea-03900.herokuapp.com/project/task";
  console.log(options);
  useEffect(() => {
    getData(url2);
  }, []);

  return (
    <Box className={styles.main_cont}>
        <Container w="17%" padding={0} margin={0}>
        <Sidebar />
      </Container>

    <Box
      ml={"20%"}
      boxShadow="box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
    >
      <Box className={styles.top_cont}>
      <Heading  size={'lg'}>TimeSheet</Heading>
      </Box>
      
      {/* <HStack mb={"10"} w={"50%"} justifyContent={"space-between"}>
        <Input w={""} type={"date"} />
        <Button colorScheme={"green"} defaultChecked>
          Day
        </Button>
      </HStack>
      <Box mb={"8"} width={"80%"} h="100px" border={"1px solid green"}>
        <HStack>
          <Box>
            <Select
              placeholder="Select option"
              onChange={(e) => handleChange(e)}
            >
              {options.map((el) => {
                return <option value={el.taskName}>{el.taskName}</option>;
              })}
            </Select>
          </Box>
        </HStack>
      </Box> */}
      {options?.map((el) => {
        return (
          <div key={el._id}>
            <TimerCard taskId={el._id} taskName={el.taskName} />
          </div>
        );
      })}
    </Box>

    </Box>
  );
};

export default TimeSheet;
