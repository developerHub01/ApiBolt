import { useParams } from "react-router-dom";

const ThemeMarketPlacePage = () => {
  const { id } = useParams<{ id?: string }>();
  console.log({ id });
  
  return (
    <section className="w-full h-full max-w-7xl flex justify-center items-center">
      MarketPlace ({id})
    </section>
  );
};

export default ThemeMarketPlacePage;
