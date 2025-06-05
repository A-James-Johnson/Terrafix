import { useTerraform } from "./TerraformContext";

const Overview = () => {
  const { splitFiles } = useTerraform();

  return (
    <div>
      <div className=" bg-gray-300 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Terraform Code Overview</h1>
        <p className="mb-4">
          This section provides an overview of the saved Terraform code.
        </p>
        <p className="mb-4">The code is split into three main sections:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Main Resources</li>
          <li>Variables</li>
          <li>Outputs</li>
        </ul>
        <p className="mb-4">You can view each section separately.</p>
      </div>
      <div className="text-xl font-bold mb-4 mt-10 bg-gray-100 p-4 rounded-lg shadow-md">
        {splitFiles.length === 0 ? (
          <p>No saved Terraform code found.</p>
        ) : (
          <div>
            <h3 className="text-sm font-bold mb-4">Main Resources:</h3>
            <pre>{splitFiles[0]}</pre> {/* Main Resources */}
            <h3 className="text-sm font-bold mb-4">Variables:</h3>
            <pre>{splitFiles[1]}</pre> {/* Variables */}
            <h3 className="text-sm font-bold mb-4">Outputs:</h3>
            <pre>{splitFiles[2]}</pre> {/* Outputs */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
