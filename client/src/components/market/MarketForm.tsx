import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormProps {
  onSubmit: (data: {
    state: string;
    district: string;
    commodity: string;
  }) => void;
}

const MarketForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [commodity, setCommodity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ state, district, commodity });
  };

  return (
    // <Card className="w-full max-w-2xl backdrop-blur-xl bg-white shadow-lg rounded-2xl flex items-center justify-center flex-col">
    //   <h2 className="text-4xl font-bold text-blue-950 mb-6">
    //     Market Price Finder
    //   </h2>
    //   <CardContent className="p-6">
    //     <form onSubmit={handleSubmit} className="grid gap-4">
    //       <Input
    //         placeholder="Enter State"
    //         value={state}
    //         onChange={(e) => setState(e.target.value)}
    //         className="mt-1 w-full border border-green-400 bg-green-50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
    //       />
    //       <Input
    //         placeholder="Enter District"
    //         value={district}
    //         onChange={(e) => setDistrict(e.target.value)}
    //         className="mt-1 w-full border border-green-400 bg-green-50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
    //       />
    //       <Input
    //         placeholder="Enter Commodity"
    //         value={commodity}
    //         onChange={(e) => setCommodity(e.target.value)}
    //         className="mt-1 w-full border border-green-400 bg-green-50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
    //       />
    //       <Button
    //         type="submit"
    //         className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
    //       >
    //         Search Markets
    //       </Button>
    //     </form>
    //   </CardContent>
    // </Card>
    <Card className="w-full max-w-2xl backdrop-blur-xl bg-white shadow-lg rounded-2xl flex items-center justify-center flex-col mt-6 p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-3 text-center">
        Market Price Finder
      </h2>
      <CardContent className="p-6 w-full">
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <Input
            placeholder="Enter State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border border-green-400 bg-green-50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <Input
            placeholder="Enter District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full border border-green-400 bg-green-50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <Input
            placeholder="Enter Commodity"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            className="w-full border border-green-400 bg-green-50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <Button
            type="submit"
            className="w-full mx-auto block  bg-[#4caf50] hover:bg-[#43a047] text-white rounded-lg py-2 shadow transition"
          >
            Search Markets
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MarketForm;
