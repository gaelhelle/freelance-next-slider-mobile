import Head from "next/head";
import Slider from "../components/Slider";
import { data } from "../data";

export default function Home() {
  return (
    <div className="container">
      <Slider data={data} />
    </div>
  );
}
