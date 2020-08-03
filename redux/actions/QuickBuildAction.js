const QuickBuildOpen = (isOpen, title, category) => {
  console.log(category);
  return {
    type: "QUICK_BUILD_OPEN",
    payload: {
      quickBuild: { isOpen: isOpen, title: title, category: category },
    },
  };
};

const SetProducts = (products, filters) => {
  return {
    type: "SET_PRODUCTS",
    payload: {
      quickBuild: { products: products, filters: filters },
    },
  };
};

export { QuickBuildOpen, SetProducts };
