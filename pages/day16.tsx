import React, { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day16";

const DayX = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const hexadecimalCharacterToBinary = (hexdecimal: string) => {
    const binary = parseInt(`0x${hexdecimal}`, 16).toString(2);
    // pad to length 4
    return binary.padStart(4, "0");
  };

  const inputToBinary = (inp: string) => {
    let output = "";
    for (let i = 0; i < inp.length; i++) {
      output += hexadecimalCharacterToBinary(inp[i]);
    }
    return output;
  };

  interface Packet {
    data: string;
    value: number;
    totalVersionNumber: number;
  }

  const readLiteral = (packet: Packet) => {
    const { data } = packet;
    const packetVersion = parseInt(data.slice(0, 3), 2);
    let str = data.slice(6);
    let binary = "";

    while (str.length > 0) {
      if (str[0] === "0") {
        binary += str.slice(1, 5);
        str = str.slice(5);
        break;
      }
      binary += str.slice(1, 5);
      str = str.slice(5);
    }
    return {
      data: str,
      value: parseInt(binary, 2),
      totalVersionNumber: packetVersion + packet.totalVersionNumber,
    };
  };

  const getValue = (operator: number, values: number[]) => {
    switch (operator) {
      case 0:
        return values.reduce((a, b) => a + b, 0);
      case 1:
        return values.reduce((a, b) => a * b, 1);
      case 2:
        return Math.min(...values);
      case 3:
        return Math.max(...values);
      case 5:
        return values[0] > values[1] ? 1 : 0;
      case 6:
        return values[0] < values[1] ? 1 : 0;
      case 7:
        return values[0] === values[1] ? 1 : 0;
      default:
        return 0;
    }
  };

  const readOperators = (packet: Packet): Packet => {
    const { data } = packet;
    const operator = parseInt(data.slice(3, 6), 2);
    const lengthTypeId = data.slice(6, 7);
    const packetVersion = parseInt(data.slice(0, 3), 2);
    const totalVersionNumber = packet.totalVersionNumber + packetVersion;
    if (lengthTypeId === "0") {
      const subpacketBitLength = parseInt(data.slice(7, 22), 2);
      let subpackets = data.slice(22, 22 + subpacketBitLength);
      let newPacket: Packet = {
        data: subpackets,
        value: 0,
        totalVersionNumber,
      };
      const values: number[] = [];
      while (newPacket.data.length > 0) {
        newPacket = read(newPacket);
        values.push(newPacket.value);
      }
      return {
        data: data.slice(22 + subpacketBitLength),
        value: getValue(operator, values),
        totalVersionNumber: newPacket.totalVersionNumber,
      };
    }
    const numSubpackets = parseInt(data.slice(7, 18), 2);
    const values: number[] = [];
    let newPacket: Packet = {
      data: data.slice(18),
      value: 0,
      totalVersionNumber,
    };
    for (let i = 0; i < numSubpackets; i++) {
      newPacket = read(newPacket);
      values.push(newPacket.value);
    }
    return { ...newPacket, value: getValue(operator, values) };
  };

  const read = (packet: Packet) => {
    const { data } = packet;
    const packetId = parseInt(data.slice(3, 6), 2);
    if (packetId === 4) {
      return readLiteral(packet);
    }
    return readOperators(packet);
  };

  const main = () => {
    const binaryInput = inputToBinary(input);
    const output = read({ data: binaryInput, value: 0, totalVersionNumber: 0 });
    setAnswer1(output.totalVersionNumber.toString());
    setAnswer2(output.value.toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default DayX;
