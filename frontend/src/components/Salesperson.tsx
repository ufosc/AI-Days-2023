import myImage from "../assets/Vivian.png";
import { Image } from "react-bootstrap";

function Salesperson() {
  return (
    <div style={{ width: 350 }}>
      <span
        style={{
          display: "block",
          fontFamily: "Medium",
          fontSize: 50,
          textAlign: "center",
        }}
      >
        Vivian Verizon
      </span>

      <span
        style={{
          display: "block",
          fontFamily: "Inter",
          fontSize: 16,
          textAlign: "left",
          padding: "0px 10px 0px 10px",
        }}
      >
        Welcome to Vivian Verizon, an AI who is here to help you pick the
        perfect phone! She is dedicated to simplifying the phone buying process
        and help recommend products that are right for you.
      </span>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={myImage}
          width={350}
          height={350}
          style={{ border: "solid", borderRadius: 10, margin: 10 }}
        ></Image>
      </div>
    </div>
  );
}

export default Salesperson;
