import { GetStaticProps } from "next";
import { useState } from "react";
import { Button, Htag, Ptag, Tag, Rating, Input, Textarea } from "../components";
import { withLayout } from "../layout/Layout";
import axios from 'axios';
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";

function Home(): JSX.Element {
  const [counter, setCounter] = useState<number>(0);
  const [rating, setRating] = useState<number>(4);
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
      <Rating rating={rating} isEditable setRating={setRating} />
      <Input placeholder="Test"/>
      <Textarea />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find,
    { firstCategory });
  return {
    props: {
      menu,
      firstCategory,
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}