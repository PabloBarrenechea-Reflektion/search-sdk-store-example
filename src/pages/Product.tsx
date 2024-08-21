import { trackEntityPageViewEvent } from "@sitecore-search/react";
import { useSearchParams } from "react-router-dom";
import Detail from "@/widgets/Detail";
import { useEffect } from "react";

const Product = () => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    trackEntityPageViewEvent("product", {
      items: [{ id: searchParams.get("id") || "", entityType: "product" }],
    });
  }, []);
  return (
    <div>
      <Detail rfkId={"rfkid_7"} id={searchParams.get("id") || ""} />
    </div>
  );
};

export default Product;
