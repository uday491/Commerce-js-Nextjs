import {React , useState} from "react";
import Link from "next/link";

import commerce from "../lib/commerce";
import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";

export async function getStaticProps() {
  const merchant = await commerce.merchants.about();
  const { data: categories } = await commerce.categories.list();
  const { data: products } = await commerce.products.list();
  const { data: catePro } = await commerce.products.list({
    category_slug: "trending"
  });
  const { data: relatedpro } = await commerce.products.list({
    category_slug: "related"
  });
  return {
    props: {
      merchant,
      categories,
      products,
      catePro,
      relatedpro
    },
  };
}




export default function PopularProducts ({products ,catePro ,relatedpro}){

    console.log(products)
    const [trend, setTrend] = useState(false)
    const [relat, setRelated] = useState(false)
    const [all, setAll] = useState(true)


  const  filterTrending = async()=>{
        setAll(false)
        setRelated(false)
        setTrend(true)
    }

    const  filterRelated = async()=>{
        setAll(false)
        setTrend(false)

        setRelated(true)

    }


    const  filterAll= async()=>{
        setAll(true)
       
    }



    return (
        <>
        <h1>hellow</h1>
        <button onClick={()=>filterAll()}>All</button>
        <button onClick={()=>filterTrending()}>Trending</button>
        <button onClick={()=>filterRelated()}>related</button>
        {all ?  products
.map((item)=> {
            return (
                <h1>{item.name}</h1>
            )
        }) :    null
       }

        {trend ?  catePro.map((item)=> {
            return (
                <h1>{item.name}</h1>
            )
        }) :    null
       }

{relat ?  relatedpro.map((item)=> {
            return (
                <h1>{item.name}</h1>
            )
        }) :    null
       }
        
        </>
    )
}
