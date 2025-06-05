import { createContext, useContext, useState } from "react";

export const TerraformContext = createContext();

export const TerraformProvider = ({ children }) => {
  const [terraformCode, setTerraformCode] = useState("// Write Terraform code here !! ");
  const [splitFiles, setSplitFiles] = useState([]);

  const saveSplitFiles = (main, variables, outputs) => {
    setSplitFiles([main, variables, outputs]);
  };

  return (
    <TerraformContext.Provider
      value={{
        terraformCode,
        setTerraformCode,
        splitFiles,
        saveSplitFiles,
      }}
    >
      {children}
    </TerraformContext.Provider>
  );
};

// ✅ THIS IS THE CUSTOM HOOK YOU NEED TO EXPORT
export const useTerraform = () => useContext(TerraformContext);
