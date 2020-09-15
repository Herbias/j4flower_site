const QuickBuildOpen = (isOpen, title, category) => {
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

const SetCategory = (category) => {
  return {
    type: "SET_CATEGORY",
    payload: { quickBuild: { category: category } },
  };
};

export { QuickBuildOpen, SetProducts, SetCategory };
