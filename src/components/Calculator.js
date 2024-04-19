import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Input, Slider, SliderTrack, SliderFilledTrack, SliderThumb, useToast } from "@chakra-ui/react";
import { MdGraphicEq, MdClose } from "react-icons/md";
import moment from "moment-timezone";
import './calculator.css';
import Toggle from "./Toggle";


function SelectedTimezone({ timezone, onRemove, isFirst, parentSliderValue, onSliderChange }) {
  const [selectedHour, setSelectedHour] = useState(0);
  

  useEffect(() => {
    const initialTime = moment().tz(timezone).hour();
    setSelectedHour(isFirst ? initialTime : (initialTime + parentSliderValue + 24) % 24);
  }, [timezone, isFirst, parentSliderValue]);

  const handleSliderChange = (value) => {
    setSelectedHour(value);
    onSliderChange(value);
  };

  const formatTime = (hour) => {
    const time = moment().tz(timezone).startOf("day").add(hour, "hours");
    return time.format("hh:mm A");
  };

  return (
    <Box borderWidth="2px" borderRadius="md" p="3" mb="3" width="100%">
      <Flex align="center" justify="space-between" mb="3">
        <Text fontSize="lg" fontWeight="bold" color="black">{timezone}</Text>
        <MdClose className="close-button" cursor="pointer" onClick={() => onRemove(timezone)} />
      </Flex>
      <Flex justifyContent="space-between" mb="2">
        <Box borderWidth="1px" borderRadius="md" p="2" textAlign="center" width="45%">
          <Text>{formatTime(selectedHour)}</Text>
        </Box>
        <Box borderWidth="1px" borderRadius="md" p="2" textAlign="center" width="45%">
          <Text>{moment().tz(timezone).format("ddd, DD MMM YYYY")}</Text>
        </Box>
      </Flex>
      <Box p="3">
        <Slider aria-label="slider-ex-4" value={selectedHour} onChange={handleSliderChange} max={23}>
          <SliderTrack>
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={7}>
            <Box as={MdGraphicEq} color="tomato" />
          </SliderThumb>
        </Slider>
        <Flex justifyContent="space-between" mt="2">
          {[0, 3, 6, 9, 12, 15, 18, 21].map(hour => (
            <Text key={hour}>{formatTime(hour)}</Text>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

function Calculator() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTimezones, setFilteredTimezones] = useState([]);
  const [selectedTimezones, setSelectedTimezones] = useState([]);
  const [parentSliderValue, setParentSliderValue] = useState(0);
  const toast = useToast();

  const timezones = moment.tz.names();

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = timezones.filter((timezone) =>
      timezone.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTimezones(filtered);
  };

  const handleAddTimezone = (timezone) => {
    setSelectedTimezones((prevSelected) => {
      const isFirst = prevSelected.length === 0;
      return [...prevSelected, { timezone, isFirst }];
    });
    setSearchTerm("");
    setFilteredTimezones([]);

    toast({
      title: "TimeZone Added Successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleRemoveTimezone = (timezone) => {
    setSelectedTimezones((prevSelected) =>
      prevSelected.filter((tz) => tz.timezone !== timezone)
    );

    toast({
      title: "TimeZone Deleted !!",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleParentSliderChange = (value) => {
    setParentSliderValue(value);
  };

  return (
    <Box maxW="800px" mx="auto" mt="20" p="30">
      <Input variant="filled" width="50%" type="text" placeholder="Search timezone..." value={searchTerm} onChange={handleSearch} />
      <Toggle />
      {searchTerm && (
        <Box  borderWidth="1px" borderRadius="md" mt="2" p="2" maxH="100px" overflowY="auto">
          {filteredTimezones.map((timezone, index) => (
            <Box className="list-group-item"key={index} cursor="pointer" onClick={() => handleAddTimezone(timezone)} p="2" _hover={{ bg: "gray.100" }}>
              {timezone}
            </Box>
          ))}
        </Box>
      )}
      <Box mt="4">
        {selectedTimezones.map((tz, index) => (
          <SelectedTimezone
            key={index}
            timezone={tz.timezone}
            isFirst={tz.isFirst}
            parentSliderValue={parentSliderValue}
            onRemove={handleRemoveTimezone}
            onSliderChange={handleParentSliderChange}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Calculator;
