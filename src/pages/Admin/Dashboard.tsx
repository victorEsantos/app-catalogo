import React, { useState } from "react";
import { View } from "react-native";
import { TabBar } from "../../components";

import Categories from "./Categories";

// Products
import Products from "./Products/ListProducts";
import FormProduct from "./Products/FormProduct";
import EditProduct from "./Products/EditProduct";

const Admin = () => {
  const [screen, setScreen] = useState("products");
  const [productId, setProductId] = useState(0);

  return (
    <View>
      <TabBar screen={screen} setScreen={setScreen} />
      {screen === "products" && (
        <Products
          screen={screen}
          setScreen={setScreen}
          setProductId={setProductId}
        />
      )}
      {screen === "newProduct" && <FormProduct setScreen={setScreen} />}
      {screen === "editProduct" && (
        <EditProduct setScreen={setScreen} productId={productId} />
      )}
      {screen === "categories" && <Categories setScreen={setScreen}/>}
    </View>
  );
};

export default Admin;
