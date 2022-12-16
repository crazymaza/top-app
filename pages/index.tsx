import { useState } from "react";
import { Button, Htag, Ptag, Tag, Rating } from "../components";

export default function Home(): JSX.Element {
  const [counter, setCounter] = useState<number>(0);
  return (
    <>
      <Htag tag="h1">{counter}</Htag>
      <Button appearance="primary" arrow="right" onClick={() => setCounter(x => x + 1)}>Some button</Button>
      <Button appearance="ghost" arrow="down" onClick={() => setCounter(x => x - 1)}>Some button</Button>
      <Ptag size="s">Small</Ptag>
      <Ptag>Medium</Ptag>
      <Ptag size="l">Large</Ptag>
      <Tag>Ghost small tag</Tag>
      <Tag size="m" color="red">Red medium tag</Tag>
      <Tag size="m" color="green">Green medium tag</Tag>
      <Tag size="s" color="primary">Primary small tag</Tag>
      <Tag size="m" color="red" href="#">Red Link medium tag</Tag>
      <Rating rating={4}/>
    </>
  );
}
