import React from "react";
import moment from "moment-timezone";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import FlagIcon from "react-flag-icon-css";

function TimeZone() {
  const timezones = moment.tz.names();

  return (
    <div style={{ marginTop: '50px' }}>
      <h1>All Timezones</h1>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Flag</Th>
            <Th>Timezone</Th>
            <Th>UTC Offset</Th>
            <Th>Daylight Saving Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {timezones.map((timezone, index) => (
            <Tr key={index}>
              <Td><FlagIcon code={timezone.slice(0, 2).toLowerCase()} /></Td>
              <Td>{timezone}</Td>
              <Td>{moment.tz(timezone).format('Z')}</Td>
              <Td>{moment.tz(timezone).isDST() ? 'Yes' : 'No'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default TimeZone;
