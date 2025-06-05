import { useTerraform } from './TerraformContext';

const savecomponent = ({ code }) => {
  const { setSplitFiles } = useTerraform();

  const handleSave = () => {
    const split = code.split(/\n\s*\n/);  
    setSplitFiles(split);                
    alert('Terraform code saved!');
  };

  return (
    <button onClick={handleSave}>Save Terraform Code</button>
  );
};

export default savecomponent;
