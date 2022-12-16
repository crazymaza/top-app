import { Button, Htag, Ptag } from "../components";

export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag="h1">Text</Htag>
      <Button appearance="primary" arrow="right">Some button</Button>
      <Button appearance="ghost" arrow="down">Some button</Button>
      <Ptag size="s">Small</Ptag>
      <Ptag>Medium</Ptag>
      <Ptag size="l">Large</Ptag>
    </>
  );
}
