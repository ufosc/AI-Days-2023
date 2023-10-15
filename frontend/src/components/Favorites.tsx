import Card from "./Card.tsx";
import Pixel from "../assets/phones/pixel-7-pro-snow-ga03415-us.jpeg";
import iPhone from "../assets/phones/iphone-11-pro-max-space-gray.jpeg";
import Samsung from "../assets/phones/samsung-diamond-3-green.jpeg";

function getRandomPhones(count: number) {
  const phones = [Pixel, iPhone, Samsung];
  let tickets = Array<number>(phones.length);
  tickets.fill(1);

  const picked = [];
  while (picked.length < count) {
    const ticketPicked = Math.floor(
      Math.random() * tickets.reduce((a, b) => a + b),
    );

    let ind = 0;
    while (tickets.slice(0, 1 + ind).reduce((a, b) => a + b) < ticketPicked)
      ind += 1;
    picked.push(phones[ind]);

    tickets[ind] -= 2;

    tickets = tickets.map(t => t + 1);
  }
  return picked;
}

export default function Favorites() {
  return (
    <div
      style={{
        margin: "10px 0 30px 0",
        border: "solid",
        borderRadius: 10,
        padding: 10,
        maxHeight: 225,
      }}
    >
      <span style={{ display: "block", paddingBottom: 5 }}>
        Having FOMO? Here's the products you've already loved just in case!
      </span>

      <div style={{ display: "flex", gap: 10, overflow: "scroll" }}>
        {getRandomPhones(15).map((phone) => (
          <Card width={150} src={phone} />
        ))}
      </div>
    </div>
  );
}
// "5px 15px 5px 15px"
