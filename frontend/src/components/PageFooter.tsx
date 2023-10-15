import myImage from "../assets/footer.png";
import { Image } from "react-bootstrap";

function PageFooter() {
  return (
    <div
      style={{
        display: "flex",
        background: "black",
      }}
    >
      <Image
        style={{
          width: "100%",
          height: "auto",
          left: 0,
          top: 0,
        }}
        src={myImage}
      />
    </div>
  );
}

export default PageFooter;
